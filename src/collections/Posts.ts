import { isUser } from '@/access/isUser';
import { isUserOnField } from '@/access/isUserOnField';
import type { CollectionConfig } from 'payload';

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
    create: isUser,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: {
        read: isUserOnField
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ req, data }) => {
        if (req.user) {
          data!.author = req.user.id;
        }
        return data;
      },
    ],
    afterRead: [
      async ({ req, doc }) => {
        if (doc.author) {
          const user = await req.payload.findByID({
            collection: 'users',
            id: doc.author.id,
          });

          doc.author = user.name;
          return doc;
        }

        return doc
      },
    ],
  },
};
