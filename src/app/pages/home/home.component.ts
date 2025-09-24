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

// Registered the plugin with GSAP
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-home',
  imports: [CommonModule, ProjectCardComponent, ReactiveFormsModule],
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
      this.contactForm.reset();
      alert('Thank you for reaching out! I will get back to you soon.');
    } else {
      alert('Please fill out the form correctly before submitting.');
    }
  }

  ngAfterViewInit(): void {
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
  }
}
