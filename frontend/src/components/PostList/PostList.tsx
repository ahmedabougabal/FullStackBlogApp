import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../services/api/posts';
import { Post } from '../../types';
import PostCard from '../PostCard/PostCard';

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  header: {
    marginBottom: '3rem',
    textAlign: 'center' as const,
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
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
    fontWeight: 600,
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 6px rgba(49, 130, 206, 0.25)',
    '&:hover': {
      backgroundColor: '#2c5282',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(49, 130, 206, 0.3)',
    },
  },
  buttonContainer: {
    textAlign: 'center' as const,
    marginTop: '2rem',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
    fontSize: '1.25rem',
    color: '#4a5568',
  },
  error: {
    textAlign: 'center' as const,
    padding: '2rem',
    backgroundColor: '#fff5f5',
    color: '#c53030',
    borderRadius: '8px',
    margin: '2rem 0',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '4rem 2rem',
    backgroundColor: '#f7fafc',
    borderRadius: '12px',
    marginBottom: '2rem',
  },
  emptyStateTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: '1rem',
  },
  emptyStateText: {
    color: '#4a5568',
    marginBottom: '2rem',
  },
};

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <div style={styles.loader}>
        <div>Loading amazing posts for you...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button 
          onClick={fetchPosts}
          style={{
            ...styles.createButton,
            marginTop: '1rem',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to My Blog</h1>
        <p style={styles.subtitle}>
          This is my simple blog I created from scratch, feel free to add as many articles
          as you like :D 
        </p>
      </header>

      {posts.length === 0 ? (
        <div style={styles.emptyState}>
          <h2 style={styles.emptyStateTitle}>No Posts Yet</h2>
          <p style={styles.emptyStateText}>
            Be the first to share your thoughts and ideas with our community!
          </p>
          <Link to="/create" style={styles.createButton}>
            Create Your First Post
          </Link>
        </div>
      ) : (
        <>
          <div style={styles.grid}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div style={styles.buttonContainer}>
            <Link to="/create" style={styles.createButton}>
              Share Your Story →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(PostList);
