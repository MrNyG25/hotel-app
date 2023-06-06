import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Prime ng modules
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [CommonModule, MenubarModule],
  exports: [MenubarModule, ButtonModule, CardModule, InputTextModule],
})
export class PrimengModule {}
