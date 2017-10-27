import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-show-speed',
  templateUrl: './show-speed.component.html',
  styleUrls: ['./show-speed.component.scss']
})
export class ShowSpeedComponent implements OnInit {

  @Output() onSpeed = new EventEmitter()
  
    
    @Input() settings;
    @Input() bounds;
    
  constructor() { }

  ngOnInit() {
  }

  onSpeedChange($event, speed){
    $event.preventDefault()
    this.onSpeed.emit(speed)
  }


}
