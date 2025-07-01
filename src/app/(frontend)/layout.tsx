import React from 'react';
import './styles.css';
import { Navbar } from '../components/Navbar';

import { headers as getHeaders } from 'next/headers.js';
import { getPayload } from 'payload';
import config from '@/payload.config';

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  return (
    <html lang="en">
      <body>
        <Navbar user={user} />
        <main>{children}</main>
      </body>
    </html>
  );
}
