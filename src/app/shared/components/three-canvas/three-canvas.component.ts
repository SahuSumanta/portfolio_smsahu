import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  input,
  signal,
  PLATFORM_ID,
  inject,
  NgZone,
  effect
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

export type SceneMode = 'hero-sphere';
@Component({
  selector: 'app-three-canvas',
  template: `
    <div class="relative w-full h-full min-h-[350px] overflow-hidden select-none">
      <!-- Loading State Overlay (3D Skill Requirement: Never leave users without feedback) -->
      @if (isLoading()) {
        <div class="absolute inset-0 bg-[#0B0B0C]/80 backdrop-blur-md z-10 flex flex-col items-center justify-center transition-opacity duration-500">
          <div class="relative w-12 h-12 flex items-center justify-center">
            <div class="absolute inset-0 rounded-full border-2 border-[#3B82F6]/20 border-t-[#3B82F6] animate-spin"></div>
            <div class="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse"></div>
          </div>
          <span class="mt-4 text-xs font-mono text-[#A1A1AA] tracking-widest uppercase">
            Initializing 3D WebGL Telemetry...
          </span>
        </div>
      }

      <!-- Three.js Canvas Container -->
      <div #canvasContainer class="w-full h-full cursor-grab active:cursor-grabbing"></div>
    </div>
  `,
  host: {
    class: 'block w-full h-full'
  }
})
export class ThreeCanvasComponent implements OnInit, OnDestroy {
  readonly sceneMode = input<SceneMode>('hero-sphere');
  readonly isLoading = signal<boolean>(true);
  @ViewChild('canvasContainer', { static: true })
  private canvasContainer!: ElementRef<HTMLDivElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer | null;
  private animationFrameId: number | null = null;

  // Scene Objects & State
  private mainGroup!: THREE.Group;
  private particlesGroup!: THREE.Group;
  // Interaction State
  private mouse = new THREE.Vector2();
  private targetRotation = new THREE.Vector2();
  private currentRotation = new THREE.Vector2();
  private isMobile = false;
  private isReducedMotion = false;
  private resizeObserver!: ResizeObserver;
  private visibilityObserver!: IntersectionObserver;
  private isVisible = true;
  private isWebGLSupported = true;

  constructor() {
    effect(() => {
      const mode = this.sceneMode();
      if (this.scene && this.isBrowser() && this.isWebGLSupported) {
        this.rebuildScene(mode);
      }
    });
  }

