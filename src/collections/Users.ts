import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 120 * 1000,
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      if (user) {
        return {
          id: {
            equals: user.id,
          },
        };
      }
      return false;
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
      required: false,
    },
  ],
};
