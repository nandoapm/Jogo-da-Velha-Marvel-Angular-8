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
      html: 'Seu jogo comecará em <strong></strong> segundos.',
      imageUrl: 'https://media.giphy.com/media/fA6opG8tgo2KQ/giphy.gif',
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
      text: hero.name + ' ganhou!',
      imageUrl: hero.image,
      imageWidth: 400,
      imageHeight: 300,
      imageAlt: hero.name,
      animation: false,
      customClass: 'object-cover',
      confirmButtonText: 'Jogar Novamente',
      allowOutsideClick: false
    }));
  }

  error() {
    Swal.fire({
      type: 'error',
      title: 'Alerta',
      text: 'Necessário selecionar os personagens!'
    });
  }

  gameDraw(): Observable<SweetAlertResult> {
    return from(Swal.fire({
      title: 'Resultado',
      text: 'Oops... Empatou!!!',
      animation: false,
      confirmButtonText: 'Jogar Novamente',
      allowOutsideClick: false
    }));
  }

}
