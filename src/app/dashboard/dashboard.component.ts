import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import * as moment from 'moment';


import {
  SocketService
} from '../socket/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public data = {
    cpu: [],
    ram: [],
    swap: [],
    task: null,
    process: null,
  }

  public settings = {
    limit: 10,
    order: '%CPU',
    speed: '1'
  }

  public bounds = {
    limits: [10, 20, 30, 40, 50 ],
    orders: ['%CPU', '%MEM'],
    speeds: ['.5','1','2','5','10']
  }
  
  public lscpu

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.on('showload').subscribe((data) => {      
      this.data.cpu.push({
        data: data.cpu,
        time: moment()
      }) 
      this.data.ram.push({
        data: data.ram,
        time: moment()
      })          
      this.data.swap.push({
        data: data.swap,
        time: moment()
      }) 
      this.data.task = data.task
      this.data.process = data.process

    })  

    this.socketService.on('settings').subscribe((data)=>{
      this.settings = data
    })


    this.socketService.on('lscpu').subscribe((data)=>{
      this.lscpu = data
      console.log(data);
    })
  }

  onOrder(order){    
    this.socketService.emit('config', {order}).subscribe(()=>{})
  }

  onLimit(limit){
    this.socketService.emit('config', {limit}).subscribe(()=>{})
  }

  onSpeed(speed){
    this.socketService.emit('config', {speed}).subscribe(()=>{})
  }
}