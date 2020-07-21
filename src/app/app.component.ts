import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {CredentialModel} from './credential.model';
import {CredentialService} from './credential.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo-app';
  // private mySubscription: Subscription;
  @ViewChild('f') loginForm: HTMLFormElement;
  credentials: Array<CredentialModel> = [];

  constructor(private credentialService: CredentialService) {}

  ngOnInit(): void {
    this.onFetchData();
    // const customObservable = new Observable((observer) => {
    //   let count = 0;
    //   setInterval(() => {
    //     observer.next(count);
    //     count++;
    //     // if(count === 4) {
    //     //   observer.complete();
    //     // }
    //     if(count === 5) {
    //       observer.error(new Error("Got an Error!"))
    //     }
    //   },1000);
    // });
    // this.mySubscription = customObservable.pipe(map((data: number) => {
    //   return data**2;
    // }), map((data:number) => {
    //   return 'Round: ' + data;
    // })).subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error)
    // }, () => {
    //   console.log("Complete");
    // });
  }

  ngOnDestroy(): void {
    // this.mySubscription.unsubscribe();
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.credentialService.submitData(this.loginForm.value).subscribe(data => {
      console.log(data);
      this.onFetchData();
      this.loginForm.reset();
    }, err => {
      console.log(err);
    });

  }

  onFetchData() {
    this.credentialService.fetchData().subscribe(data => {
      console.log(data);
      this.credentials = data;
    }, error => {
      console.log(error);
    });
  }

  onClearData() {
    this.credentialService.deleteData().subscribe(data => {
      console.log(data);
      this.onFetchData();
    });
  }
}
