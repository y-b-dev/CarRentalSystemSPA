import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ICarWithTypeAndDates } from '../../models/carWithTypesAndDates';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent {
  @Input('car') car: ICarWithTypeAndDates;
  @Input('fav') fav: boolean;
  @Output('goTo') goTo: EventEmitter<ICarWithTypeAndDates> = new EventEmitter();
  @Output('addTo') addTo: EventEmitter<ICarWithTypeAndDates> = new EventEmitter();
  @Output('emitCarID') emitCarID: EventEmitter<number> = new EventEmitter();
}
