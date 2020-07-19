import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo-app';
  private mySubscription: Subscription;

  ngOnInit(): void {
    const customObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
        // if(count === 4) {
        //   observer.complete();
        // }
        if(count === 5) {
          observer.error(new Error("Got an Error!"))
        }
      },1000);
    });

    this.mySubscription = customObservable.pipe(map((data: number) => {
      return data**2;
    }), map((data:number) => {
      return 'Round: ' + data;
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error)
    }, () => {
      console.log("Complete");
    });
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe();
  }

}
