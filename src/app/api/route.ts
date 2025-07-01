import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { headers as getHeaders } from 'next/headers';

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  });

  return Response.json({
    message: 'This is an example of a custom route.',
  });
};
