import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guess-game.component.html',
  styleUrls: ['./guess-game.component.css']
})

export class GuessGameComponent {
  userGuess: number | null = null;
  computerNumber: number = this.generateRandomNumber();
  attemptCount: number = 0;
  message: string = '';

  generateRandomNumber(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  submitGuess() {
    if (this.userGuess === null) return;

    this.attemptCount++;

    if (this.userGuess === this.computerNumber) {
      this.message = ' You Win!';
      this.resetGame();
    } else {
      if (this.attemptCount < 5) {
        this.message = ` Try Again! (${this.attemptCount}/5 attempts used)`;
      } else if (this.attemptCount === 5) {
        this.message = 'Last Attempt! Try Carefully!';
      } else {
        this.message = 'Game Over! Restarting...';
        this.resetGame();
      }
    }

    this.userGuess = null;
  }

  resetGame() {
    this.computerNumber = this.generateRandomNumber();
    this.attemptCount = 0;
  }
}