  ngOnInit(): void {
    if (!this.isBrowser()) {
      this.isLoading.set(false);
      return;
    }

    this.checkDeviceCapabilities();
    this.initThree();
    if (this.isWebGLSupported) {
      this.rebuildScene(this.sceneMode());
      this.setupEventListeners();
      this.startAnimationLoop();
    }

    // Fade out loading screen after initial render compilation
    setTimeout(() => {
      this.isLoading.set(false);
    }, 600);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser()) return;

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.resizeObserver && this.canvasContainer) {
      this.resizeObserver.disconnect();
    }
    if (this.visibilityObserver && this.canvasContainer) {
      this.visibilityObserver.disconnect();
    }

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);

    this.disposeScene();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private checkDeviceCapabilities(): void {
    this.isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
    this.isReducedMotion = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  }

  private initThree(): void {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 400;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0b0b0c, 0.035);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 18;

    // 3. Renderer (Graceful fallback for headless/jsdom unit test environments)
    try {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !this.isMobile,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.2 : 2.0));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.2;

      container.appendChild(this.renderer.domElement);
    } catch (e) {
      this.isWebGLSupported = false;
      this.renderer = null;
      return;
    }

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 3, 50);
    pointLight1.position.set(10, 10, 10);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x22c55e, 2, 40);
    pointLight2.position.set(-10, -10, -5);
    this.scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xa855f7, 2, 40);
    pointLight3.position.set(0, -15, 10);
    this.scene.add(pointLight3);

    this.mainGroup = new THREE.Group();
    this.particlesGroup = new THREE.Group();
    this.scene.add(this.mainGroup);
    this.scene.add(this.particlesGroup);
  }

  private rebuildScene(mode: SceneMode): void {
    if (!this.isWebGLSupported || !this.mainGroup || !this.particlesGroup) return;
    this.disposeSceneContent();

    if (mode === 'hero-sphere') {
      this.buildHeroSphere();
    }
  }

  private buildHeroSphere(): void {
    const sphereRadius = 6;

    const sphereGeo = new THREE.IcosahedronGeometry(sphereRadius, this.isMobile ? 2 : 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const wireframeSphere = new THREE.Mesh(sphereGeo, wireframeMat);
    this.mainGroup.add(wireframeSphere);

    const posAttribute = sphereGeo.getAttribute('position');
    const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const nodeMatBlue = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    const nodeMatGreen = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const nodeMatPurple = new THREE.MeshBasicMaterial({ color: 0xa855f7 });

    const step = this.isMobile ? 4 : 2;
    for (let i = 0; i < posAttribute.count; i += step) {
      const x = posAttribute.getX(i);
      const y = posAttribute.getY(i);
      const z = posAttribute.getZ(i);

      const mat = i % 3 === 0 ? nodeMatBlue : i % 3 === 1 ? nodeMatGreen : nodeMatPurple;
      const node = new THREE.Mesh(nodeGeo, mat);
      node.position.set(x, y, z);
      this.mainGroup.add(node);
    }

    const particleCount = this.isMobile ? 150 : 400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x3b82f6);
    const colorGreen = new THREE.Color(0x22c55e);
    const colorPurple = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const r = sphereRadius * (1.2 + Math.random() * 0.8);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = Math.random() > 0.5 ? colorBlue : Math.random() > 0.5 ? colorGreen : colorPurple;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    this.particlesGroup.add(particleSystem);
  }

  private setupEventListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      window.addEventListener('touchmove', this.onTouchMove, { passive: true });

      this.resizeObserver = new ResizeObserver(() => {
        this.onResize();
      });
      this.resizeObserver.observe(this.canvasContainer.nativeElement);

      this.visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
        });
      }, { threshold: 0 });
      this.visibilityObserver.observe(this.canvasContainer.nativeElement);
    });
  }

  private onMouseMove = (event: MouseEvent): void => {
    if (this.isReducedMotion || !this.isWebGLSupported) return;
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.targetRotation.x = y * 0.4;
    this.targetRotation.y = x * 0.6;
  };

  private onTouchMove = (event: TouchEvent): void => {
    if (this.isReducedMotion || !this.isWebGLSupported || event.touches.length === 0) return;
    const touch = event.touches[0];
    const x = (touch.clientX / window.innerWidth) * 2 - 1;
    const y = -(touch.clientY / window.innerHeight) * 2 + 1;
    this.targetRotation.x = y * 0.3;
    this.targetRotation.y = x * 0.5;
  };

  private onResize(): void {
    if (!this.canvasContainer || !this.renderer || !this.camera || !this.isWebGLSupported) return;
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 400;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private startAnimationLoop(): void {
    if (!this.isWebGLSupported || !this.renderer) return;
    this.ngZone.runOutsideAngular(() => {
      const clock = new THREE.Clock();

      const animate = () => {
        this.animationFrameId = requestAnimationFrame(animate);
        if (!this.isVisible) return; // Pause GPU rendering when scrolled off-screen!

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        if (!this.isReducedMotion) {
          this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
          this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;

          if (this.mainGroup) {
            this.mainGroup.rotation.x = this.currentRotation.x;
            this.mainGroup.rotation.y = this.currentRotation.y;
          }
        }

        if (!this.isReducedMotion && this.mainGroup && this.particlesGroup) {
          if (this.sceneMode() === 'hero-sphere') {
            this.mainGroup.rotation.y += delta * 0.08;
            this.particlesGroup.rotation.y -= delta * 0.05;
            this.particlesGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;
          }
        }

        if (this.renderer && this.scene && this.camera) {
          this.renderer.render(this.scene, this.camera);
        }
      };

      animate();
    });
  }

  private disposeSceneContent(): void {
    if (!this.mainGroup || !this.particlesGroup) return;

    const disposeGroup = (group: THREE.Group) => {
      while (group.children.length > 0) {
        const object = group.children[0];
        group.remove(object);

        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(m => m.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      }
    };

    disposeGroup(this.mainGroup);
    disposeGroup(this.particlesGroup);
  }

  private disposeScene(): void {
    this.disposeSceneContent();
    if (this.scene) {
      this.scene.clear();
    }
  }
}
