import { isUserSelfAndAdmin } from '@/access/isUserSelfAndAdmin';
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
    read: isUserSelfAndAdmin
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'admin', value: 'admin' },
        { label: 'user', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
    },
  ],
};
