import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lscpu',
  templateUrl: './lscpu.component.html',
  styleUrls: ['./lscpu.component.scss']
})
export class LscpuComponent implements OnInit {

  @Input() data

  constructor() { }

  ngOnInit() {
  }

}
