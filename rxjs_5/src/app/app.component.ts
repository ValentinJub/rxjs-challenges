import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subject } from "rxjs/internal/Subject";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { take } from "rxjs/internal/operators/take";
import { interval } from "rxjs/internal/observable/interval";
import { map } from "rxjs/internal/operators/map";
import { endWith } from "rxjs/internal/operators/endWith";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent {
  protected trigger$ = new Subject<void>();

  protected count$ = this.trigger$.pipe(
    switchMap(() => {
      return interval(1000).pipe(
        take(6),
        map(v => 5 - v ),
        endWith("Time's up!")
      );
    })
  ); 
}
