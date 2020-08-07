import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
    input_details;

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.input_details = this.fb.group({
            user_details: this.fb.group({
                company_name: '',
                sector: '',
                contact_email: '',
                contact_person: ''
            }),
            financial_details: this.fb.group({
                revenue: '',
                years_of_growth: '',
                avg_ebitda_last_3_years: '',
                avg_net_result_last_3_years: '',
                years_with_positive_result: '',
                net_debt: '',
                fixed_assets: '',
                biggest_shareholder: '',
                revenue_from_biggest_client: '',
                is_the_company_audited: '',
                m_and_a_in_the_last_5_years: '',
                selling_90_percent: '',
            })
        });
    }

    ngOnInit() {
       
    }

    onSubmit(input_details) {
        
        this.http.post('http://localhost:8000/api/user_details', input_details.user_details).subscribe((user_result: any) => {
            if(user_result.status == 'ok'){
                let user_id = user_result.user_id;
                input_details.financial_details['user_id'] = user_id;
                this.http.post('http://localhost:8000/api/financial_details', input_details.financial_details).subscribe((financial_result: any) => {
                    console.log(financial_result);
                    this.http.get('http://localhost:8000/api/formula/' + financial_result.id).subscribe((result: any) => {
                        if(result.decision == 'GO'){
                            alert("Thanks for sending information about your company. It seems to fit “Iberian Ventures” investment criteria – an associate in the team will reach out to you for next steps");    
                        }else{
                            alert("Thanks for sending information about your company. Unfortunately, it seems that this company does not meet “Iberian Ventures” investment criteria. Regardless, we will take a second look in detail and send you an email");
                        }
                    });
                    this.http.get('http://localhost:8000/api/mail/' + financial_result.id).subscribe((result: any) => {});
                });
            }
        });

    }
}
