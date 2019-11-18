<div align="center">
  <h1>sp-grid</h1>

  <p>
    <strong>An Angular 8 plugin that allows:</strong></p>
</div>
<div>
  <p>
<div>Create a table with custom columns.</div>
<div>This table is editable, sortable and pageable. 
It is possible to customize the template of each single column by passing a template or using the ones already provided</div>
<div>Through the settings and even possible to activate the master / details function</div>
  </p>
  </div>
</div>

## Installing
```sh
$ npm i sp-grid
```

**Adding angular material**

Great now that we are sure the application loaded, you can stop it pressing “Ctrl + c” in the console you are running it, so we can add Angular Material to our application through the schematics.
```sh
$ ng add @angular/material
```

For more details click <a target="_blank" href="https://medium.com/@ismapro/first-steps-with-angular-7-with-angular-cli-and-angular-material-d69f55d8ac51">here</a>. 

## Setup
```js
...
import { SpGridModule } from 'sp-grid';
...

@NgModule({
  imports: [
    ...
    SpGridModule
     ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
## Basic Usage
**my.component.html**

```html
<app-sp-grid [settings]="settings" [data]="data" [colDef]="colDef"></app-sp-grid>
```

**my.component.ts**

```js
import { Component } from '@angular/core';
import { SettingsVM,ColumnDefinition  } from 'sp-grid';

export class AppComponent {
  settings: SettingsVM = new SettingsVM();

  data: Array<any>;
  colDef: Array<ColumnDefinition>;

  constructor() { }

  ngOnInit() {
    this.colDef = [
      { label: 'Country', key: 'country' },
      { label: 'Capital', key: 'cap'},
      { label: 'Inhabitants', key: 'inhabit' }
    ]

    this.data = [
      { country: 'Italy', cap: 'Rome', inhabit: 60483973 },
      { country: 'France', cap: 'Paris', inhabit: 64513000 },
      { country: 'Germany', cap: 'Berlino', inhabit: 83517045 },
      { country: 'Spain', cap: 'Madrid', inhabit: 47000000 },
      { country: 'Portugal', cap: 'Lisbona', inhabit: 10341330 }
    ]
   
  }
  
}
```

## Editable Usage

Insert <code>editable = true</code> in column setting. You can select between input text (<code>inputType = text</code>), select (<code>inputType = select</code>) and datePicker (<code>inputType = date</code>).
Output event on save: <code>(updatedRow)</code>




**my.component.html**

```html
<app-sp-grid [settings]="settings" [data]="data" [colDef]="colDef" (updatedRow)="callBack($event)"></app-sp-grid>
```

**my.component.ts**

```js
import { Component } from '@angular/core';
import { SettingsVM,ColumnDefinition  } from 'sp-grid';

export class AppComponent {
  data: Array<any>;
  colDef: Array<ColumnDefinition>;

  constructor() { }

  ngOnInit() {
    this.colDef = [
      { label: 'Country', key: 'country', editable: true, inputType: 'text' },
      { label: 'Capital', key: 'cap'},
      { label: 'Inhabitants', key: 'inhabit' }
    ]

    this.data = [
      { country: 'Italy', cap: 'Rome', inhabit: 60483973 },
      { country: 'France', cap: 'Paris', inhabit: 64513000 },
      { country: 'Germany', cap: 'Berlino', inhabit: 83517045 },
      { country: 'Spain', cap: 'Madrid', inhabit: 47000000 },
      { country: 'Portugal', cap: 'Lisbona', inhabit: 10341330 }
    ]
   
  }
  
}
```

## Sortable Usage


Insert <code>sortable = true</code> in column setting.
Output event: <code>(sortEvent)</code>


**my.component.html**

```html
<app-sp-grid [settings]="settings" [data]="data" [colDef]="colDef" (sortEvent)="callBack($event)"></app-sp-grid>
```

**my.component.ts**

```js
import { Component } from '@angular/core';
import { SettingsVM,ColumnDefinition  } from 'sp-grid';

export class AppComponent {
  data: Array<any>;
  colDef: Array<ColumnDefinition>;

  constructor() { }

