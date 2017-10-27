import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpuGraphComponent } from './cpu-graph/cpu-graph.component';
import { DashboardComponent } from './dashboard.component';
import { RamGraphComponent } from './ram-graph/ram-graph.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { SwapGraphComponent } from './swap-graph/swap-graph.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { ShowSpeedComponent } from './show-speed/show-speed.component';
import { TasksInfoComponent } from './tasks-info/tasks-info.component';
import { LscpuComponent } from './lscpu/lscpu.component';

@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
  declarations: [
    DashboardComponent,
    CpuGraphComponent,
    RamGraphComponent,
    SwapGraphComponent,
    ProcessListComponent,
    ShowSpeedComponent,
    TasksInfoComponent,
    LscpuComponent]
})
export class DashboardModule { }
