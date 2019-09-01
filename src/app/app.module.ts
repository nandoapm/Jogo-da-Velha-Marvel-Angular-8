import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { HttpConfigInterceptor } from './auth/interceptor.module';
import { BattleComponent } from './components/battle/battle.component';
import { ScoreComponent } from './components/score/score.component';
import { CharacterComponent } from './components/character/character.component';
import { GamescreenComponent } from './components/gamescreen/gamescreen.component';
import { GameComponent } from './components/game/game.component';
import { SquareComponent } from './components/game/square/square.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    BattleComponent,
    ScoreComponent,
    CharacterComponent,
    GamescreenComponent,
    GameComponent,
    SquareComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpConfigInterceptor, 
      multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
