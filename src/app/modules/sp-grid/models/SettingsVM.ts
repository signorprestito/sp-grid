import { ColumnDefinition } from './ColumnDefinitionVM';

export class SettingsVM {
  expandable?: boolean = false;
  paginable?: boolean = false;
  pageSize?: number = 5;
  pageSizeOptions?: Array<number> = [5, 10, 20, 50];
  colorTitleBackground?: string;
  colorLightBackground?: string;
  colorAccent?: string;
  colorBorder?: string;
  colorTitle?: string;
  colorHover?: string;
  theme?: string = "default";
}
