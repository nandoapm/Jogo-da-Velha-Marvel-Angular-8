import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/character';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit {
  
  @Input() characteres: Array<Character>;
  @Input() firstPlay: number;
  playerTurn: number;
  
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getPlayerTurn().subscribe(player => {
      this.playerTurn = player;
    });
  }

}
