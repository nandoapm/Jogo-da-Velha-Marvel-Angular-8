import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { AlertService } from 'src/app/services/alert.service';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  characteres: Array<Character>;
  startGame = false;
  firstPlay: number;
  winner: number;
  loadGame = false;

  constructor(private gameService: GameService, private alertService: AlertService) { }
  
  ngOnInit() {
    this.firstPlay = this.gameService.getFirstPlay();
    this.gameService.getGameResult().subscribe((result) => {
      if (result.winner) {
        this.alertService.winner(this.characteres[result.winner - 1], result.winner).subscribe(() => {
          this.startNewGame();
        });
      } else if (result.gameOver) {
        this.alertService.gameDraw().subscribe(() => {
          this.startNewGame();
        });
      }
    });
  }
  // inicia uma nova batalha
  startNewGame() {
    this.gameService.startGame();
    this.firstPlay = this.gameService.getFirstPlay();
  }
  // recarrega uma nova batalha
  onLoadGame() {
    this.loadGame = true;
  }

  // personagem selecionados
  selectedCharacter(heroes: Array<Character>) {
    this.characteres = [...heroes];
    this.startGame = true;
  }

}
