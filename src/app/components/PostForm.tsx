'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState, ChangeEvent } from 'react';

export const PostForm = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const toggleFormHandler = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const responseJson = await response.json();
      alert(responseJson.message);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTitle('');
      setContent('');
    }
  };

  return (
    <>
      <div className="create-btn-container">
        <button onClick={toggleFormHandler} className="create-btn">
          {showForm ? 'Cancel' : 'Create a new post'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="new-post-form">
          <div className="new-post-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              required
            />
          </div>
          <div className="new-post-field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
              required
            />
          </div>
          <div>
            <button className="create-btn">Submit</button>
          </div>
        </form>
      )}

      {loading && <p>Loading...</p>}
    </>
  );
};
