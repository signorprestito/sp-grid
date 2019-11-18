import { SettingsVM } from './modules/sp-grid/models/SettingsVM';
import { Component, ViewChild } from '@angular/core';
import { ColumnDefinition } from './modules/sp-grid/models/ColumnDefinitionVM';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('plusMinusTemplate', { static: true }) plusMinusTemplate;
  settings: SettingsVM = new SettingsVM();

  data: Array<any>;
  colDef: Array<ColumnDefinition>;
  dataExpanded: Array<any>;
  colDefExpanded: Array<ColumnDefinition>;

  ngOnInit() {
    //this.settings.expandable = true;
    //this.settings.paginable = true;
    // this.settings.pageSizeOptions = [5, 50, 100];

    //set color
    this.settings.theme = 'grey';
    // this.settings.colorAccent='#47618E';
    // this.settings.colorBorder='#47618E';
    // this.settings.colorHover='#47618E';
    // this.settings.colorLightBackground='#47618E';
    // this.settings.colorTitle='white';
    // this.settings.colorTitleBackground='#47618E';

    this.colDef = [
      // { label: 'Country', key: 'country', editable: true, inputType: 'text' },
      // { label: 'Capital', key: 'cap', editable: true, inputType: 'select', optionsSelect: ['Torino', 'Milano', 'Napoli', 'Genova'] },
      // { label: 'Inhabitants', key: 'inhabit', template: this.plusMinusTemplate, sortable: true },
      // { label: 'Percentuale', key: 'perc', defaultTemplate: 'percTemplate', sortable: true },
      // { label: 'Data', key: 'date', type: 'date', editable: true, inputType: 'date', formatDate: 'dd/MM/yyyy' }
      { label: 'Country', key: 'country', editable: true, inputType: 'text', width: '50%' },
      { label: 'Capital', key: 'cap', editable: true, inputType: 'select', optionsSelect: ['Rome', 'Paris', 'Berlino', 'Madrid']},
      { label: 'Inhabitants', key: 'inhabit', template: this.plusMinusTemplate},
      { label: 'Date', key: 'date', type: 'date', formatDate: 'dd/MM/yyyy', editable: true, inputType: 'date' }
    ]

    this.data = [
      // { region: 'Piemonte', cap: 'Torino', inhabit: 20000, perc: '70', clickable: true },
      // { country: 'Piemonte', cap: 'Torino', inhabit: 20000, perc: '70', date: '07/11/2019', clickable: true },
      // { country: 'Lombardia', cap: 'Milano', inhabit: 50000, perc: '80', date: '12/11/2019', clickable: true },
      // { country: 'Campania', cap: 'Napoli', inhabit: 34000, perc: '10', date: '11/10/2019', clickable: true },
      // { country: 'Liguria', cap: 'Genova', inhabit: 7005, perc: '60', date: '12/08/2019', clickable: true },
      // { country: 'Campania', cap: 'Napoli', inhabit: 34000, perc: '10', date: '11/10/2019', clickable: true },
      // { country: 'Liguria', cap: 'Genova', inhabit: 7005, perc: '60', date: '12/08/2019', clickable: true }
      { country: 'Italy', cap: 'Rome', inhabit: 60483973, date: '07/11/2019' },
      { country: 'France', cap: 'Paris', inhabit: 64513000, date: '12/11/2019' },
      { country: 'Germany', cap: 'Berlino', inhabit: 83517045, date: '11/10/2019' },
      { country: 'Spain', cap: 'Madrid', inhabit: 47000000, date: '12/08/2019' },
      { country: 'Portugal', cap: 'Lisbona', inhabit: 1034133, date: '07/13/2019' }
    ]
  }

  rowClick(evt) {
    console.log(evt)
  }

  updatedRow(evt) {
    console.log(evt);
  }

  sort(evt) {
    console.log(evt);
  }

  page(evt) {
    console.log(evt);
  }

  rowClickDetails(evt) {
    this.colDefExpanded = [
      { label: 'City', key: 'city' },
      { label: 'Region', key: 'region'},
      { label: 'Inhabitants', key: 'inhabit' }
    ]

    this.dataExpanded = [
      { city: 'Torino', region: 'Piemonte', inhabit: 886837 },
      { city: 'Roma', region: 'Lazio', inhabit: 2513000 },
      { city: 'Napoli', region: 'Campania', inhabit: 972130 }
    ]
  }
}
