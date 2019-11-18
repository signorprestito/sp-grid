import { SettingsVM } from './models/SettingsVM';
import { Component, Input, SimpleChanges, ViewChild, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ColumnDefinition } from './models/ColumnDefinitionVM';
import { MatSort, Sort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sp-grid',
  templateUrl: './sp-grid.component.html',
  styleUrls: ['./sp-grid.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SpGridComponent {
  //template view
  @ViewChild('percTemplate', { static: true }) percTemplate;
  @ViewChild('currencyTemplate', { static: true }) currencyTemplate;
  @ViewChild('expandTemplate', { static: true }) expandTemplate;
  //template input
  @ViewChild('inputTextTemplate', { static: true }) inputTextTemplate;
  @ViewChild('selectTemplate', { static: true }) selectTemplate;
  @ViewChild('datePickerTemplate', { static: true }) datePickerTemplate;
  //Sort & paginator
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //input
  @Input() data: Array<any>;
  @Input() colDef: Array<ColumnDefinition>;
  @Input() dataExpanded: Array<any>;
  @Input() colDefExpanded: Array<ColumnDefinition>;
  @Input() settings: SettingsVM = new SettingsVM();
  //output
  @Output() rowClickEmit: EventEmitter<any> = new EventEmitter;
  @Output() updatedRow: EventEmitter<any> = new EventEmitter;
  @Output() getDetails: EventEmitter<any> = new EventEmitter();
  @Output() sortEvent: EventEmitter<Sort> = new EventEmitter();
  @Output() pageEvent: EventEmitter<any> = new EventEmitter();

  //master
  displayedColumns: Array<string>;
  dataSource;
  //details
  displayedColumnsExpanded: Array<string>;
  dataSourceExpanded;
  expandedElement: any;
  clickedElement: any;

  //editing
  editingTemplate: TemplateRef<any>;

  //private
  private clickedCol: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.settings) {
      this._setColor();
    }

    if (changes && changes.colDef) {
      if (this.settings.expandable)
        this.colDef.splice(0,0,<ColumnDefinition>({
          key: 'expand',
          label: '',
          sortable: false,
          template: this.expandTemplate
        }))
    }
    if (changes && changes.data) {
      //set colums to display
      this.displayedColumns = this.colDef.map((col) => {
        return col['key'];
      });
      //set dataSopurce
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    if (changes && changes.dataExpanded) {
      if (this.dataExpanded && this.dataExpanded.length > 0) {
        //set colums to display
        this.displayedColumnsExpanded = this.colDefExpanded.map((col) => {
          return col['key'];
        });
      };
      this.dataSourceExpanded = this.dataExpanded;
      this.expandedElement = this.clickedElement;
    };
  }

  sortData(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }
    this.sortEvent.emit(sort);
  }

  expandClick(element) {
    this.dataSourceExpanded = [];
    if (this.expandedElement == element) {
      this.expandedElement = "";
    } else {
      this.clickedElement = element;
      //emit
      this.getDetails.emit(element);
    }
  }

  clickCol(col: ColumnDefinition, element: any) {
    //set clicked col
    this.clickedCol = true;
    //reset all editing
    this.dataSource.data.forEach(cc => {
      cc.isEditingCol = "";
    });
    //set specific editing field
    if (col.editable) {
      element.isEditingCol = col.key;
      element.editValue = element[col.key];

      switch (col.inputType) {
        case 'text':
          this.editingTemplate = this.inputTextTemplate;
          break;
        case 'select':
          this.editingTemplate = this.selectTemplate;
          break;
        case 'date':
          this.editingTemplate = this.datePickerTemplate;
          break;

        default:
          break;
      }
    }
  }

  setDate(element, evt) {
    element.editValue = evt.value;
  }

  removeEditing(element) {
    element.isEditingCol = "";
  }

  saveEditing(element, key) {
    element[key] = element.editValue;
    this.updatedRow.emit(element);
    element.isEditingCol = "";
  }

  page(evt) {
    this.pageEvent.emit(evt);
  }

  private _setColor() {
    //setting default theme
    if (this.settings.theme) {
      switch (this.settings.theme) {
        case 'green':
          document.documentElement.style.setProperty('--accent-color', "#009500");
          document.documentElement.style.setProperty('--border-color', "#B4BFCC");
          document.documentElement.style.setProperty('--title-color', "white");
          document.documentElement.style.setProperty('--title-background', "#00C300");
          document.documentElement.style.setProperty('--light-background', "rgb(237, 237, 237)");
          document.documentElement.style.setProperty('--hover-color', "#B4BFCC");
          break;

        case 'dark':
          document.documentElement.style.setProperty('--accent-color', "#88629A");
          document.documentElement.style.setProperty('--border-color', "#B4BFCC");
          document.documentElement.style.setProperty('--title-color', "white");
          document.documentElement.style.setProperty('--title-background', "#222423");
          document.documentElement.style.setProperty('--light-background', "rgb(237, 237, 237)");
          document.documentElement.style.setProperty('--hover-color', "#B4BFCC");
          break;

        case 'gray':
          document.documentElement.style.setProperty('--accent-color', "#5E3C4C");
          document.documentElement.style.setProperty('--border-color', "#B4BFCC");
          document.documentElement.style.setProperty('--title-color', "white");
          document.documentElement.style.setProperty('--title-background', "#C9C7B0");
          document.documentElement.style.setProperty('--light-background', "rgb(237, 237, 237)");
          document.documentElement.style.setProperty('--hover-color', "#B4BFCC");
          break;

        default:
          document.documentElement.style.setProperty('--accent-color', "#22406d");
          document.documentElement.style.setProperty('--border-color', "#B4BFCC");
          document.documentElement.style.setProperty('--title-color', "white");
          document.documentElement.style.setProperty('--title-background', "#47618E");
          document.documentElement.style.setProperty('--light-background', "rgb(237, 237, 237)");
          document.documentElement.style.setProperty('--hover-color', "#B4BFCC");
          break;
      }
    }

    //setting custom color
    if (this.settings.colorTitleBackground) document.documentElement.style.setProperty('--title-background', this.settings.colorTitleBackground);
    if (this.settings.colorLightBackground) document.documentElement.style.setProperty('--light-background', this.settings.colorLightBackground);
    if (this.settings.colorAccent) document.documentElement.style.setProperty('--accent-color', this.settings.colorAccent);
    if (this.settings.colorBorder) document.documentElement.style.setProperty('--border-color', this.settings.colorBorder);
    if (this.settings.colorHover) document.documentElement.style.setProperty('--hover-color', this.settings.colorHover);
    if (this.settings.colorTitle) document.documentElement.style.setProperty('--title-color', this.settings.colorTitle);
  }
}