  ngOnInit() {
    this.colDef = [
      { label: 'Country', key: 'country' },
      { label: 'Capital', key: 'cap'},
      { label: 'Inhabitants', key: 'inhabit', sortable: true }
    ]

    this.data = [
      { country: 'Italy', cap: 'Rome', inhabit: 60483973 },
      { country: 'France', cap: 'Paris', inhabit: 64513000 },
      { country: 'Germany', cap: 'Berlino', inhabit: 83517045 },
      { country: 'Spain', cap: 'Madrid', inhabit: 47000000 },
      { country: 'Portugal', cap: 'Lisbona', inhabit: 1034133 }
    ]
   
  }
  
}
```

## Paginable Usage


Insert <code>paginable = true</code>, <code>pageSize(optional)</code> and <code>pageSizeOptions(optional)</code> in general setting.
Output event: <code>(pageEvent)</code>


**my.component.html**

```html
<app-sp-grid [settings]="settings" [data]="data" [colDef]="colDef" (pageEvent)="callBack($event)"></app-sp-grid>
```

**my.component.ts**

```js
import { Component } from '@angular/core';
import { SettingsVM,ColumnDefinition  } from 'sp-grid';

export class AppComponent {
  settings: SettingsVM = new SettingsVM();

  data: Array<any>;
  colDef: Array<ColumnDefinition>;

  constructor() { }

  ngOnInit() {
    this.settings.paginable = true;
    this.settings.pageSizeOptions = [5, 50, 100];
    this.settings.pageSize = 5;

    this.colDef = [
      { label: 'Country', key: 'country' },
      { label: 'Capital', key: 'cap'},
      { label: 'Inhabitants', key: 'inhabit'}
    ]

    this.data = [
      { country: 'Italy', cap: 'Rome', inhabit: 60483973 },
      { country: 'France', cap: 'Paris', inhabit: 64513000 },
      { country: 'Germany', cap: 'Berlino', inhabit: 83517045 },
      { country: 'Spain', cap: 'Madrid', inhabit: 47000000 },
      { country: 'Portugal', cap: 'Lisbona', inhabit: 1034133 }
    ]
   
  }
  
}
```

## Master/Details Usage


Insert <code>expandable = true</code> in genaral setting.
Output event: <code>(getDetails)</code>


**my.component.html**

```html
<app-sp-grid [settings]="settings" [data]="data" [colDef]="colDef" [dataExpanded]="dataExpanded" [colDefExpanded]="colDefExpanded" (getDetails)="callBack($event)"></app-sp-grid>
```

**my.component.ts**

```js
import { Component } from '@angular/core';
import { SettingsVM,ColumnDefinition  } from 'sp-grid';

export class AppComponent {
  data: Array<any>;
  colDef: Array<ColumnDefinition>;

  constructor() { }

