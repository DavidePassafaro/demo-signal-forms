import { Component, computed, effect, signal, WritableSignal } from '@angular/core';
import {
  applyWhen,
  disabled,
  Field,
  form,
  maxLength,
  minLength,
  pattern,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import { fullName } from '../../shared/form-validators/full-name.validator';

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
  imports: [Field],
})
export class LetterToSantaComponent {
  private readonly letter: WritableSignal<Letter> = signal({
    name: '',
    age: NaN,
    address: '',
    behavior: '',
    message: '',
    email: '',
    confirmEmail: '',
  });

  private readonly letterSchema = schema<Letter>((rootPath) => {
    required(rootPath.name, { message: 'Il nome è obbligatorio' });
    // pattern(rootPath.name, FULL_NAME_REGEX, { message: 'Inserisci nome e cognome' });
    fullName(rootPath.name, { message: 'Inserisci nome e cognome' });

    required(rootPath.age, { message: "L'età è obbligatoria" });

    required(rootPath.address, { message: 'La residenza è obbligatoria' });

    required(rootPath.behavior, { message: 'Il comportamento è obbligatorio' });
    applyWhen(
      rootPath.behavior,
      ({ valueOf }) => valueOf(rootPath.address) === 'fuori-roma',
      (behavior) => disabled(behavior),
    );

    required(rootPath.message, { message: 'Il messaggio è obbligatorio' });
    minLength(rootPath.message, 10, { message: 'Babbo Natale vuole messaggi di almeno 10 caratteri' });
    maxLength(rootPath.message, 500, { message: 'Babbo Natale non può leggere messaggi così lunghi!' });

    required(rootPath.email, { message: "L'email è obbligatoria" });
    pattern(rootPath.email, EMAIL_REGEX, { message: 'Inserisci un indirizzo email valido' });

    required(rootPath.confirmEmail, { message: "Conferma l'email" });
    pattern(rootPath.confirmEmail, EMAIL_REGEX, { message: 'Inserisci un indirizzo email valido' });
    validate(rootPath.confirmEmail, ({ value, valueOf }) => {
      const confirmEmail = value();
      const email = valueOf(rootPath.email);
      if (confirmEmail !== email) {
        return { kind: 'passwordMismatch', message: 'Le email non corrispondono' };
      }

      return null;
    });
  });

  protected readonly letterForm = form(this.letter, this.letterSchema);

  readonly logEffect = effect(() => {
    console.log('Current Letter to Santa:', this.letter());
  });

  readonly isNastyKid = computed(() => this.letterForm.address().value() === 'fuori-roma');

  readonly isNastyKidEffect = effect(() => {
    if (this.isNastyKid()) {
      this.letter.update((letter) => ({ ...letter, behavior: 'beast-of-hell' }));
    }
  });

  /**
   * Handles the form submission event.
   */
  protected onSubmit(event: Event): void {
    event.preventDefault();

    if (this.letterForm().valid()) {
      console.log(
        '%c🎅🏼 La tua lettera è stata inviata con successo a Babbo Natale! 🎄',
        'color: green; font-size: 16px;',
        this.letter(),
      );
      alert('🎅🏼 La tua lettera è stata inviata con successo a Babbo Natale! 🎄');
      this.letterForm().reset();
    } else {
      this.letterForm().markAsTouched();
    }
  }
}
