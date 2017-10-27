import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent implements OnInit {

  @Output() onOrder = new EventEmitter()
  @Output() onLimit = new EventEmitter()

  @Input() data;
  @Input() ram;
  @Input() settings;
  @Input() bounds;

  private total
  models = []
  constructor() { }

  ngOnInit() {}

  ngOnChanges(){
    
    if(!this.total && this.ram.length){
      this.total = this.ram[0].data.total
    }
    if(this.data){
      this.models = this.data.map(it => {
        return {
          command: it.command,
          cpu: it.cpu,
          mem: it.mem,
          bytes: (this.total ? parseFloat(it.mem) * this.total / 100: 0) * 1024,
          user: it.user,
        }
      })
    }
  }

  onOrderChange($event, order){
    $event.preventDefault()
    this.onOrder.emit(order)
  }

  onLimitChange($event, limit){
    $event.preventDefault()
    this.onLimit.emit(limit)
  }


  
// command : "chrome"
// cpu : "114.8"
// mem : "4.1"
// ni : "0"
// pid : "2620"
// pr : "20"
// res : "158552"
// s : "R"
// shr : "63364"
// time : "0:01.80"
// user : "griga"
// virt : "917656"

}
