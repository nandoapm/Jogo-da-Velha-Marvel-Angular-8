import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  game: Map<string, string>;
  playerTurn: number;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGame().subscribe((board: Map<string, string>) => {
      this.game = board;
    });
    this.gameService.getPlayerTurn().subscribe((player) => {
      this.playerTurn = player;
    });
  }

  selectSquare(position: string) {
    this.gameService.valueGame(position);
  }

}
