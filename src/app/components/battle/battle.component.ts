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

  heroes: Array<Character>;
  startGame = false;
  firstToPlay: number;
  winner: number;
  loadGame = false;

  constructor(private gameService: GameService, private alertService: AlertService) { }


  // inicialização da batalha apos o star do componente home
  ngOnInit() {
    this.firstToPlay = this.gameService.getFirstToPlay();
    this.gameService.getTicTacToeResult().subscribe((result) => {
      if (result.winner) {
        this.alertService.winner(this.heroes[result.winner - 1], result.winner).subscribe(() => {
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
    this.gameService.initializeGame();
    this.firstToPlay = this.gameService.getFirstToPlay();
  }
  // recarrega uma nova batalha
  onLoadGame() {
    this.loadGame = true;
  }

  // seleção do personagem
  selectedHeroes(heroes: Array<Character>) {
    this.heroes = [...heroes];
    this.startGame = true;
  }

}
