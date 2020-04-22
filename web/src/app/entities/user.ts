import {Group} from './group';


export interface User {
  id?: string;
  given_name?: string;
  firstName?: string;
  family_name?: string;
  lastName?: string;
  username?: string;
  preferred_username?: string;
  name?: string;
  email?: string;
  enabled?: boolean;
  attributes?: any;
  service?: string;
  groups?: Group[];
  realgroups?: Group[];
  role?: string;
  sub?: string;
}
