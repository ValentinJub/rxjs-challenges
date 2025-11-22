import { Injectable } from "@angular/core";
import { interval, Observable } from "rxjs";
import { endWith, map, take, tap } from "rxjs/operators";

@Injectable()
export class LoadingService {
  load(): Observable<string | number> {
    return interval(1000).pipe(
      take(5),
      tap(t => console.log('Tick:', t)),
      map(tick => (tick + 1) * 20),
      endWith("Congratulations, you made it!")
    );
  }
}
