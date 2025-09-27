import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { Project } from '../../shared/models/project.model';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WebglBackgroundComponent } from '../../shared/components/webgl-background/webgl-background.component';
import TypeIt from 'typeit';
import { CertificationsComponent } from '../../shared/components/certifications/certifications.component';

// Registered the plugin with GSAP
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ProjectCardComponent,
    ReactiveFormsModule,
    WebglBackgroundComponent,
    CertificationsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  projects$!: Observable<Project[]>;
  contactForm!: FormGroup;
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.projects$ = this.apiService.getProjects();

    // This is how you "open the box" to see the data inside
    this.projects$.subscribe((actualData) => {
      console.log('Actual Project Data:', actualData);
    });

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Sending form data...', this.contactForm.value);
      this.apiService.sendContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          alert('Message sent successfully!');
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Failed to send message', error);
          alert('Sorry, there was an error sending your message. Please try again later.');
        }
      });
    }
  }

  ngAfterViewInit(): void {

    // 2. Add the TypeIt animation logic
    new (TypeIt as any)('#typing-name', {
      strings: "Sumanta Sahu",
      speed: 100,
      lifeLike: true,
      waitUntilVisible: true,
      cursorChar: '_',
    }).go();

    
    // Animate Section Titles
    gsap.utils.toArray('.section-title').forEach((title: any) => {
      gsap.from(title, {
        y: 50, // Start 50px down
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: title,
          start: 'top 85%', // Start animation when top of title is 85% from top of viewport
          toggleActions: 'play none none none',
        },
      });
    });

    // Animate Project Cards with a stagger effect
    gsap.from('.projects-grid app-project-card', {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2, // This is the magic! Animates cards 0.2s after each other
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
      },
    });

    // Animate "About Me" section elements
    gsap.from('.about-image', {
      x: -100, // Slide in from the left
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
      },
    });

    gsap.from('.about-text', {
      x: 100, // Slide in from the right
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 70%',
      },
    });

    gsap.from('.projects-grid app-project-card', {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        // This tells the animation to play, reverse, play again, and reverse again
        toggleActions: 'play reverse play reverse',
      },
    });
  }
}
