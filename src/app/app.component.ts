import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // title = 'Password_generator';
  password = '';
  length = 0;
  includeLowercase = false;
  includeUppercase = false;
  includeSymbols = false;
  includeDigits = false;
  passwordCopied=false;

  toggleLower() {
    this.includeLowercase = !this.includeLowercase;
  }
  toggleUpper() {
    this.includeUppercase = !this.includeUppercase;
  }
  toggleDigits() {
    this.includeDigits = !this.includeDigits;
  }
  toggleSymbols() {
    this.includeSymbols = !this.includeSymbols;
  }
  changeLength(value: string) {
    const integerLength = parseInt(value);
    if (!isNaN(integerLength)) {
      this.length = integerLength;
    }
  }
  generatePassword() {
    this.passwordCopied=false;
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
    let generatedPassword = '';
    let characterset = '';
    if (this.includeLowercase) characterset += lower;
    if (this.includeUppercase) characterset += upper;
    if (this.includeDigits) characterset += digits;
    if (this.includeSymbols) characterset += symbols;
    for (let i = 0; i < this.length; i++) {
      const ind = Math.floor(Math.random() * characterset.length);
      generatedPassword += characterset[ind];
    }
    this.password = generatedPassword;
  }

  copyPassword() {
    navigator.clipboard.writeText(this.password).then(() => {
      console.log('Password copied to clipboard');
      this.passwordCopied=true;
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  }
  
}
