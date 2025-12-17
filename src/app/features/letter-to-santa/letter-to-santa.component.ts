import { Component } from '@angular/core';

interface Letter {
  name: string;
  age: number;
  address: string;
  behavior: string;
  message: string;
  email: string;
  confirmEmail: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FULL_NAME_REGEX = /^[a-zA-Z]+ [a-zA-Z]+( [a-zA-Z]+)*$/;

@Component({
  selector: 'app-letter-to-santa',
  templateUrl: './letter-to-santa.component.html',
  styleUrls: ['../../shared/styles/form-styles.scss'],
})
export class LetterToSantaComponent {
  /**
   * Handles the form submission event.
   */
  protected onSubmit(event: Event): void {
    event.preventDefault();
  }
}
