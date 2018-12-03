import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICarWithTypeAndDates } from '../../models/carWithTypesAndDates';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input('car') car: ICarWithTypeAndDates;
  @Output('total') private emitTot: EventEmitter<number>;
  @Output('remove') emitRemove: EventEmitter<number>;
  @Output('dates') private emitDates: EventEmitter<Date[]>;
  private total: number;
  bsValue = new Date();
  bsRangeValue: Date[];
  private isValidRange: boolean;
  private dateLen: number;

  constructor() {
    this.emitTot = new EventEmitter<number>();
    this.emitRemove = new EventEmitter<number>();
    this.emitDates = new EventEmitter<Date[]>();
  }

  ngOnInit(): void {
    this.dateLen = this.car.Dates.length;
  }

  setTotal(dateRange) {
    this.isValidRange = true;
    if (!this.dateLen) {
      this.bsRangeValue = dateRange;
      const dayDiff = Math.ceil((this.bsRangeValue[1].getTime() - this.bsRangeValue[0].getTime()) / (1000 * 3600 * 24));
      this.emitTot.emit(this.total = dayDiff * this.car.DailyPrice);
      this.emitDates.emit(this.bsRangeValue)
    }
    else {
      this.bsRangeValue = dateRange;
      let start = this.bsRangeValue[0];
      let end = this.bsRangeValue[1];
      for (let i = 0; i < this.dateLen; i++) {
        // console.log(dateRange)
        const dates = this.car.Dates[i];
        // console.log(dates)
        if (!(start.setHours(0, 0, 0, 0) > new Date(dates['EndDate']).getTime() || end.setHours(0, 0, 0, 0) < new Date(dates['StartDate']).getTime())) {
          this.isValidRange = false;
          break;
        }
      }
      if (this.isValidRange) {
        const dayDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        this.emitTot.emit(this.total = dayDiff * this.car.DailyPrice);
        this.emitDates.emit(this.bsRangeValue)
      }
    }
  }
}
