import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

export interface Hero {
  id: number;
  name: string;
  slug: string;
  powerstats: {
    intelligence: number; strength: number; speed: number;
    durability: number; power: number; combat: number;
  };
  appearance: {
    gender: string; race: string | null; height: string[]; weight: string[];
    eyeColor: string; hairColor: string;
  };
  biography: {
    fullName: string; alterEgos: string; aliases: string[];
    placeOfBirth: string; firstAppearance: string;
    publisher: string; alignment: string;
  };
  work: { occupation: string; base: string };
  connections: { groupAffiliation: string; relatives: string };
  images: { xs: string; sm: string; md: string; lg: string };
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  // Public JSON dataset (no API key). We'll fetch all and filter to Marvel + search term.
  private allUrl = 'https://akabab.github.io/superhero-api/api/all.json';

  getHeroes(search: string = ''): Observable<Hero[]> {
    const q = (search || '').trim().toLowerCase();
    return this.http.get<Hero[]>(this.allUrl).pipe(
      map((all: Hero[]) =>
        all
          .filter(h => (h.biography?.publisher || '').toLowerCase() === 'marvel comics')
          .filter(h => q ? h.name.toLowerCase().includes(q) ||
                         (h.biography?.fullName || '').toLowerCase().includes(q) ||
                         (h.biography?.aliases || []).some(a => a.toLowerCase().includes(q))
                       : true)
          .slice(0, 24) // keep it light
      ),
      catchError((error) => {
        console.error('API error', error);
        return throwError(() => new Error('Could not load characters'));
      })
    );
  }
}
