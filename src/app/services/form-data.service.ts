import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormDataService {
  private submissions: any[] = [];

  addSubmission(data: any) {
    this.submissions.push(data);
  }

  getSubmissions() {
    return this.submissions;
  }
}
