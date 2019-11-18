import { TemplateRef } from '@angular/core';

export class ColumnDefinition {
  label: string;
  key: string;
  width?:string;
  sortable?: boolean;
  editable?: boolean;
  type?:string;
  formatDate?: string;
  formatNumber?: string;
  inputType?: string;
  optionsSelect ?: Array<string>;
  template?: TemplateRef<any>;
  secondVal?: string;
  thirdVal?: string;
  defaultTemplate?: string;
  currency?: string;
}
