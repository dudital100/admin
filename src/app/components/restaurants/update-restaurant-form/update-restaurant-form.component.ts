import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChefInterface } from 'src/app/interfaces/chef-interface';
import { DishInterface } from 'src/app/interfaces/dish-interface';
import { DishService } from 'src/app/services/dish.service';
import { RestaurantInterface } from '../../../interfaces/restaurant-interface';
import { RestaurantsService } from '../../../services/restaurants.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-update-restaurant-form',
  templateUrl: './update-restaurant-form.component.html',
  styleUrls: ['./update-restaurant-form.component.scss'],
})
export class UpdateRestaurantFormComponent implements OnInit, OnChanges {
  selectedValue: string = '';
  updateRestForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    chef: new FormControl('', [Validators.required]),
    isNewRest: new FormControl('', [Validators.required]),
    isOpen: new FormControl('', [Validators.required]),
    isPopular: new FormControl('', [Validators.required]),
    signatureDish: new FormControl('', [Validators.required]),
  });
  restaurantDishes: DishInterface[] = [];

  @Input() showUpdateForm: boolean = false;
  @Input() restToUpdate: RestaurantInterface = {
    _id: '',
    name: '',
    img: '',
    chef: '',
    isNewRest: false,
    isOpen: false,
    isPopular: false,
    signatureDish: '',
  };
  @Input() chefs: ChefInterface[] = [];
  @Output() hideFormEvent = new EventEmitter<boolean>();
  @Output() fetchData = new EventEmitter();

  constructor(
    private restService: RestaurantsService,
    private dishService: DishService,
    private toast: HotToastService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    // this.fetchCurrentResDishes();
  }

  fetchCurrentResDishes() {
    const filter = {
      filter: {
        restaurantRef: this.restToUpdate._id,
      },
    };
    this.dishService.getfilteredDishes(filter).subscribe((dishes) => {
      this.restaurantDishes = dishes;
    });
  }

  ngOnInit(): void {
    this.updateRestForm.setValue({
      name: this.restToUpdate.name,
      img: this.restToUpdate.img,
      chef: this.restToUpdate.chef._id,
      isNewRest: this.restToUpdate.isNewRest,
      isOpen: this.restToUpdate.isOpen,
      isPopular: this.restToUpdate.isPopular,
      signatureDish: this.restToUpdate.signatureDish._id,
    });
    this.fetchCurrentResDishes();
  }
  hideForm() {
    this.hideFormEvent.emit();
  }
  onSubmit() {
    // console.log(this.updateRestForm.value);
    if (this.updateRestForm.valid) {
      const updatedDishDetails: RestaurantInterface = this.updateRestForm.value;
      const updatedDishId = this.restToUpdate._id;
      this.restService
        .updateRestaurant(updatedDishDetails, updatedDishId)
        .subscribe((res: any) => {
          if (res.name) {
            this.toast.success(`${res.name} Updated!`);
          }
          this.hideForm();
          this.fetchData.emit();
        });
    } else {
      this.toast.error("Invalid form!");
    }
  }
}
