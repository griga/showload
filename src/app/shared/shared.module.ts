import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule, 
    
  ],
  declarations: [],
  
  exports: [ PipesModule ],
})
export class SharedModule { }
