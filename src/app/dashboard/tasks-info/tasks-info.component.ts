import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tasks-info',
  templateUrl: './tasks-info.component.html',
  styleUrls: ['./tasks-info.component.scss']
})
export class TasksInfoComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
