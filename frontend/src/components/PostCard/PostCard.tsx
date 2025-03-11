import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

const styles = {
  card: {
    border: '1px solid #eaeaea',
    borderRadius: '12px',
    padding: '1.5rem',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: '0.75rem',
    lineHeight: 1.4,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
    color: '#718096',
    fontSize: '0.875rem',
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  authorAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#4a5568',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  content: {
    color: '#4a5568',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  readMore: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#3182ce',
    color: 'white',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#2c5282',
    },
  },
  tag: {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    backgroundColor: '#ebf8ff',
    color: '#2b6cb0',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    marginRight: '0.5rem',
  },
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const authorInitial = post.author ? post.author[0].toUpperCase() : '?';
  const tags = ['Blog', 'Featured']; // You can make this dynamic later

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{post.title}</h3>
      <div style={styles.meta}>
        <div style={styles.author}>
          <div style={styles.authorAvatar}>{authorInitial}</div>
          <span>{post.author}</span>
        </div>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}</span>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        {tags.map((tag) => (
          <span key={tag} style={styles.tag}>{tag}</span>
        ))}
      </div>
      <p style={styles.content}>
        {post.content.length > 150 
          ? `${post.content.substring(0, 150)}...` 
          : post.content}
      </p>
      <Link to={`/posts/${post.id}`} style={styles.readMore}>
        Read More →
      </Link>
    </div>
  );
};

export default memo(PostCard);
