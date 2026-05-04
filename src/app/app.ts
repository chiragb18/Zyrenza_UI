import { Component, signal, OnInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Zyrenza Antigravity Technologies');
  protected readonly isLoading = signal(true);
  protected readonly scrollProgress = signal(0);

  ngOnInit() {
    // Simulate initial load
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const currentScroll = window.scrollY;
    this.scrollProgress.set((currentScroll / totalHeight) * 100);
    
    // Set CSS variable for parallax
    document.documentElement.style.setProperty('--scroll-y', `${currentScroll}px`);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the navbar height (approx 80px)
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL fragment without jumping
      window.history.pushState(null, '', `/#${sectionId}`);
    }
  }
}
