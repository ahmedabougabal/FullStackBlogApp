import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../services/api/posts';
import { Post } from '../../types';
import PostCard from '../PostCard/PostCard';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#4a5568',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
  },
  createButton: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3182ce',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    marginBottom: '2rem',
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
  emptyState: {
    textAlign: 'center' as const,
    padding: '4rem 2rem',
    color: '#4a5568',
  },
  emptyStateTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2d3748',
  },
  emptyStateText: {
    fontSize: '1.125rem',
    marginBottom: '2rem',
    color: '#4a5568',
  },
};

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
        <button onClick={() => window.location.reload()} style={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to our Space Blog</h1>
        <p style={styles.subtitle}>
          Discover amazing stories, insights from different communities
        </p>
      </header>

      <Link to="/create" style={styles.createButton}>
        Write a Post →
      </Link>

      {posts.length === 0 ? (
        <div style={styles.emptyState}>
          <h2 style={styles.emptyStateTitle}>No Posts Yet</h2>
          <p style={styles.emptyStateText}>
            Be the first one to share your thoughts with our community!
          </p>
          <Link to="/create" style={styles.createButton}>
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div style={styles.grid}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(PostList);
