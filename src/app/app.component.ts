import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post} from './post.model';
import {Subject} from 'rxjs';
import {NgForm} from '@angular/forms';
import {first, flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('f', {static: false}) singForm: NgForm;
  title = 'krypto';
  defoultData = 'close';

  // chooseData = [{
  //   name: 'Open Time',
  //   code: 'openTime'
  // },
  //   {
  //     name: 'Open',
  //     code: 'open'
  //   },
  //   {
  //     name: 'High',
  //     code: 'high'
  //   }];
  wirdArray: string[] = [];
  isFetching = false;
  answer = '';
  allData = '';
  chooseKrypto = '';
  wartosc = '';
  anotherArray: Post[] = [];


  constructor(private http: HttpClient) {}


  ngOnInit() {
    this.fetchPost();
  }

  onSubmit() {
    this.isFetching = true;
    this.fetchPost();
  }

  private fetchPost() {
      this.http.get<Post[]>('http://www.json-generator.com/api/json/get/bVsKSuowXS')
          .subscribe(post => {
              this.anotherArray = post;
              console.log(this.anotherArray);
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
