import { Access } from 'payload';

export const isUserSelfAndAdmin: Access = ({ req: { user } }) => {
  if (user && user.role == 'admin') {
    return true;
  }

  if (user) {
    return {
      id: {
        equals: user?.id,
      },
    };
  }

  return false;
};
