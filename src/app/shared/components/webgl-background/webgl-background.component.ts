import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


@Component({
  selector: 'app-webgl-background',
  imports: [],
  templateUrl: './webgl-background.component.html',
  styleUrl: './webgl-background.component.scss'
})
export class WebglBackgroundComponent {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private shape!: THREE.Points;
  private model!: THREE.Group;


  // This is a getter for easy access to the canvas element
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  // This lifecycle hook runs after the component's view is initialized
  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

  private createScene() {
    // 1. The Scene: a container for all 3D objects
    this.scene = new THREE.Scene();

    // 2. The Camera: defines what we can see
    const aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(5, aspectRatio, 1, 1000);
    this.camera.position.z = 400;
    

    // 3. The 3D Shape: a sphere made of particles
    const geometry = new THREE.SphereGeometry(120, 64, 64);
    const material = new THREE.PointsMaterial({
      color: 0x6c757d, // Slate Gray from your palette
      size: 1.5
    });
    this.shape = new THREE.Points(geometry, material);
    this.scene.add(this.shape);
  }

  private startRenderingLoop() {
    // 4. The Renderer: draws the scene onto the canvas
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    // 5. The Animation Loop: redraws the scene on every frame
    const animate = () => {
      requestAnimationFrame(animate);
      this.shape.rotation.y += 0.0005; // Slow constant rotation
      this.shape.rotation.x += 0.0002;
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  // Make it interactive by handling mouse movement
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Animate the shape's rotation based on the mouse position from center
    const mouseX = (event.clientX - (window.innerWidth / 2)) * 0.0001;
    const mouseY = (event.clientY - (window.innerHeight / 2)) * 0.0001;
    this.shape.rotation.y += mouseX;
    this.shape.rotation.x += mouseY;
  }

}
