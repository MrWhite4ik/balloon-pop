import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BalloonComponent } from './components/balloon/balloon.component';
import { IBalloon } from './balloon.interface';
import { Balloon } from './balloon.class';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BalloonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  balloonsOnScreen = 3;
  balloons: IBalloon[] = new Array(this.balloonsOnScreen)
    .fill(0)
    .map(() => new Balloon());
    score = 0;
    missed = 0
}
