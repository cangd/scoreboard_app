import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ScoreboardComponent} from "./scoreboard/scoreboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScoreboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'scoreboard-app';
}
