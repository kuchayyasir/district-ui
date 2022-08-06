import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from './app.service';
export interface IDistrict {
  name: string;
  image: string;
  description: string;
  link: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'districtUI';
  private readonly unsubscribe$: Subject<void> = new Subject();
  districts: Array<IDistrict>;
  constructor(private appService: AppService) {
    this.districts = [];
  }
  ngOnInit(): void {
    this.getDistricts();
  }
  getDistricts() {
    this.appService
      .getDistricts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: any) => {
          console.log('>>>>>>Data>>>>>>>', data);
          this.districts = data;
        },
        (err: Error) => {
          console.log('>>>>>>Error>>>>>>>', err);
        },
        () => {
          console.log('>>>>>>Complete>>>>>>>');
        }
      );
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
