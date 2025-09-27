import { Component,AfterViewInit, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  constructor(private ngZone: NgZone) {

  }


  ngAfterViewInit(): void {
    
    // Your cursor logic can stay here
    this.initCustomCursor();
  }

  initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const glow = document.querySelector('.aurora-glow'); 
    const interactiveElements = document.querySelectorAll('a, button');

    // Make the cursor follow the mouse
    window.addEventListener('mousemove', (e) => {
      gsap.to([cursor,glow], {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    // Add hover effects for interactive elements
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor?.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursor?.classList.remove('grow'));
    });
  }


  
}
