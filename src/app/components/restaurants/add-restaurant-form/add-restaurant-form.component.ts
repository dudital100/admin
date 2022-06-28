import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChefInterface } from 'src/app/interfaces/chef-interface';
import { RestaurantInterface } from 'src/app/interfaces/restaurant-interface';
import { RestaurantsService } from '../../../services/restaurants.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-add-restaurant-form',
  templateUrl: './add-restaurant-form.component.html',
  styleUrls: ['./add-restaurant-form.component.scss']
})
export class AddRestaurantFormComponent implements OnInit {
  selectedValue: string = '';
  addRestForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    chef: new FormControl('', [Validators.required]),
    isNewRest: new FormControl('', [Validators.required]),
    isOpen: new FormControl('', [Validators.required]),
    isPopular: new FormControl('', [Validators.required]),
    signatureDish: new FormControl('', [Validators.required])
  });

  @Input() showForm: boolean = false;
  @Input() chefs: ChefInterface[] = []

  @Output() hideFormEvent = new EventEmitter<boolean>(); 
  @Output() fetchData = new EventEmitter();

  constructor(private restService :RestaurantsService, private toast: HotToastService) { 
    
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.addRestForm.valid) {
      const newRest: RestaurantInterface = this.addRestForm.value;
      this.restService.addRestaurant(newRest).subscribe( (res: any) => {
        if (res.name) {
          this.toast.success(`${res.name} Added!`);
        }
        console.log(res);        
        this.hideForm();
        this.fetchData.emit();
      });
    } else {
      this.toast.error("Invalid form!")
    }
}
hideForm() {
  this.hideFormEvent.emit();
}

}
