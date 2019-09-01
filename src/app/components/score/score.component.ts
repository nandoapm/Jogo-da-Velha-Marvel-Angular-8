import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  score: Array<number>;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getScore().subscribe((result) => {
      this.score = [...result];
    });
  }

}
