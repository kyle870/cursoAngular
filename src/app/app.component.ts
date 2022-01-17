import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cursoAngular';

  getName(): void{
    console.log('Hola Dominicode');
  }
}
