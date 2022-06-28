import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChefService } from 'src/app/services/chef.service';
import { ChefInterface } from 'src/app/interfaces/chef-interface';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.scss'],
})
export class ChefsComponent implements OnChanges {
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;
  chefToUpdate: ChefInterface = {
    _id: '',
    name: '',
    imgUrl: '',
    info: '',
  };

  displayedColumns: string[] = ['imgUrl', 'name', 'info', 'actions'];
  dataSource: ChefInterface[] = [];

  constructor(
    private chefService: ChefService,
    private toast: HotToastService
  ) {
    this.fetchAllChefs();
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  fetchAllChefs() {
    this.chefService.getChefs().subscribe((chefs) => {
      this.dataSource = chefs;
      console.log(chefs);
    });
  }

  deleteChefById(id: string) {
    this.chefService.deleteById(id).subscribe((res: any) => {
      // reponse have coulse have message field (if so, it means delete was now successful);
      console.log(res);
      
      if (res.message) {
        this.toast.error(res.message);
      } else {
        this.toast.success(`${res.name} Deleted!!`);
      }

      this.fetchAllChefs(); // fetch the new chefs again
    });
  }

  updateChef(chosenChef: ChefInterface) {
    this.chefToUpdate = chosenChef;
    // console.log("chefToUpdate: " ,this.chefToUpdate);
    this.showAddModal = false;
    this.showUpdateModal = true;
  }
}
