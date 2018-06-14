import { Gender } from '../enums/gender';


export interface Account {
  id           : string;
  firstName    : string;
  lastName     : string;
  emailAddress : string;
  age          : number;
  gender       : Gender;
  birthday     : Date;
}