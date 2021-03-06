import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DishInterface } from 'src/app/interfaces/dish-interface';
import { RestaurantInterface } from 'src/app/interfaces/restaurant-interface';
import { DishService } from '../../../services/dish.service';
import { RestaurantsService } from '../../../services/restaurants.service';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.scss'],
})
export class AddDishFormComponent implements OnInit {
  selectedValue: string = '';
  addDishForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    isSpicy: new FormControl('', [Validators.required]),
    isVegi: new FormControl('', [Validators.required]),
    isVegan: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    restaurantRef: new FormControl('', [Validators.required]),
  });

  @Input() showForm: boolean = false;
  @Input() restaurants: RestaurantInterface[] = [];
  @Output() hideFormEvent = new EventEmitter<boolean>();
  @Output() fetchData = new EventEmitter();
  constructor(private dishService: DishService , private restService: RestaurantsService) {
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addDishForm.valid) {
      const newDish: DishInterface = {
        ...this.addDishForm.value,
      };
      this.dishService.addDish(newDish).subscribe(res => {
        this.hideForm();
        this.fetchData.emit();
      });
    }
  }
  hideForm() {
    this.hideFormEvent.emit();
  }
}
