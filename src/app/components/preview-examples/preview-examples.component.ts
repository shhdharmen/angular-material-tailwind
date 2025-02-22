import { Component, Inject, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { DeviceService } from '../../core/services/device.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export interface DialogData {
  animal: string;
  name: string;
}
export interface ChipColor {
  name: string;
  color: ThemePalette;
}

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-theme-preview-examples',
  imports: [
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatBadgeModule,
    MatBottomSheetModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
  ],
  templateUrl: './preview-examples.component.html',
  styleUrl: './preview-examples.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ThemePreviewExamplesComponent {
  isHandset$ = inject(DeviceService).isHandset$;
  previewList = [
    'autocomplete',
    'badge',
    'bottom sheet',
    'buttons',
    'button toggle',
    'card',
    'checkbox',
    'chips',
    'date picker',
    'dialog',
    'divider',
    'expansion panel',
    'form field',
    'menu',
    'progress bar',
    'progress spinner',
    'radio button',
    'select',
    'sidenav',
    'slide toggle',
    'slider',
    'snackbar',
    'stepper',
    'table',
    'colors',
  ];
  filteredPreview = this.previewList.slice();
  search = new FormControl<string>('');

  availableColors: ChipColor[] = [
    { name: 'none', color: undefined },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' },
  ];
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  private _formBuilder = inject(FormBuilder);

  constructor(
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.search.valueChanges.subscribe((v) => {
      if (!v) {
        this.filteredPreview = this.previewList.slice();
      } else {
        const searchTerm = v.toLowerCase();
        this.filteredPreview = this.previewList.filter((name) =>
          name.toLowerCase().includes(searchTerm)
        );
      }
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' },
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
  }

  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  campaignTwo = new FormGroup({
    start: new FormControl(new Date(year, month, 15)),
    end: new FormControl(new Date(year, month, 19)),
  });

  animal: string | undefined;
  name: string | undefined;
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }

  panelOpenState = false;

  toppings = new FormControl('');

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  showFiller = false;

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  template: `<mat-nav-list>
    <a
      href="https://angular-material.dev/articles"
      mat-list-item
      (click)="openLink($event)"
    >
      <span matListItemTitle>Read from</span>
      <span matLine>Articles</span>
    </a>

    <a
      href="https://angular-material.dev/courses"
      mat-list-item
      (click)="openLink($event)"
    >
      <span matListItemTitle>Learn from</span>
      <span matLine>Courses</span>
    </a>

    <a
      href="https://angular-material.dev/videos"
      mat-list-item
      (click)="openLink($event)"
    >
      <span matListItemTitle>Watch videos</span>
      <span matLine>To learn more</span>
    </a>
    <a
      href="https://angular-material.dev/consult"
      mat-list-item
      (click)="openLink($event)"
    >
      <span matListItemTitle>Get help</span>
      <span matLine>Through consultation</span>
    </a>
  </mat-nav-list> `,
  imports: [MatListModule],
})
export class BottomSheetOverviewExampleSheet {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h2 mat-dialog-title>Hi {{ data.name }}</h2>
    <mat-dialog-content>
      <p>What's your favorite animal?</p>
      <mat-form-field>
        <mat-label>Favorite Animal</mat-label>
        <input matInput [(ngModel)]="data.animal" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No Thanks</button>
      <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>
        Ok
      </button>
    </mat-dialog-actions> `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
