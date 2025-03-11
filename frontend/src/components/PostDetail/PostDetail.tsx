import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../../services/api/posts';
import { Post } from '../../types';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    color: '#4a5568',
    fontSize: '0.95rem',
    marginBottom: '2rem',
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  authorAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#4a5568',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.25rem',
  },
  authorName: {
    fontWeight: 600,
    color: '#2d3748',
  },
  date: {
    color: '#718096',
  },
  content: {
    color: '#2d3748',
    fontSize: '1.125rem',
    lineHeight: 1.8,
    marginBottom: '3rem',
    whiteSpace: 'pre-line' as const,
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e2e8f0',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3182ce',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#2c5282',
      transform: 'translateY(-2px)',
    },
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    fontSize: '1.25rem',
    color: '#4a5568',
  },
  error: {
    textAlign: 'center' as const,
    padding: '2rem',
    backgroundColor: '#fff5f5',
    color: '#c53030',
    borderRadius: '8px',
    margin: '2rem auto',
    maxWidth: '600px',
  },
  errorTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1rem',
  },
  retryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#c53030',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#9b2c2c',
    },
  },
};

const PostDetail: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    if (!id) return;
    
    try {
      const data = await getPostById(parseInt(id));
      setPost(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch post. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) {
    return (
      <div style={styles.loader}>
        <div>Loading amazing content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        <h3 style={styles.errorTitle}>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={fetchPost} style={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={styles.error}>
        <h3 style={styles.errorTitle}>Post Not Found</h3>
        <p>The post you're looking for doesn't exist or has been removed.</p>
        <Link to="/" style={styles.button}>
          Back to Home
        </Link>
      </div>
    );
  }

  const authorInitial = post.author ? post.author[0].toUpperCase() : '?';
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>{post.title}</h1>
        <div style={styles.meta}>
          <div style={styles.author}>
            <div style={styles.authorAvatar}>{authorInitial}</div>
            <div style={styles.authorInfo}>
              <span style={styles.authorName}>{post.author}</span>
              <span style={styles.date}>{formattedDate}</span>
            </div>
          </div>
        </div>
      </header>

      <div style={styles.content}>
        {post.content}
      </div>

      <div style={styles.navigation}>
        <Link to="/" style={styles.button}>
          ← Back to Posts
        </Link>
        <Link to="/create" style={styles.button}>
          Write a Post →
        </Link>
      </div>
    </div>
  );
};

export default React.memo(PostDetail);
