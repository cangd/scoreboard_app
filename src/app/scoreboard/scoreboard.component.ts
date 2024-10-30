import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent {
  team1 = {
    name: 'Team 1',
    score: 0,
    color: 'green'
  };

  team2 = {
    name: 'Team 2',
    score: 0,
    color: 'orange'
  };

  isSwitched: boolean = false; // Track if sides are switched
  isShowOptions: boolean = false; // Show more options
  showTeam1Input: boolean = false; // Control visibility of Team 1 input
  showTeam2Input: boolean = false; // Control visibility of Team 2 input
  team1InputValue: string = ''; // Store input value for Team 1
  team2InputValue: string = ''; // Store input value for Team 2

  incrementScore(team: number): void {
    if (team === 1) {
      this.team1.score++;
    } else {
      this.team2.score++;
    }
    this.saveScores();
  }

  decrementScore(team: number): void {
    if (team === 1 && this.team1.score > 0) {
      this.team1.score--;
    } else if (team === 2 && this.team2.score > 0) {
      this.team2.score--;
    }
    this.saveScores();
  }

  saveScore(): void {
    const numericScore1 = Number(this.team1InputValue); // Convert input string to number
    const numericScore2 = Number(this.team2InputValue);

    this.team1.score = numericScore1; // Update Team 1 score
    this.team2.score = numericScore2; // Update Team 2 score

    this.saveScores(); // Save both scores
    this.hideInputs(); // Hide inputs after setting score
  }

  switchSides(): void {
    this.isSwitched = !this.isSwitched;
  }

  showOptions(): void {
    this.isShowOptions = !this.isShowOptions;

    if(!this.isShowOptions) {
      this.hideInputs()
    }
  }

  saveScores(): void {
    localStorage.setItem('team1Score', JSON.stringify(this.team1.score));
    localStorage.setItem('team2Score', JSON.stringify(this.team2.score));
  }

  ngOnInit(): void {
    const savedTeam1Score = localStorage.getItem('team1Score');
    const savedTeam2Score = localStorage.getItem('team2Score');

    if (savedTeam1Score) {
      this.team1.score = JSON.parse(savedTeam1Score);
    }
    if (savedTeam2Score) {
      this.team2.score = JSON.parse(savedTeam2Score);
    }
  }

  showScoreInput(team: number): void {
    if (team === 1) {
      this.showTeam1ScoreInput()
    } else if (team === 2) {
      this.showTeam2ScoreInput()
    }
  }

  // Methods to show/hide input fields and set input values
  showTeam1ScoreInput(): void {
    this.team1InputValue = this.team1.score.toString(); // Set input to current score
    this.team2InputValue = this.team2.score.toString(); // Set input to current score
    this.showTeam1Input = true;
    this.showTeam2Input = true;
  }

  showTeam2ScoreInput(): void {
    this.team1InputValue = this.team1.score.toString(); // Set input to current score
    this.team2InputValue = this.team2.score.toString(); // Set input to current score
    this.showTeam1Input = true;
    this.showTeam2Input = true;
  }

  hideInputs(): void {
    this.showTeam1Input = false;
    this.showTeam2Input = false;
  }
}
