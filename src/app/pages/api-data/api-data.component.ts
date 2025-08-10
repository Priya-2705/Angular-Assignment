import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Hero } from '../../services/api.service';

@Component({
  selector: 'app-api-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.css']
})
export class ApiDataComponent implements OnInit {
  private api = inject(ApiService);
  loading = false;
  error: string | null = null;
  heroes: Hero[] = [];

  ngOnInit(): void {
    this.fetch();
  }

  fetch(search: string = 'spider') {
    this.loading = true;
    this.error = null;
    this.api.getHeroes(search).subscribe({
      next: (data) => { this.heroes = data; },
      error: (err) => { this.error = err?.message ?? 'Failed to load data.'; },
      complete: () => { this.loading = false; }
    });
  }
}
