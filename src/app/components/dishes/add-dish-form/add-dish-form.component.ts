import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DishInterface } from 'src/app/interfaces/dish-interface';
import { RestaurantInterface } from 'src/app/interfaces/restaurant-interface';
import { DishService } from '../../../services/dish.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.scss'],
})
export class AddDishFormComponent implements OnInit {
  selectedRestValue: string = '';
  selectedTypeValue: string = '';

  addDishForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    isSpicy: new FormControl(false, [Validators.required]),
    isVegi: new FormControl(false, [Validators.required]),
    isVegan: new FormControl(false, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    mealType: new FormControl('', [Validators.required]),
    restaurantRef: new FormControl('', [Validators.required]),
  });

  @Input() showForm: boolean = false;
  @Input() restaurants: RestaurantInterface[] = [];
  @Output() hideFormEvent = new EventEmitter<boolean>();
  @Output() fetchData = new EventEmitter();
  constructor(
    private dishService: DishService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.addDishForm.valid) {
      const newDish: DishInterface = {
        ...this.addDishForm.value,
      };
      console.log(newDish);
      
      this.dishService.addDish(newDish).subscribe((res: any) => {
        if (res.name) {
          this.toast.success(`${res.name} Added!`);
        }
        this.hideForm();
        this.fetchData.emit();
      });
    } else {
      this.toast.error("Invalid form!");
    }
  }
  hideForm() {
    this.hideFormEvent.emit();
  }
}
