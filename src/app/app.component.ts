import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ProgressbarService } from './services/progressbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'ap-fire-project';
  // subscription: Subscription;
  mode: string
  value: number

  constructor(private primengConfig: PrimeNGConfig,
    // private brapiService: BrapiApiService,
    private progressbar: ProgressbarService,
  ) { }

  ngOnInit() {
    console.log("init home");

    this.primengConfig.ripple = true;
    // this.subscription = this.brapiService.getStockList$.subscribe()
    this.progressbar.mode$.subscribe(m => {
      this.mode = m
      if (m == 'determinate') {
        for (let index = 0; index < 101; index++) {
          this.value = index
        }
        setTimeout(() => {
          this.value = 0
        }, 300);
      }
    })
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
