import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  getMeals(search: string = 'chicken'): Observable<Meal[]> {
    return this.http
      .get<{ meals: Meal[] | null }>(`${this.baseUrl}/search.php?s=${search}`)
      .pipe(
        map((res: { meals: Meal[] | null }) => res.meals ?? []),
        catchError((error) => {
          console.error('API error', error);
          return throwError(() => new Error('Could not load meals'));
        })
      );
  }
}
