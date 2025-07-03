import { FieldAccess } from 'payload';

export const isUserOnField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user);
};
