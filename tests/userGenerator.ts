import { User } from "../src/App";

export const generateRandomtring = (length: number) => Math.random().toString(36).substring(2, length); 

export function getNewUser() {
  const newUser: User = {
    email: generateRandomtring(10) + '@mail.com',
    password: generateRandomtring(11),
    firstName: generateRandomtring(9),
    lastName: generateRandomtring(12)
  }
  return newUser;
}