  ngOnInit() {
    this.colDef = [
      { label: 'Country', key: 'country' },
      { label: 'Capital', key: 'cap'},
      { label: 'Inhabitants', key: 'inhabit', sortable: true }
    ]

    this.data = [
      { country: 'Italy', cap: 'Rome', inhabit: 60483973 },
      { country: 'France', cap: 'Paris', inhabit: 64513000 },
      { country: 'Germany', cap: 'Berlino', inhabit: 83517045 },
      { country: 'Spain', cap: 'Madrid', inhabit: 47000000 },
      { country: 'Portugal', cap: 'Lisbona', inhabit: 1034133 }
    ]
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
```

## Column settings

It is possible to format the data as a number or date.

Date:

**my.component.ts**

```js

...
{ label: 'Date', key: 'date', type: 'date', formatDate: 'dd/MM/yyyy' }
...

```

Number:

**my.component.ts**

```js

...
{ label: 'Inhabitants', key: 'inhabit', type: 'number', formatNumber: '1.0-0' },
...
```
Percentage template default:
**my.component.ts**

```js

...
{ label: '...', key: '...', defaultTemplate: 'percTemplate' }
...

```

Currency template default:
**my.component.ts**

```js

...
{ label: '...', key: '...', defaultTemplate: 'currencyTemplate', currency: '€' }
...

```

Template custom:

**my.component.ts**
```js

...
@ViewChild('plusMinusTemplate', { static: true }) plusMinusTemplate;
...
{ label: 'Inhabitants', key: 'inhabit', template: this.plusMinusTemplate, secondVal: 'country'}
...

```

**my.component.html**

```html
...
<ng-template #plusMinusTemplate let-value let-second="secondVal">
  <span *ngIf="value>0" class="plus-grid">+ </span>
  <span *ngIf="value<0" class="minus-grid">- </span>
  <span [innerText]="value"></span>
</ng-template>
...

```
## Custom theme
You can select a template from the ones we offer or customize each section.

**my.component.ts**
```js
this.settings.theme = 'dark';

this.settings.colorAccent='#47618E';
this.settings.colorBorder='#47618E';
this.settings.colorHover='#47618E';
this.settings.colorLightBackground='#47618E';
this.settings.colorTitle='white';
this.settings.colorTitleBackground='#47618E';
```

## SettingsVM Attributes Map
<table>
  <tr>
    <th align="left">Options</th>
    <th align="left">Type</th>
    <th align="left">Default</th>
  </tr>
  <tr>
    <td>expandable</a></td>
    <td><code>boolean</code></td>
    <td><code>false</code></td>
  </tr>
   <tr>
    <td>paginable</a></td>
    <td><code>boolean</code></td>
    <td><code>false</code></td>
  </tr>
   <tr>
    <td>pageSize</a></td>
    <td><code>number</code></td>
    <td><code>5</code></td>
  </tr>
   <tr>
    <td>pageSizeOptions</a></td>
    <td><code>Array<number></code></td>
    <td><code>[5, 10, 20, 50]</code></td>
  </tr>
   <tr>
    <td>colorTitleBackground</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
   <tr>
    <td>colorLightBackground</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
   <tr>
    <td>colorAccent</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
   <tr>
    <td>colorBorder</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
   <tr>
    <td>colorTitle</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
   <tr>
    <td>colorHover</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
  <tr>
    <td><a href="#theme-details">theme</a></td>
    <td><code>string</code></td>
    <td><code>default</code></td>
  </tr>
</table>

## ColumnDefinition Attributes Map
<table>
  <tr>
    <th align="left">Options</th>
    <th align="left">Type</th>
    <th align="left">Default</th>
  </tr>
  <tr>
    <td><a href="#label-details">label</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
  <tr>
    <td><a href="#key-details">key</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
   <tr>
    <td><a href="#width-details">width</a></td>
    <td><code>string</code></td>
    <td><code>auto</code></td>
  </tr>
  <tr>
    <td>sortable</td>
    <td><code>boolean</code></td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td>editable</td>
    <td><code>boolean</code></td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <td><a href="#type-details">type</a></td>
    <td><code>string</code></td>
    <td><code>string</code></td>
  </tr>
  <tr>
    <td><a href="#formatDate-details">formatDate</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
  <tr>
    <td><a href="#formatNumber-details">formatNumber</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
  <tr>
    <td><a href="#inputType-details">inputType</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
  <tr>
    <td><a href="#optionsSelect-details">optionsSelect</a></td>
    <td><code>Array<string></code></td>
    <td><code>[]</code></td>
  </tr>
  <tr>
    <td>template</td>
    <td><code>TemplateRef<any></code></td>
    <td><code></code></td>
  </tr>
  <tr>
    <td>secondVal</td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
  <tr>
    <td>thirdVal</td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
  <tr>
    <td><a href="#defaultTemplate-details">defaultTemplate</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
  <tr>
    <td><a href="#currency-details">currency</a></td>
    <td><code>string</code></td>
    <td><code></code></td>
  </tr>
</table>

## Theme Details
#### <a name="theme-details"></a> `type`
This value indicates the type of theme
- `default`
- `dark`
- `gray`

## Column Definition - Label
#### <a name="label-details"></a> `label`
This value indicates the label of column

## Column Definition - Key
#### <a name="key-details"></a> `Key`
This value indicates the name of the property of the data source to which it is associated

## Column Definition - Width
#### <a name="width-details"></a> `Width`
This value indicates the width of col in % (ex: <code>'50%'</code>)


## Column Definition - Type
#### <a name="type-details"></a> `type`
This value indicates the type of value
- `number`
- `date`

## Column Definition - Format Date
#### <a name="formatDate-details"></a> `formatDate`
This value indicates the format of date (ex: <code>'dd/MM/yyyy'</code>)

## Column Definition - Format Number
#### <a name="formatNumber-details"></a> `formatNumber`
This value indicates the format of number (ex: <code>'1:0-0'</code>)

## Column Definition - Input Type
#### <a name="inputType-details"></a> `inputType`
You can set this value only if the editable property is true.
- `text`
- `select`
- `date`

## Column Definition - Options Select
#### <a name="optionsSelect-details"></a> `optionsSelect`
You can set this value only if the <code>editable</code> property is <code>true</code> and <code>inputType</code> is <code>select</code>.

## Column Definition - Default Template
#### <a name="defaultTemplate-details"></a> `defaultTemplate`
It is possible to associate a default template.
- `percTemplate`
- `currencyTemplate`

## Column Definition - Currency
#### <a name="currency-details"></a> `currency`
You can set this value only if the <code>default template</code> property is <code>currencyTemplate</code> (es: <code>'€'</code>).

