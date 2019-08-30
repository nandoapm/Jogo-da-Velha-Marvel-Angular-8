import { Character } from './../models/character';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private ApiUrl = 'https://gateway.marvel.com/v1/public/';
  private publicKey = 'd471b9d853c2fad145cd5dab65761c29';
  private privateKey = '696876de1bc1cc70563bfe7f6bdbdf7b50530370';

  constructor(private httpClient: HttpClient) { }
  getTimeStamp(): string {
    return (Date.now() / 1000 | 0).toString();
  }

  getPublicKey(): string {
    return this.publicKey;
  }

  getHash(timeStamp: string): string {
    const hashGenerator: Md5 = new Md5();
    hashGenerator.appendStr(timeStamp);
    hashGenerator.appendStr(this.privateKey);
    hashGenerator.appendStr(this.publicKey);
    const hash: string = hashGenerator.end().toString();
    return hash;
  }

  characterByName(name: string, by: string) {
    const url =  this.ApiUrl + 'characters?' + by + '=' + name;
    return this.httpClient.get(url).pipe(
      map((response: any) => {
        const characters = new Array<Character>();
        response.data.results.forEach((element: { name: string; thumbnail: { path: string; extension: string; }; }) => {
          const character: Character = { name: element.name, image: element.thumbnail.path + '.' + element.thumbnail.extension };
          characters.push(character);
        });
        return characters;
        
      })
    );
  }
}
