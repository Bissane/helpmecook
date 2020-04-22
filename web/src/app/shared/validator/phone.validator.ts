import { AbstractControl } from '@angular/forms';

export class PhoneValidators {

    static fixeFormat(c: AbstractControl): { [key: string]: boolean } | null {
        if (c.value === '') {
            return null;
        }
        const valide = /^(0)[1-58-9](\d{2}){4}$/.test(c.value);
        return valide ? null : { 'fixeFormat': true };
    }

    static faxFormat(c: AbstractControl): { [key: string]: boolean } | null {
        if (c.value === '') {
            return null;
        }
        const valide = /^(0)[1-58-9](\d{2}){4}$/.test(c.value);
        return valide ? null : { 'faxFormat': true };
    }

    static mobileFormat(c: AbstractControl): { [key: string]: boolean } | null {
        if (c.value === '') {
            return null;
        }
        const valide = /^(0)[6-7](\d{2}){4}$/.test(c.value);
        return valide ? null : { 'mobileFormat': true };
    }

  static toutFormat(c: AbstractControl): { [key: string]: boolean } | null {
    if (c.value === '') {
      return null;
    }
    const valide = /^(0)[1-9](\d{2}){4}$/.test(c.value);
    return valide ? null : {'toutFormat': true};
  }
}
