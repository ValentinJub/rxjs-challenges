import { Component, computed, Inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingService } from "./loading.service";
import { delayWhen, first, interval } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
  standalone: true,
  imports: [CommonModule],
  providers: [LoadingService]
})
export class AppComponent {
  protected percentLoaded = signal(0);
  protected finalMessage = signal("");
  protected disableLoadButton = computed(() =>
    this.percentLoaded() > 0 && this.percentLoaded() < 100
  );
  constructor(
    @Inject(LoadingService) private readonly loadingService: LoadingService
  ) {}

  onButtonClick() {
    this.finalMessage.set("");
    this.percentLoaded.set(0);

    this.loadingService.load().pipe(
      delayWhen((val) => interval(typeof val === 'number' ? 500 : 1000))
    )
    .subscribe(value => {
      if (typeof value === 'number') {
        this.percentLoaded.set(value);
      } else if (typeof value === 'string') {
        this.finalMessage.set(value);
      }
    });
  }
}
