import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, updatePost, getPostById } from '../../services/api/posts';
import { CreatePostDto, UpdatePostDto } from '../../types';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1a202c',
    marginBottom: '2rem',
    textAlign: 'center' as const,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#2d3748',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    transition: 'border-color 0.2s ease',
    '&:focus': {
      outline: 'none',
      borderColor: '#3182ce',
    },
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    minHeight: '200px',
    resize: 'vertical' as const,
    transition: 'border-color 0.2s ease',
    '&:focus': {
      outline: 'none',
      borderColor: '#3182ce',
    },
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  button: {
    flex: 1,
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: 600,
    color: 'white',
    backgroundColor: '#3182ce',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#2c5282',
      transform: 'translateY(-2px)',
    },
    '&:disabled': {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
  cancelButton: {
    backgroundColor: '#718096',
    '&:hover': {
      backgroundColor: '#4a5568',
    },
  },
  error: {
    color: '#e53e3e',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
  },
  validationError: {
    color: '#e53e3e',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    fontSize: '1.25rem',
    color: '#4a5568',
  },
};

interface FormErrors {
  title?: string;
  content?: string;
  author?: string;
}

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<CreatePostDto>({
    title: '',
    content: '',
    author: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const post = await getPostById(parseInt(id));
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
        });
      } catch (err) {
        setSubmitError('Failed to fetch post for editing');
      } finally {
        setLoading(false);
      }
    };

    if (isEditing) {
      fetchPost();
    }
  }, [id, isEditing]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters long';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && id) {
        const updateData: UpdatePostDto = {
          title: formData.title,
          content: formData.content,
          author: formData.author,
        };
        await updatePost(parseInt(id), updateData);
      } else {
        await createPost(formData);
      }
      navigate('/');
    } catch (err) {
      setSubmitError(
        `Failed to ${isEditing ? 'update' : 'create'} post. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (loading) {
    return (
      <div style={styles.loader}>
        <div>Loading post data...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {isEditing ? 'Edit Post' : 'Create New Post'}
      </h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter post title"
          />
          {errors.title && (
            <span style={styles.validationError}>{errors.title}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="author" style={styles.label}>
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter author name"
          />
          {errors.author && (
            <span style={styles.validationError}>{errors.author}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="content" style={styles.label}>
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="Write your post content here..."
          />
          {errors.content && (
            <span style={styles.validationError}>{errors.content}</span>
          )}
        </div>

        {submitError && <div style={styles.error}>{submitError}</div>}

        <div style={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ ...styles.button, ...styles.cancelButton }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={styles.button}
          >
            {isSubmitting
              ? 'Saving...'
              : isEditing
              ? 'Update Post'
              : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(PostForm);
