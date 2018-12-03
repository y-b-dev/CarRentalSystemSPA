import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRent } from '../../../models/rent';

@Component({
  selector: 'r-list',
  templateUrl: './r-list.component.html',
  styleUrls: ['./r-list.component.css']
})
export class RListComponent {
  @Input('rents') rents: IRent[];
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
