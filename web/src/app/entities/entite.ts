import {Structure} from './structure';
import {Direction} from './direction';

export interface Entite {
  id?: number;
  structure?: Structure;
  direction?: Direction;
}
