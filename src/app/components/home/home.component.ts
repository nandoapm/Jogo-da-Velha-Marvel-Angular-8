import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Character } from 'src/app/models/character';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // gerando erro ao fazer a ligacao para outra tela
  @Output() selectedHeroes = new EventEmitter<Array<Character>>();
  @Output() loadGame = new EventEmitter<boolean>();

  player1: Character;
  player2: Character;
  bgImage = 'assets/img/bg-img.png';
  iconImage = 'assets/img/vs.png';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  getCharacter(character: Character, player: number) {
    if (player === 1) {
      this.player1 = character ? {...character} : undefined;
    } else {
      this.player2 = character ? {...character} : undefined;
    }
  }

  startGame() {
    if (!this.player1 || !this.player2) {
      this.alertService.error();
    } else {
      this.loadGame.emit(true);
      this.alertService.success(() => {
        this.selectedHeroes.emit([this.player1, this.player2]);
      });
    }
  }

}
