import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Prime ng modules
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    MenubarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PanelMenuModule],
  exports: [CommonModule, MenubarModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PanelMenuModule],
})
export class PrimengModule {}
