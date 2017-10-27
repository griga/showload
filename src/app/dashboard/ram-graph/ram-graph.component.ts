import {
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';

import Chart from 'chart.js';
import 'chartjs-plugin-streaming';

@Component({
  selector: 'app-ram-graph',
  templateUrl: './ram-graph.component.html',
  styleUrls: ['./ram-graph.component.scss']
})
export class RamGraphComponent implements OnInit {

  @ViewChild('chart') chart;

  @Input() data = [];

  private cpuChartRef;
  private values = {
    used: [],
    
  };

  public labels = {
    buffers: 0,
    free: 0,
    total: 0,
    used: 0,
    percent: 0,
  }

  constructor() {}

  ngOnInit() {

    this.cpuChartRef = new Chart(this.chart.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        // labels: this.labels,
        datasets: [{
            label: 'Memory Usage',
            data: this.values.used,
            backgroundColor: 'rgba(99, 255,  132, 0.25)',
            borderColor: 'rgba(99, 255,132,1)',
            borderWidth: 1,
            lineTension: 0.25,
            pointRadius: 0
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            type: 'realtime',
            display: true,
          }],
          yAxes: [{
            ticks: {
              min: 0, 
              max: 100,
              maxTicksLimit: 4,
              fontFamily: "'Roboto', sans-serif",
              fontColor: 'rgba(111, 99, 111, .3)'
            }
          }],
        },
        plugins: {
          streaming: {
            duration: 20000,
            refresh: 1000,
            delay: 2000,
            onRefresh: this.onRefresh
          }
        },
        legend: {
          display: true,
          labels: {
            padding: 20,
            fontFamily: "'Roboto', sans-serif",
            fontColor: 'rgba(111, 99, 111, .8)'
          }
        }
      },
    })

    this.onRefresh()
  }


  private onRefresh = () => {
    this.updateValues()
  }

  private updateValues = () => {

    if (this.data.length) {

      let next
      while (next = this.data.shift()) {

        this.values.used.push({
          y:  next.data.used * 100 / next.data.total ,
          x: next.time
        })

        this.labels.buffers = next.data.buffers
        this.labels.free = next.data.free * 1024
        this.labels.total = next.data.total * 1024
        this.labels.used = next.data.used * 1024
        this.labels.percent = next.data.used * 100 / next.data.total 

      }
    }
  }

}