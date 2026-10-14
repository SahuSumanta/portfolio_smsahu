import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  signal,
  PLATFORM_ID,
  inject,
  NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-hero-3d-scene',
  standalone: true,
  template: `
    <div class="relative w-full h-full min-h-[420px] lg:min-h-[540px] select-none flex items-center justify-center">
      <!-- Ambient crimson & silver radial backdrop glow -->
      <div
        class="absolute inset-0 pointer-events-none -z-10"
        style="background: radial-gradient(circle at 60% 50%, rgba(244, 38, 80, 0.22) 0%, rgba(20, 8, 14, 0.1) 45%, transparent 70%);"
        aria-hidden="true"
      ></div>

      <!-- Canvas container -->
      <div #canvasContainer class="w-full h-full cursor-grab active:cursor-grabbing"></div>

      <!-- Fallback when WebGL is unavailable or disabled -->
      @if (!isWebGLSupported()) {
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div class="relative w-72 h-72 rounded-full border border-[var(--accent)]/30 flex items-center justify-center animate-pulse">
            <div class="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center">
              <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--accent)] to-white/40 blur-md"></div>
            </div>
          </div>
        </div>
      }

      <!-- Subtle technical telemetry watermark -->
      <div class="absolute bottom-3 right-4 pointer-events-none font-mono text-[9px] tracking-[0.2em] uppercase text-white/30 hidden sm:block">
        WebGL Core · 60 FPS · Interactive Orbit
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }
  `]
})
export class Hero3DSceneComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true })
  private canvasContainer!: ElementRef<HTMLDivElement>;

  readonly isWebGLSupported = signal<boolean>(true);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer | null;
  private animationFrameId: number | null = null;
  private clock = new THREE.Clock();

  // 3D Meshes and Groups
  private rootGroup!: THREE.Group;
  private coreSphere!: THREE.Mesh;
  private outerRing1!: THREE.Mesh;
  private outerRing2!: THREE.Mesh;
  private outerRing3!: THREE.Mesh;
  private nodeMesh!: THREE.InstancedMesh;
  private pointLightCrimson!: THREE.PointLight;
  private rimLightWhite!: THREE.DirectionalLight;

  // Interaction & State
  private targetRotationX = 0;
  private targetRotationY = 0;
  private currentRotationX = 0;
  private currentRotationY = 0;
  private isReducedMotion = false;
  private isVisible = true;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.checkReducedMotion();
    this.initThree();

    if (this.isWebGLSupported()) {
      this.setupEventListeners();
      this.startRenderLoop();
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);

    this.cleanupWebGL();
  }

  private checkReducedMotion(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  private initThree(): void {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    try {
      this.scene = new THREE.Scene();

      // Camera with cinematic perspective
      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      this.camera.position.set(0, 0, 11);

      // WebGL Renderer with alpha transparency and tone mapping
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.35;

      container.appendChild(this.renderer.domElement);
    } catch {
      this.isWebGLSupported.set(false);
      this.renderer = null;
      return;
    }

    // Root Group
    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);

    // 1. Lighting Setup: Crimson Accent + Razor-Sharp Silver Rim Lights
    const ambientLight = new THREE.AmbientLight(0x160a0f, 1.2);
    this.scene.add(ambientLight);

    // Rich Crimson Key Light
    this.pointLightCrimson = new THREE.PointLight(0xf42650, 7.5, 30);
    this.pointLightCrimson.position.set(-6, -4, 6);
    this.scene.add(this.pointLightCrimson);

    // Deep Magenta Auxiliary Fill
    const fillLight = new THREE.PointLight(0x780d27, 4.0, 25);
    fillLight.position.set(6, -6, -4);
    this.scene.add(fillLight);

    // Crisp Silver-White Rim Light for chrome edge reflections
    this.rimLightWhite = new THREE.DirectionalLight(0xffffff, 3.2);
    this.rimLightWhite.position.set(6, 8, 8);
    this.scene.add(this.rimLightWhite);

    // 2. Sculptural Object: Central Dark Chrome Core
    // Multi-faceted Icosahedron with rounded edges via high-subdivision geometry
    const coreGeo = new THREE.IcosahedronGeometry(2.1, 4);
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0x141416,
      metalness: 0.95,
      roughness: 0.16,
      envMapIntensity: 1.5
    });
    this.coreSphere = new THREE.Mesh(coreGeo, chromeMaterial);
    this.rootGroup.add(this.coreSphere);

    // Subtle inner glowing crimson wireframe overlay
    const wireGeo = new THREE.IcosahedronGeometry(2.14, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf42650,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    this.coreSphere.add(wireMesh);

    // 3. Orbital Gyroscopic Rings in Dark Chrome with Crimson Reflection
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x1c1c20,
      metalness: 0.96,
      roughness: 0.12
    });
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x24181c,
      metalness: 0.92,
      roughness: 0.18
    });

    // Primary Equatorial Orbital Ring
    const ringGeo1 = new THREE.TorusGeometry(3.4, 0.045, 24, 120);
    this.outerRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    this.outerRing1.rotation.x = Math.PI * 0.35;
    this.rootGroup.add(this.outerRing1);

    // Secondary Tilted Polar Ring
    const ringGeo2 = new THREE.TorusGeometry(3.9, 0.035, 24, 120);
    this.outerRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.outerRing2.rotation.y = Math.PI * 0.42;
    this.outerRing2.rotation.x = Math.PI * 0.18;
    this.rootGroup.add(this.outerRing2);

    // Tertiary Outer Whispering Ring with Crimson Tone
    const ringGeo3 = new THREE.TorusGeometry(4.4, 0.02, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xf42650,
      transparent: true,
      opacity: 0.4
    });
    this.outerRing3 = new THREE.Mesh(ringGeo3, ringMat3);
    this.outerRing3.rotation.z = Math.PI * 0.25;
    this.outerRing3.rotation.x = -Math.PI * 0.2;
    this.rootGroup.add(this.outerRing3);

    // 4. Satellite Nodes around the rings (illustrating connected distributed systems)
    const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf42650,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2
    });
    const nodeCount = 12;
    this.nodeMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = i % 2 === 0 ? 3.4 : 3.9;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      dummy.position.set(x, y, 0);
      dummy.updateMatrix();
      this.nodeMesh.setMatrixAt(i, dummy.matrix);
    }
    this.nodeMesh.instanceMatrix.needsUpdate = true;
    this.outerRing1.add(this.nodeMesh);
  }

  private setupEventListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      window.addEventListener('touchmove', this.onTouchMove, { passive: true });

      // ResizeObserver on container
      if (typeof ResizeObserver !== 'undefined' && this.canvasContainer?.nativeElement) {
        this.resizeObserver = new ResizeObserver(() => {
          this.onResize();
        });
        this.resizeObserver.observe(this.canvasContainer.nativeElement);
      }

      // IntersectionObserver: pause rendering when scrolled out of view to save GPU cycles
      if (typeof IntersectionObserver !== 'undefined' && this.canvasContainer?.nativeElement) {
        this.intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isVisible = entry.isIntersecting;
          });
        }, { threshold: 0.05 });
        this.intersectionObserver.observe(this.canvasContainer.nativeElement);
      }
    });
  }

  private readonly onMouseMove = (event: MouseEvent): void => {
    const halfX = window.innerWidth / 2;
    const halfY = window.innerHeight / 2;
    this.targetRotationY = ((event.clientX - halfX) / halfX) * 0.45;
    this.targetRotationX = ((event.clientY - halfY) / halfY) * 0.35;
  };

  private readonly onTouchMove = (event: TouchEvent): void => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      this.targetRotationY = ((touch.clientX - halfX) / halfX) * 0.3;
      this.targetRotationX = ((touch.clientY - halfY) / halfY) * 0.2;
    }
  };

  private onResize(): void {
    if (!this.renderer || !this.camera || !this.canvasContainer) return;
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private startRenderLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      const render = () => {
        this.animationFrameId = requestAnimationFrame(render);

        if (!this.isVisible || !this.renderer || !this.scene || !this.camera) return;

        const delta = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();

        if (!this.isReducedMotion) {
          // Subtle gyroscopic differential rotation
          this.coreSphere.rotation.y += 0.12 * delta;
          this.coreSphere.rotation.x += 0.06 * delta;

          this.outerRing1.rotation.z += 0.18 * delta;
          this.outerRing2.rotation.z -= 0.14 * delta;
          this.outerRing3.rotation.x += 0.22 * delta;

          // Gentle levitation breathing
          this.rootGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.22;
        }

        // Smooth pointer interpolation (lerp)
        this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
        this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;

        this.rootGroup.rotation.x = this.currentRotationX;
        this.rootGroup.rotation.y = this.currentRotationY;

        this.renderer.render(this.scene, this.camera);
      };

      this.animationFrameId = requestAnimationFrame(render);
    });
  }

  private cleanupWebGL(): void {
    if (this.rootGroup) {
      this.rootGroup.traverse((child) => {
        if (child instanceof THREE.Mesh || child instanceof THREE.InstancedMesh) {
          if (child.geometry) child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else if (child.material) {
            child.material.dispose();
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
    }
  }
}
