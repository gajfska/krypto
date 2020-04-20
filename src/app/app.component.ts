import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post} from './post.model';
import {Subject} from 'rxjs';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {first, flatMap, map} from 'rxjs/operators';


export interface Cartoon {
    id: number;
    name: string;
    data: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // @ViewChild('f', {static: false}) singForm: NgForm;

  title = 'krypto';

  wirdArray: string[] = [];
  isFetching = false;
  anotherArray: string[] = [];

  Data: Array<any> = [
        {name: 'Date', value: 0},
        {name: 'Price', value: 1},
        {name: 'High', value: 2},
        {name: 'Low', value: 3},
        {name: 'Close', value: 4},
        {name: 'Volume', value: 5},
        {name: 'Close Time', value: 6},
        {name: 'Quote Asset Volume', value: 7},
        {name: 'Number Of Trades', value: 8},
        {name: 'Taker Buy Base Asset Volume', value: 9},
        {name: 'Taker Buy Quote Asset Volume', value: 10},
        {name: 'Can Be Ignored', value: 11}
        ];
  form: FormGroup;

    constructor(private http: HttpClient,
                private fb: FormBuilder) {
        this.form = this.fb.group({
            checkArray: this.fb.array([])
        })
    }

    onCheckboxChange(e) {
        const checkArray: FormArray = this.form.get('checkArray') as FormArray;

        if (e.target.checked) {
            checkArray.push(new FormControl(e.target.value));
        } else {
            for (let i = 0; i < checkArray.controls.length; i++) {
                if (checkArray.at(i).value == e.target.value) {
                    checkArray.removeAt(i);
                }
            }
        }
    }

    submitForm() {
        this.isFetching = true;
        console.log(this.form.value);
        this.fetchPost();
    }

    ngOnInit() {
  }


  private fetchPost() {

      this.http.get<Post[]>('https://cors-anywhere.herokuapp.com/http://www.json-generator.com/api/json/get/bVsKSuowXS')
          .pipe(map(samples => {
              return samples
                  .map(value => {
                      const checkArray: FormArray = this.form.get('checkArray') as FormArray;

                      let rawArray: number[] = [];
                      let singleValue = "";

                      checkArray.controls.forEach((item: FormControl) => {
                            rawArray.push(item.value)
                      });

                      rawArray.sort((n1,n2) => n1 - n2);

                      rawArray.forEach((indexValue: number) => {
                          if (singleValue !== "") {
                              singleValue += " ; ";
                          }
                          singleValue += `${value[indexValue]}`
                      });
                      return singleValue
                  })
          })

          ).subscribe(post => {
              this.anotherArray = post;
              console.log(this.anotherArray);

            this.wirdArray = post.map(data => {
    return `\n${data}`;
  });
          });
  }

//
//   pipe(
//     RxOp.map(samples => {
//   return samples.map(value => {
//   return { date: value[0], price: value[1] }
// })
// }),
// RxOp.flatMap(function(x) { return x; }),
// .pipe(flatMap(data => {
//   return data;
// }),
// map(value => {
//   return {date: value[0] };
// })
// )
// .subscribe(post => {
//   // this.wirdArray = post.map(data => {
//   //   return `\n${data.date}`;
//   // });
//   console.log(post);
// });

}
