import { headers as getHeaders } from 'next/headers.js';
import { getPayload } from 'payload';
import React from 'react';
import { fileURLToPath } from 'url';

import config from '@/payload.config';
import './styles.css';

import { PostForm } from '../components/PostForm';

export default async function HomePage() {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

  const posts = await payload.find({
    collection: 'posts',
    user,
    overrideAccess: false,
  });

  return (
    <div className="home">
      {/* <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a     <p>{post.author.name}</p>
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div> */}

      <div className="content">
        <h1>Hi {user ? user.name : 'Guest'}!</h1>

        {user && <PostForm />}

        <h2 className="center-header">Blog Post List</h2>
        {posts.docs.map((post: any) => (
          <div key={post.id} className="post-card">
            <p>Title: {post.title}</p>
            <p>Author: {post.author ?? '*'}</p>
            <p>Content: {post.content}</p>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  );
}
