import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UtilityService } from '../services/utility.service';
import { IUtility } from '../models/IUtility';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UtilityService],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  utilityForm: any;
  utilityColumns: string[] = ['serialNumber', 'utilityName', 'utilityDescription', 'utilityActions'];
  utilitySource: IUtility[] = [];
  private operation = 'add';
  private destroy$ = new Subject<void>();
  private utilityId:string = '';

  constructor(private fb: FormBuilder, private utilityService: UtilityService) {}

  ngOnInit(): void {
    this.initializeUtilityForm();
    this.loadUtilities();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Initialize the utility form
  private initializeUtilityForm(): void {
    this.utilityForm = this.fb.group({
      utilityName: ['', Validators.required],
      utilityDescription: ['', Validators.required],
    });
  }

  // Load utilities from the service
  private loadUtilities(): void {
    this.utilityService.loadUtility().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response:IUtility[] ) => {
        this.utilitySource = response;
      },
      error: (error) => {
        console.error('Error loading utilities:', error);
      },
    });
  }

  // Handle form submission
  async submitUtilityForm(): Promise<void> {
    if (this.utilityForm.valid) {
      const utility = this.utilityForm.value as IUtility;
      this.operation === 'add' ? this.addUtility(utility) : this.editUtility(utility);
      this.utilityForm.reset();
      this.operation = 'add';
    }
  }

  // Add a new utility
  private  addUtility(utility: IUtility): void {
    this.utilityService.saveUtility(utility).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.loadUtilities(),
      error: (error) => {
        console.error('Error saving utility:', error);
      },
    });
  }

  // Edit an existing utility
  private  editUtility(utility: IUtility): void {
    this.utilityService.updateUtility(this.utilityId,utility).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.loadUtilities(),
      error: (error) => {
        console.error('Error updating utility:', error);
      },
    });
  }

  // Populate form for editing
  editUtilityForm(utility: IUtility): void {
    this.utilityId = utility._id.toString();
    this.utilityForm.patchValue(utility);
    this.operation = 'edit';
  }

  // Delete a utility
  deleteUtilityForm(utility: IUtility): void {
    if (confirm('Are you sure you want to delete this utility?')) {
      this.utilityService.deleteUtility(utility._id.toString()).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.loadUtilities(),
        error: (error) => {
          console.error('Error deleting utility:', error);
        },
      });
    }
  }
}
