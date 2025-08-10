import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Meal } from '../../services/api.service';

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
  meals: Meal[] = [];

  ngOnInit(): void {
    this.fetch();
  }

  fetch(search: string = 'chicken') {
    this.loading = true;
    this.error = null;
    this.api.getMeals(search).subscribe({
      next: (data) => { this.meals = data; },
      error: (err) => { this.error = err?.message ?? 'Failed to load data.'; },
      complete: () => { this.loading = false; }
    });
  }
}
