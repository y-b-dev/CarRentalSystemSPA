import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GEAR, ICarType } from '../../../models/car-type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ct-list',
  templateUrl: './ct-list.component.html',
  styleUrls: ['./ct-list.component.css']
})
export class CtListComponent {
  gear = GEAR;
  @Input('ct') ct: ICarType[];
  @Output('del') del = new EventEmitter<[number, number]>();
  @Output('edit') edit = new EventEmitter<number>();

  sel: number;

  show(i) {
    if (this.sel === i)
      this.sel = null;
    else {
      this.sel = i;
    }
  }
}
