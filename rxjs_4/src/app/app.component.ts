import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingService } from "./loading.service";
import { Subject, share, filter, switchMap, map, distinctUntilChanged } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
  standalone: true,
  imports: [CommonModule],
  providers: [LoadingService]
})
export class AppComponent {
  private readonly loadingService = inject(LoadingService);

  /*
    * This is our trigger to start loading
  */
  protected readonly load$ = new Subject<void>();

  /*
    * This is our data stream
  */
  protected readonly stream$ = this.load$.pipe(
    switchMap(() => this.loadingService.load()),
    share()
  ); 

  /*
    * This is our progression from 0 to 100
  */
  protected readonly progression$ = this.stream$.pipe(
    filter(Number.isFinite)
  )

  /*
    * This is our final message once the loading has finished
  */
  protected readonly finalMsg$ = this.stream$.pipe(
    map(response => (typeof response === "string" ? response : null)),
    distinctUntilChanged()
  )

  protected onButtonClick(): void {
    this.load$.next();
  };
}
