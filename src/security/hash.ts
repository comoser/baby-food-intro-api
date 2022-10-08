import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, saltOrRounds);
}

export async function passwordMatches(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
