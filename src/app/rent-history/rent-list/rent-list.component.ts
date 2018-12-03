import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IRent } from '../../models/rent';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.css']
})
export class RentListComponent {
  @Input('rents') rents: IRent[];
  @Output('selRent') selRent: EventEmitter<IRent> = new EventEmitter();
}
