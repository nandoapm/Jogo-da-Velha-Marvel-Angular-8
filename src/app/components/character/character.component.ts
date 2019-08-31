import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  @Input() hero: Character;
  @Input() myTurn: boolean;
  @Input() firstToPlay: boolean;
  @Input() player: number;
 
  bgImage = 'assets/img/bg-img.png';

  constructor() { }

  ngOnInit() {
  }

}
