import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Prime ng modules
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TableModule} from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    MenubarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PanelMenuModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    InputSwitchModule,
    DropdownModule,
    AutoCompleteModule,
    DialogModule],
  exports: [CommonModule, MenubarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PanelMenuModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    InputSwitchModule,
    DropdownModule,
    AutoCompleteModule,
    DialogModule],
})
export class PrimengModule {}
