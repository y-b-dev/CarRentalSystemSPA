import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'c-list',
  templateUrl: './c-list.component.html',
  styleUrls: ['./c-list.component.css']
})
export class CListComponent {
  @Input('cars') cars;
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
