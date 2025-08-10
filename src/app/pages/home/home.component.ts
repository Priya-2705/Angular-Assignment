import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  submissions: any[] = [];

  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    this.submissions = this.formDataService.getSubmissions();
  }
}
