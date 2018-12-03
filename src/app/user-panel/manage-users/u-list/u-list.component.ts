import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'u-list',
  templateUrl: './u-list.component.html',
  styleUrls: ['./u-list.component.css']
})
export class UListComponent {

  @Input('isUserMode') isUserMode: boolean;
  @Input('users') users;
  @Output('del') del = new EventEmitter<[boolean, number, number]>();
  @Output('edit') edit = new EventEmitter<number>();
  @Output('makeEmp') makeEmp = new EventEmitter<[number, number]>();
  @Output('makeUser') makeUser = new EventEmitter<[number, number]>();
  sel: number;

  show(i) {
    if (this.sel === i)
      this.sel = null;
    else {
      this.sel = i;
    }
  }

}
