import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { RestaurantInterface } from 'src/app/interfaces/restaurant-interface';
import { HotToastService } from '@ngneat/hot-toast';

// import { MatTableDataSource } from '@angular/material/table';
// import {MatSort, Sort} from '@angular/material/sort';
import { ChefInterface } from 'src/app/interfaces/chef-interface';
import { ChefService } from 'src/app/services/chef.service';
// import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit, OnChanges {
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  restToUpdate: RestaurantInterface = {
    _id: '',
    name: '',
    img: '',
    chef: '',
    signatureDish: '',
    isNewRest: false,
    isPopular: false,
    isOpen: false,
  };
  displayedColumns: string[] = [
    'img',
    'name',
    'chef',
    'signatureDish',
    'isNewRest',
    'isPopular',
    'isOpen',
    'actions',
  ];
  dataSource: RestaurantInterface[] = [];
  chefs: ChefInterface[] = [];

  // constructor(private restaurantService: RestaurantsService , public dialog: MatDialog) {
  constructor(
    private restaurantService: RestaurantsService,
    private chefsService: ChefService,
    private toast: HotToastService
  ) {
    this.fetchAllRestaurants();
    this.fetchAllChefs();
  }
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.fetchAllRestaurants();
    this.fetchAllChefs();
  }

  openAddForm(): void {
    this.showUpdateModal = false;
    this.showAddModal = true;
  }

  closeAddForm(): void {
    this.showAddModal = false;
  }
  openUpdateForm(): void {
    this.showAddModal = false;
    this.showUpdateModal = true;
  }

  closeUpdateForm(): void {
    this.showUpdateModal = false;
  }

  fetchAllRestaurants() {
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      this.dataSource = restaurants;
      // console.log(restaurants);
    });
  }

  fetchAllChefs() {
    this.chefsService.getChefs().subscribe((chefs) => {
      this.chefs = chefs;
      // console.log(restaurants);
    });
  }

  deleteRestById(id: string) {
    this.restaurantService.deleteById(id).subscribe((res: any) => {
      // in order to show the admin if the restaurant has been deleted, and how many dishes were connected to that restaurant.
      // console.log(rest.dishesDelete.deletedCount);
      // console.log(rest.restDelete.deletedCount);
      console.log(res);
      
      if (res.message) {
        this.toast.error(res.message);
      }
      else {
        if (res.dishesDelete.modifiedCount)
          this.toast.success(`${res.restDelete.name} and it's ${res.dishesDelete.modifiedCount} ${res.dishesDelete.modifiedCount === 1 ? "dish" : "dishes" } have been deleted successfully`);
        else {
          this.toast.success(`${res.restDelete.name} has been deleted successfully`);
        }
      }

      // should i update the current array avaiable in the component?
      this.fetchAllRestaurants(); // fetch the new rests again
    });
  }

  updateRest(updatedRest: RestaurantInterface) {
    this.restToUpdate = updatedRest;
    this.openUpdateForm();
  }
}

// @Component({
//   selector: 'dialog-animations-example-dialog',
//   template: `<h1>sss</h1>
//   <h2>aaa</h2>`,
// })
// export class DialogAnimationsExampleDialog {
//   constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
// }
