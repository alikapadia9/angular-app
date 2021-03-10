import { Component, OnInit } from '@angular/core';
import { from, of} from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { concatAll, concatMap, delay, mergeAll, mergeMap, switchAll } from 'rxjs/operators'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  getMapData(data: string) {
    return of('MergeMap ' + data).pipe(delay(1000));
  }
  
  getConcatData(data: string) {
    return of('ConcatMap ' + data).pipe(delay(2000));
  }

  getSwitchData(data: string) {
    return of('SwitchMap ' + data).pipe(delay(9000));
  }
  constructor() { }

  ngOnInit(): void {
  
    const source = from(['ali','pratik','umang']);
    
    // source.pipe(
    //   map(res => this.getMapData(res)),
    //   mergeAll()
    // )
    // .subscribe(
    //   (res: any) => {
    //     console.log(res);
    //   }
    // )

    /* mergeMap */
    source.pipe(
      mergeMap(res => this.getMapData(res))
    )
    .subscribe(
      (res: any) => {
        console.log(res); 
      }
    )


    /* map + concatAll() */
    // source.pipe(
    //   map(res => this.getConcatData((res)),
    //   concatAll()
    // )
    // .subscribe(
    //   (res: any) => {
    //      console.log(res);
    //   }
    // )

    /* concatMap() */
    source.pipe(
      concatMap(res => this.getConcatData(res)),
    )
    .subscribe(
      (res: any) => {
        console.log(res);
      }
    )

    
    /* map + SwitchAll() */
    source.pipe(
      map(res => this.getSwitchData(res)),
      switchAll()
    )
    .subscribe(
      (res: any) => {
        console.log(res);
      }
    )

    /* concatMap() */
    // source.pipe(
    //   switchMap(res => this.getData(res)),
    // )
    // .subscribe(
    //   (res: any) => {
    //     return this.operatorService.print(res, 'switchContainer');
    //   }
    // )
  }

}
  