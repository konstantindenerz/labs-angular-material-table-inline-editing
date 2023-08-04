import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {ColumnDefinition} from './columns';

@Component({
  selector: 'labs-grid',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnChanges {
  @Input({required: true}) displayedColumns: ColumnDefinition[] = [];
  @Input({required: true}) dataSource: unknown[] = [];
  @Input() validators?: ValidatorFn[];
  @Output() update = new EventEmitter<never>();
  rowEditing = false;
  rowEditingIndex = -1;
  private readonly formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.group({});
  columnIds: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // @ts-ignore
    if (!!changes.displayedColumns) {
      this.columnIds = this.displayedColumns.map(({id}) => id);
      this.formGroup = this.formBuilder.group({}, {validators: this.validators});

      this.displayedColumns.forEach(column => {
        // @ts-ignore
        this.formGroup.addControl(column.id, new FormControl((this.dataSource[this.rowEditingIndex] ?? {})[column.id], column.validators));
      })
    }
  }

  toggle(element: any, index: number) {
    this.rowEditing = true;
    this.rowEditingIndex = index;
  }

  clear() {
    this.formGroup.reset({});
    this.rowEditing = false;
    this.rowEditingIndex = -1;
  }

  triggerUpdate(): void {
    const value = this.formGroup.value;
    this.update.emit(value as never);
    this.clear();
  }
}
