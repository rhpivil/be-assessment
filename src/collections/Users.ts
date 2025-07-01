import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  // TODO: LOOK AT REFRESH TOKEN
  auth: {
    maxLoginAttempts: 5,
    lockTime: 120 * 1000,
  },
  access: {
    create: () => true,
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
