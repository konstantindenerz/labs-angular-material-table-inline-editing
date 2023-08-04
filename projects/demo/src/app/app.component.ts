import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {ColumnDefinition} from './grid/columns';
import {GridComponent} from './grid/grid.component';

@Component({
  selector: 'labs-root',
  standalone: true,
  imports: [CommonModule, MatTableModule, GridComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: ColumnDefinition[] = [
    {id: 'name', type: 'text'},
    {id: 'position', type: 'number'},
    {id: 'weight', type: 'number', validators: [Validators.required]},
    {id: 'symbol', type: 'text'},
    {id: 'actions', type: 'actions'},
  ];
  dataSource = ELEMENT_DATA;
  validators: ValidatorFn[] = [({value}: AbstractControl): ValidationErrors | null => {
    const element = value as PeriodicElement;
    if (element.name === 'foo' && +element.weight !== 42) {
      return {'Element foo should have weight of 42': true};
    }
    return null;
  }];

  save(item: PeriodicElement) {
    console.log('update item', item);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
