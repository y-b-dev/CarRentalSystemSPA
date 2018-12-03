import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ICar } from '../../models/car';
import { CarService } from '../../services/car.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.css']
})
export class ManageCarsComponent implements OnInit {

  cars: ICar[];
  private err: boolean;
  private errOnAction: boolean;
  sel: boolean;

  constructor(private carSer: CarService, private route: ActivatedRoute, private router: Router, private userSer: UserService) { }

  ngOnInit() {
    let branchID;
    this.userSer.getUser().subscribe(user => {
      branchID = user.BranchID;
    }).unsubscribe();
    this.carSer.getCarsByBranchID(branchID).subscribe(cars => {
      this.cars = cars.sort((a, b) => a.CarID - b.CarID);
    },
      () => {
        this.err = true;
      })
  }

  onEdit(id) {
    this.router.navigate(['edit/' + id], { relativeTo: this.route })
  }

  onDelete(e) {
    if (confirm("Are you sure you want to remove this car?")) {
      this.carSer.delCar(e[0]).subscribe(() => {
        this.errOnAction = false;
        this.cars.splice(e[1], 1);
        this.cars = this.cars.splice(0);
      }, () => {
        this.errOnAction = true;
      })
    }
  }

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.route })
  }

}
