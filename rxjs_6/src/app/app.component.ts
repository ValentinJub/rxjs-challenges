import { Component, computed, signal } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { BehaviorSubject, from, map, of, ReplaySubject, share, shareReplay, skip, Subject, switchMap, tap } from "rxjs";

@Component({
  selector: "my-app",
  imports: [AsyncPipe],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  protected showSeats = signal(true);
  protected pickedSeat = new Set<number>();

  protected book$ = new Subject<number>();
  protected bookedSeats$ = this.book$.pipe(
    tap((seat) => {
      this.pickedSeat.has(seat) 
        ? this.pickedSeat.delete(seat) 
        : this.pickedSeat.add(seat);
    }),
    map(() => Array.from(this.pickedSeat)),
    shareReplay(1)
  );

  protected buy$ = new ReplaySubject<void>(1);
  protected price$ = this.buy$.pipe(
    switchMap(() => this.bookedSeats$),
    map(seats => {
      return seats.length * 8
    })
  );

  protected buy(): void {
    this.buy$.next();
    this.showSeats.update(v => !v)
  }

  protected reset(): void {
    this.pickedSeat = new Set<number>();
    this.showSeats.set(true)
  }
}
