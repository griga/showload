import {
  Component,
  OnInit,
  ViewChild,
  Input
} from '@angular/core';

import Chart from 'chart.js';
import 'chartjs-plugin-streaming';

@Component({
  selector: 'app-cpu-graph',
  templateUrl: './cpu-graph.component.html',
  styleUrls: ['./cpu-graph.component.scss']
})
export class CpuGraphComponent implements OnInit {

  @ViewChild('chart') chart;

  @Input() data = [];

  private cpuChartRef;
  private values = {
    user: [],
    system: [],
  };

  public labels = {
    total: 0,
    user: 0,
    system: 0,
    idle: 0,
  }

  constructor() {}

  ngOnInit() {

    this.cpuChartRef = new Chart(this.chart.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        // labels: this.labels,
        datasets: [{
            label: 'User',
            data: this.values.user,
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            lineTension: 0.25,
            pointRadius: 0
          },
          {
            label: 'System',
            data: this.values.system,
            backgroundColor: 'rgba(155, 99, 232, 0.25)',
            borderColor: 'rgba(155,99,232,1)',
            borderWidth: 1,
            lineTension: 0.25,
            pointRadius: 0
          }
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
    this.updateCpu()
  }

  private updateCpu = () => {

    if (this.data.length) {

      let next
      while (next = this.data.shift()) {

        this.values.user.push({
          y: next.data.system + next.data.user,
          x: next.time
        })

        this.values.system.push({
          y: next.data.system,
          x: next.time
        })

        this.labels.total = next.data.user + next.data.system + next.data.wa
        this.labels.user = next.data.user
        this.labels.system = next.data.system
        this.labels.idle = next.data.idle
        
      }
    }
  }

}