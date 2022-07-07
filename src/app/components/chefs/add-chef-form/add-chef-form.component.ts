import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChefService} from '../../../services/chef.service';
import { ChefInterface } from 'src/app/interfaces/chef-interface';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-add-chef-form',
  templateUrl: './add-chef-form.component.html',
  styleUrls: ['./add-chef-form.component.scss']
})
export class AddChefFormComponent implements OnInit {
  addChefForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    imgUrl: new FormControl('', [Validators.required]),
    info: new FormControl('', [Validators.required]),
  });

  @Input() showForm: boolean = false;
  @Output() hideFormEvent = new EventEmitter<boolean>();
  @Output() fetchData = new EventEmitter();

  constructor(private chefService: ChefService, private toast: HotToastService) { }

  ngOnInit(): void {
  }

   onSubmit() {
    if (this.addChefForm.valid) {      
      const newChef: ChefInterface = {
        ...this.addChefForm.value
      }
      this.chefService.addChef(newChef).subscribe((res: any) => {     
        // console.log(res);
        if (res.name) {
          this.toast.success(`${res.name} Added!`);
        } else {
          this.toast.error("Could't Add Chef");
        }

        this.hideForm();
        this.fetchData.emit();
      })
      
    } else {
      this.toast.error("Invalid form!");
    }
  }

  hideForm() {
    this.hideFormEvent.emit();
  }

}
