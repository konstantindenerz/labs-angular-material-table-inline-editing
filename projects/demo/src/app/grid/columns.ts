import {ValidatorFn} from '@angular/forms';

export type ColumnDefinitionType = 'text' | 'number' | 'actions';

export interface ColumnDefinition {
  id: string;
  type: ColumnDefinitionType;
  validators?: ValidatorFn[]
}
