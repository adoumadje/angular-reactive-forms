import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive-forms';

  form:any;
  // emailRegex:string = '[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$';
  contactRegex:string = '[789][0-9]{9}'

  constructor( fb:FormBuilder ) {
    this.form = fb.group({
      fullName: ['',[
        Validators.required,
        Validators.minLength(5)
      ]],
      email: ['',[
        Validators.required,
        Validators.email
      ]],

      contactDetails: fb.group({
        address: ['',Validators.required],
        shippingAddress: ['',Validators.required],
        contactNo: ['',[
          Validators.required,
          Validators.pattern(this.contactRegex)
        ]]
      }),

      skills: fb.array([])
    })

    // this.form = new FormGroup({
    //   fullName: new FormControl('',[
    //     Validators.required,
    //     Validators.minLength(5)
    //   ]),
    //   email: new FormControl('',[
    //     Validators.required,
    //     // Validators.pattern(this.emailRegex)
    //     Validators.email
    //   ]),

    //   contactDetails: new FormGroup({
    //     address: new FormControl('',Validators.required),
    //     shippingAddress: new FormControl('',Validators.required),
    //     contactNo: new FormControl('',[
    //       Validators.required,
    //       Validators.pattern(this.contactRegex)
    //     ])
    //   }),

    //   skills: new FormArray([])
    // });
  }

  get fullName():FormControl {
    return this.form.get('fullName')
  }

  get email():FormControl {
    return this.form.get('email')
  }

  get contactDetails():FormGroup {
    return this.form.get('contactDetails')
  }

  get address():FormControl {
    return this.form.get('contactDetails.address')
  }

  get shippingAddress():FormControl {
    return this.form.get('contactDetails.shippingAddress')
  }

  get contactNo():FormControl {
    return this.form.get('contactDetails.contactNo')
  }

  get skills():FormArray {
    return this.form.get('skills')
  }

  onSubmit() {
    console.log(this.form.value)
  }

  addSkills(skill:HTMLInputElement) {
    this.skills.push(
      new FormControl(skill.value)
    )

    skill.value = ''

    console.log(this.form.value)
  }

  removeSkill(index:number) {
    this.skills.removeAt(index)
  }
}
