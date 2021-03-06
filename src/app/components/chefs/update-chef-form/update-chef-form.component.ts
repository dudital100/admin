import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChefService } from '../../../services/chef.service';
import { ChefInterface } from '../../../interfaces/chef-interface';

@Component({
  selector: 'app-update-chef-form',
  templateUrl: './update-chef-form.component.html',
  styleUrls: ['./update-chef-form.component.scss'],
})
export class UpdateChefFormComponent implements OnInit {
  updateChefForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    imgUrl: new FormControl('', [Validators.required]),
    info: new FormControl('', [Validators.required]),
  });

  @Input() showUpdateForm: boolean = false;
  @Input() chefToUpdate: ChefInterface = {
    _id: '',
    name: '',
    imgUrl: '',
    info: '',
  };
  @Output() hideFormEvent = new EventEmitter<boolean>();
  @Output() fetchData = new EventEmitter();

  constructor(private chefService: ChefService) {}

  ngOnInit(): void {
    // console.log(this.chefToUpdate)
    this.updateChefForm.setValue({
      name: this.chefToUpdate.name,
      imgUrl: this.chefToUpdate.imgUrl,
      info: this.chefToUpdate.info,
    });
  }

  async onSubmit() {
    if (this.updateChefForm.valid) {
      const updatedChefId = this.chefToUpdate._id;
      const updatedChefDetails = this.updateChefForm.value;
      await this.chefService.updateChef(updatedChefDetails, updatedChefId).subscribe((res) => {
        this.hideForm();
        this.fetchData.emit();
      });
    }
  }

  hideForm() {
    this.hideFormEvent.emit();
  }
}
