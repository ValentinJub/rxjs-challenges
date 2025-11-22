import { Injectable } from "@angular/core";
import { interval, Observable } from "rxjs";
import { endWith, map, take, tap } from "rxjs/operators";

@Injectable()
export class LoadingService {
  load(): Observable<string | number> {
    return interval(50).pipe(
      take(100),
      tap(t => console.log('Tick:', t)),
      map(tick => (tick + 1) * 1),
      endWith("Congratulations, you made it!")
    );
  }
}
