import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private game: Map<string, string>;
  private gameSubject: Subject<Map<string, string>>;
  private turn: string;
  private playerTurnSubject: BehaviorSubject<number>;
  private firstToPlay: number;
  private gameResult: Subject<any>;
  private score: Array<number>;
  private scoreSubject: BehaviorSubject<Array<number>>;

  constructor() {
    this.score = new Array<number>(0, 0);
    this.gameResult = new Subject<any>();
    this.gameSubject = new BehaviorSubject<Map<string, string>>(this.game);
    this.scoreSubject = new BehaviorSubject<Array<number>>(this.score);
    this.startGame();
  }

  // inicialização do jogo
  startGame() {
    this.initializeGame();
    this.firstToPlay = this.whoIsPlay();
    this.turn = 'X';

    if (!this.playerTurnSubject) {
      this.playerTurnSubject = new BehaviorSubject<number>(this.firstToPlay);
    } else {
      this.playerTurnSubject.next(this.firstToPlay);
    }
  }

  initializeGame() {
    this.game = new Map<string, string>();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.game.set((i.toString().concat(j.toString())), '');
      }
    }
    this.gameSubject.next(this.game);
  }

  whoIsPlay() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    return randomNumber % 2 === 0 ? 1 : 2;
  }

  // obtendo propriedades do jogo
  getGame() {
    return this.gameSubject.asObservable();
  }

  getGameResult() {
    return this.gameResult.asObservable();
  }

  getPlayerTurn() {
    return this.playerTurnSubject.asObservable();
  }

  getFirstPlay() {
    return this.firstToPlay;
  }

  getScore() {
    return this.scoreSubject.asObservable();
  }

  // verificando resultados do jogo
  private combination() {
    return [
      ['00', '01', '02'],
      ['10', '11', '12'],
      ['20', '21', '22'],
      ['00', '10', '20'],
      ['01', '11', '21'],
      ['02', '12', '22'],
      ['00', '11', '22'],
      ['20', '11', '02']
    ];
  }

  winner(player: string, game: Map<string, string>) {
    for (const pattern of this.combination()) {
      if (game.get(pattern[0]) === player && game.get(pattern[1]) === player && game.get(pattern[2]) === player) {
        return true;
      }
    }
  }

  isDraw(game: Map<string, string>) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (game.get(i.toString().concat(j.toString())) === '') {
          return false;
        }
      }
    }
    return true;
  }

  currentPlayer() {
    const secondToPlay = this.firstToPlay === 1 ? 2 : 1;
    return this.turn === 'X' ? this.firstToPlay : secondToPlay;
  }

  checkGame() {
    if (this.winner(this.turn, this.game)) {
      const winnerPlayer = this.currentPlayer();
      this.score[winnerPlayer - 1] = this.score[winnerPlayer - 1] + 1;
      this.gameResult.next({winner: winnerPlayer});
      this.scoreSubject.next(this.score);
    } else if (this.isDraw(this.game)) {
      this.gameResult.next({gameOver: true});
    } else {
      this.turn = this.turn === 'X' ? 'O' : 'X';
    }
  }

  valueGame(key: string) {

    if (this.game.get(key) === '') {
      this.game.set(key, this.turn);
      this.gameSubject.next(this.game);
      this.checkGame();
      this.playerTurnSubject.next(this.currentPlayer());
    }
  }
}
