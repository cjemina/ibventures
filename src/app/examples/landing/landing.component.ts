import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  user_details;
  financial_details;

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.user_details = this.formBuilder.group({
      company_name: '',
      sector: '',
      contact_email: '',
      contact_person: ''
    });

  }

 

  ngOnInit() {
    
  }
  onSubmit(customerData) {
    // Process checkout data here
    this.user_details.reset();

    console.warn('Your order has been submitted', customerData);
  }

  // public save(){



  //   this.http.post<any>('http://127.0.0.1:8000/api/user_details', false).subscribe(data => {
      
  //   });
  // }

}
