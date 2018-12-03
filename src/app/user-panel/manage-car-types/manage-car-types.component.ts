import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ICarType } from '../../models/car-type';
import { CarTypeService } from '../../services/car-type.service';

@Component({
  selector: 'manage-car-types',
  templateUrl: './manage-car-types.component.html',
  styleUrls: ['./manage-car-types.component.css']
})
export class ManageCarTypesComponent implements OnInit {

  ct: ICarType[];
  private err: boolean;
  private errOnAction: boolean;
  sel: boolean;

  constructor(private ctSer: CarTypeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.ctSer.getTypes().subscribe(ct => {
      this.ct = ct.sort((a, b) => {
        const am = a.Manufactor;
        const bm = b.Manufactor;
        if (am === bm) {
          const am = a.Model;
          const bm = b.Model;
          if (am === bm) {
            return a.Year - b.Year
          }
          else {
            if (am > bm) {
              return 1;
            }
            else {
              return -1;
            }
          }
        }
        else {
          if (am > bm) {
            return 1;
          }
          else {
            return -1;
          }
        }
      });
    },
      () => {
        this.err = true;
      })
  }

  onEdit(id) {
    this.router.navigate(['edit/' + id], { relativeTo: this.route })
  }

  onDelete(e) {
    if (confirm("Are you sure you want to remove this type?")) {
      this.ctSer.delCT(e[0]).subscribe(() => {
        this.errOnAction = false;
        this.ct.splice(e[1], 1);
        this.ct = this.ct.splice(0);
      }, () => {
        this.errOnAction = true;
      })
    }
  }

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.route })
  }

}
