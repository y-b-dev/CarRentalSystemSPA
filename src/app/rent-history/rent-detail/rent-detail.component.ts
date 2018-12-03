import { Component, Input } from '@angular/core';
import { IRent } from '../../models/rent';

@Component({
  selector: 'rent-detail',
  templateUrl: './rent-detail.component.html',
  styleUrls: ['./rent-detail.component.css']
})
export class RentDetailComponent {

  @Input('rent') rent: IRent;
  @Input('car') car;

  calcLateDays(): number {
    const miliSecInDay = (1000 * 3600 * 24);
    const endDate = (new Date(this.rent.EndDate)).getTime();
    const actualEnd = (new Date(this.rent.ActualEndDate)).getTime();
    const endDiff = Math.floor((actualEnd - endDate) / miliSecInDay);
    if (endDiff > 0)
      return endDiff;
    return 0;
  }
}
