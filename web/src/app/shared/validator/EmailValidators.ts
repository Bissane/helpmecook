import { AbstractControl } from '@angular/forms';

export class EmailValidators {

    static format(c: AbstractControl): { [key: string]: boolean } | null {
        if (c.value === '') {
            return null;
        }
        /* tslint:disable:max-line-length */
        const valide = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(c.value);
        /* tslint:disable:max-line-length */

        return valide ? null : { 'format': true };
    }

}

