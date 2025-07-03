import { Access } from 'payload';

export const isUser: Access= ({ req: { user } }) => {
  return Boolean(user);
};
