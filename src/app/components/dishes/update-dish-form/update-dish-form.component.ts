import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantInterface } from 'src/app/interfaces/restaurant-interface';
import { DishInterface } from '../../../interfaces/dish-interface';
import { DishService } from '../../../services/dish.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-update-dish-form',
  templateUrl: './update-dish-form.component.html',
  styleUrls: ['./update-dish-form.component.scss'],
})
export class UpdateDishFormComponent implements OnInit {
  selectedValue: string = '';
  updateDishForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    isSpicy: new FormControl('', [Validators.required]),
    isVegi: new FormControl('', [Validators.required]),
    isVegan: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    restaurantRef: new FormControl('', [Validators.required]),
  });

  @Input() showUpdateForm: boolean = false;
  @Input() dishToUpdate: DishInterface = {
    _id: '',
    name: '',
    img: '',
    description: '',
    isSpicy: false,
    isVegi: false,
    isVegan: false,
    price: 0,
    restaurantRef: '',
  };
  @Input() restaurants: RestaurantInterface[] = [];

  @Output() hideFormEvent = new EventEmitter<boolean>();
  @Output() fetchData = new EventEmitter();

  constructor(
    private dishService: DishService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    // console.log( this.dishToUpdate.restaurantRef)
    this.updateDishForm.setValue({
      name: this.dishToUpdate.name,
      img: this.dishToUpdate.img,
      description: this.dishToUpdate.description,
      isSpicy: this.dishToUpdate.isSpicy,
      isVegi: this.dishToUpdate.isVegi,
      isVegan: this.dishToUpdate.isVegan,
      price: this.dishToUpdate.price,
      restaurantRef: this.dishToUpdate.restaurantRef._id,
    });
    // this.selectedValue = this.dishToUpdate.restaurantRef.name;
  }

  hideForm() {
    this.hideFormEvent.emit();
  }

  onSubmit() {
    if (this.updateDishForm.valid) {
      const updatedDishDetails: DishInterface = this.updateDishForm.value;
      const updatedDishId = this.dishToUpdate._id;
      this.dishService
        .updateDish(updatedDishDetails, updatedDishId)
        .subscribe((res: any) => {
          if (res.name) {
            this.toast.success(`${res.name} Updated!`)
          } else {
            this.toast.error(`Error updating dish`)
          }
          this.hideForm();
          this.fetchData.emit();
        });
    } else {
      this.toast.error(`Invalid Form!`)
    }
  }
}
