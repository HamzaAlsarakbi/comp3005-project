import { IMember } from '@src/models/Member';
import 'supertest';


declare module 'supertest' {

  export interface Response  {
    headers: Record<string, string[]>;
    body: {
      error: string;
      users: IMember[];
    };
  }
}