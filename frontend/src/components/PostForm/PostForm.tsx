import React, { useState, useCallback, memo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../../services/api/posts';
import { CreatePostDto } from '../../types';

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
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#4a5568',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 600,
    color: '#2d3748',
    fontSize: '1rem',
  },
  input: (hasError: boolean) => ({
    width: '100%',
    padding: '0.75rem 1rem',
    border: `2px solid ${hasError ? '#fc8181' : '#e2e8f0'}`,
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
    transition: 'all 0.2s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#4299e1',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
    },
  }),
  textarea: (hasError: boolean) => ({
    ...styles.input(hasError),
    minHeight: '200px',
    resize: 'vertical' as const,
    lineHeight: 1.6,
  }),
  error: {
    color: '#e53e3e',
    marginTop: '0.5rem',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  submitButton: (disabled: boolean) => ({
    width: '100%',
    padding: '1rem',
    backgroundColor: disabled ? '#90cdf4' : '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '1rem',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    marginTop: '1rem',
    '&:hover': {
      backgroundColor: disabled ? '#90cdf4' : '#2c5282',
      transform: disabled ? 'none' : 'translateY(-2px)',
    },
  }),
  navigation: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    color: '#4a5568',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    '&:hover': {
      color: '#2d3748',
      transform: 'translateX(-4px)',
    },
  },
  formError: {
    backgroundColor: '#fff5f5',
    color: '#c53030',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};

const initialFormData: CreatePostDto = {
  title: '',
  author: '',
  content: ''
};

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreatePostDto>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    } else if (formData.author.length < 2) {
      newErrors.author = 'Author name must be at least 2 characters long';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      await createPost(formData);
      navigate('/');
    } catch (err) {
      setErrors({ submit: 'Failed to create post. Please try again.' });
      setSubmitting(false);
    }
  }, [formData, validateForm, navigate]);

  const renderField = useCallback((
    name: keyof CreatePostDto,
    label: string,
    type: 'input' | 'textarea' = 'input'
  ) => {
    const Component = type === 'textarea' ? 'textarea' : 'input';
    const props = type === 'textarea' 
      ? { rows: 8, style: styles.textarea(!!errors[name]) }
      : { type: 'text', style: styles.input(!!errors[name]) };
    
    return (
      <div style={styles.formGroup}>
        <label htmlFor={name} style={styles.label}>
          {label}
        </label>
        <Component
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          {...props}
        />
        {errors[name] && (
          <p style={styles.error}>
            <span>⚠️</span>
            {errors[name]}
          </p>
        )}
      </div>
    );
  }, [formData, errors, handleChange]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Create New Post</h1>
        <p style={styles.subtitle}>
          Share your thoughts, ideas, and stories with our community
        </p>
      </header>

      <form onSubmit={handleSubmit} style={styles.form}>
        {errors.submit && (
          <div style={styles.formError}>
            <span>⚠️</span>
            {errors.submit}
          </div>
        )}
        
        {renderField('title', 'Title')}
        {renderField('author', 'Author')}
        {renderField('content', 'Content', 'textarea')}
        
        <button 
          type="submit" 
          disabled={submitting}
          style={styles.submitButton(submitting)}
        >
          {submitting ? 'Creating your post...' : 'Publish Post'}
        </button>
      </form>

      <div style={styles.navigation}>
        <Link to="/" style={styles.backLink}>
          ← Back to Posts
        </Link>
      </div>
    </div>
  );
};

export default memo(PostForm);
