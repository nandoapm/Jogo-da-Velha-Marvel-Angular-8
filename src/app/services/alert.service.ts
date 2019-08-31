import Swal, { SweetAlertResult } from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(callback) {
    let timerInterval;
    Swal.fire({
      title: 'Tudo pronto!',
      html: 'Seu jogo comecará em <strong></strong> segundos.',
      timer: 5000,
      onBeforeOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong')
            .textContent = (Swal.getTimerLeft() / 1000 | 0).toString();
        }, 100);
      },
      onClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (
        result.dismiss === Swal.DismissReason.timer
      ) {
        callback();
      }
    });
  }

  winner(hero: Character, playerNumber: number): Observable<SweetAlertResult> {
    return from (Swal.fire({
      title: 'Resultado',
      text: 'Jogador número: ' + playerNumber + ' - ' + hero.name + ' ganhou!',
      imageUrl: hero.image,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: hero.name,
      animation: false,
      customClass: 'object-cover',
      confirmButtonText: 'Revanche',
      allowOutsideClick: false
    }));
  }

  error() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Atenção! Parece que há algo de errado com o herói selecionado.'
    });
  }

  gameDraw(): Observable<SweetAlertResult> {
    return from(Swal.fire({
      title: 'Resultado',
      text: 'Acredite se quiser, deu velha!',
      imageUrl: 'https://media.giphy.com/media/fNBFa6NCMeZJm/giphy.gif',
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: 'facepalm',
      animation: false,
      confirmButtonText: 'Jogar Novamente',
      allowOutsideClick: false
    }));
  }

}
