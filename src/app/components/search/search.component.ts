import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Character } from 'src/app/models/character';
import { MarvelService } from 'src/app/services/marvel.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  @Output() selectedCharacter = new EventEmitter<Character>();
  @Input() placeholder: string;

  characterName = new FormControl('');
  characteres: Array<Character>;
  
  selectedName: string;
  placeholderText: string;
  loading = false;

  constructor(private apiMarvel: MarvelService) { }

  ngOnInit() {
    this.exchange();
    this.placeholderText = this.placeholder;
  }

  exchange(): void {
    this.characterName.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text) => {
      if (text !== this.selectedName && text !== '') {
        this.exgCharacter(text);
      } else if (text === '') {
        this.characteres = undefined;
        this.selectedCharacter.emit(undefined);
      }
    });
  }

  exgCharacter(characterName: string): void {
    this.loading = true;
    this.apiMarvel.getCharacter(characterName, 'name').subscribe((characteres: Array<Character>) => {
      if (!characteres || characteres.length <= 0) {
        this.apiMarvel.getCharacter(characterName, 'nameStartsWith').subscribe((characterList: Array<Character>) => {
          this.characteres = characterList;
          this.loading = false;
          this.selectedCharacter.emit(undefined);
        });
      } else {
        this.selectCharacter(characteres[0]);
        this.loading = false;
      }
    });
  }

  selectCharacter(character: Character) {
    this.characterName.setValue((this.selectedName = character.name));
    this.selectedCharacter.emit(character);
    this.characteres = undefined;
  }

  selected() {
    if (this.characterName.value && this.characterName.value !== '') {
      this.exgCharacter(this.characterName.value);
    } else {
      this.placeholder = '';
    }
  }

  selectOut() {
    this.characteres = undefined;
    if (!this.characterName.value || this.characterName.value === '') {
      this.placeholder = this.placeholderText;
    }
  }
}
