import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected readonly massLifted = signal(0);
  protected readonly gForceDampened = signal(0);
  protected readonly thrusterEfficiency = signal(0);
  protected readonly orbitCycles = signal(0);

  ngOnInit() {
    this.initScrollReveal();
    this.initCounters();
  }

  private initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.15 });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
  }

  private initCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateValue(this.massLifted, 580000);
          this.animateValue(this.gForceDampened, 99); // 99%
          this.animateValue(this.thrusterEfficiency, 240); // 240%
          this.animateValue(this.orbitCycles, 15000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('#statistics');
    if (statsSection) observer.observe(statsSection);
  }

  private animateValue(sig: any, target: number) {
    let current = 0;
    const duration = 2000;
    const steps = 50;
    const stepValue = target / steps;
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        sig.set(target);
        clearInterval(timer);
      } else {
        sig.set(Math.floor(current));
      }
    }, stepTime);
  }
}
