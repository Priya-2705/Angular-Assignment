import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  submitted = false;
  submissions: any[] = [];

  form = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    character: ['', [Validators.required, Validators.minLength(2)]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comment: ['', [Validators.required, Validators.minLength(15)]],
    agree: [false, [Validators.requiredTrue]]
  });

  constructor(private fb: FormBuilder, private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.submissions = this.formDataService.getSubmissions();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.formDataService.addSubmission(this.form.value);
    this.submissions = this.formDataService.getSubmissions();
    alert('Thanks! Your Marvel feedback has been submitted.');

    this.form.reset({ rating: 5, agree: false });
    this.submitted = false;
  }
}
