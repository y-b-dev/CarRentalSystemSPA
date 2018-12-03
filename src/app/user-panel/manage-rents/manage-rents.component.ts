import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { RentService } from '../../services/rent.service';

@Component({
  selector: 'manage-rents',
  templateUrl: './manage-rents.component.html',
  styleUrls: ['./manage-rents.component.css']
})
export class ManageRentsComponent implements OnInit {

  rents;
  private err: boolean;
  private errOnAction: boolean;
  sel: boolean;

  constructor(private rentSer: RentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rentSer.getRentsForManager().subscribe(r => {
      this.rents = r.sort((a, b) => {
        const a_start = new Date(a.StartDate).getTime();
        const b_start = new Date(b.StartDate).getTime();
        if (a_start === b_start) {
          const a_end = new Date(a.EndDate).getTime();
          const b_end = new Date(b.EndDate).getTime();
          if (a_end === b_end) {
            return new Date(a.ActualEndDate).getTime() - new Date(b.ActualEndDate).getTime()
          }
          else {
            if (a_end > b_end) {
              return 1;
            }
            else {
              return -1;
            }
          }
        }
        else {
          if (a_start > b_start) {
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
    if (confirm("Are you sure you want to delete this rent?")) {
      this.rentSer.delRent(e[0]).subscribe(() => {
        this.errOnAction = false;
        this.rents.splice(e[1], 1);
        this.rents = this.rents.splice(0);
      }, () => {
        this.errOnAction = true;
      })
    }
  }

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.route })
  }

}
