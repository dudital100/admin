import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChefService } from 'src/app/services/chef.service';
import { ChefInterface } from 'src/app/interfaces/chef-interface';
import { DeleteResponse } from '../../interfaces/delete-response';

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
    imgUrl:'',
    info: ''
  }

  displayedColumns: string[] = ['imgUrl', 'name', 'info', 'actions'];
  dataSource: ChefInterface[] = [];

  constructor(private chefService: ChefService) {
    this.fetchAllChefs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchAllChefs();
  }

  openAddForm(): void {
    this.showUpdateModal = false;
    this.showAddModal = true;
  }

  closeAddForm(): void{
    this.showAddModal = false;
  }
  openUpdateForm(): void {
    this.showAddModal = false;
    this.showUpdateModal = true;
  }

  closeUpdateForm(): void{
    this.showUpdateModal = false;
  }

  fetchAllChefs() {
    this.chefService.getChefs().subscribe((chefs) => {
      this.dataSource = chefs;
      console.log(chefs);
    });
  }

  deleteChefById(id: string) {
    console.log(id);
    this.chefService.deleteById(id).subscribe((response: DeleteResponse) => {
      // reponse have coulse have message field (if so, it means delete was now successful);
      console.log(response);
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
