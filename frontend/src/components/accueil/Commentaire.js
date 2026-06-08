import React, { useState, useRef, useEffect } from 'react';
import "../css/Commentaire.css";

import { getCommentaires, createCommentaire } from '../../services/commentaireService';
import { useAuth } from '../../hooks/useAuth';

const Commentaire = () => {
  const { user, isAuthenticated } = useAuth();
  
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const scrollRef = useRef(null);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommentaires();
  }, []);

  const fetchCommentaires = async () => {
    try {
      setLoading(true);
      const data = await getCommentaires();
      
      const formattedComments = data.map((item) => ({
        id: item.id,
        name: item.user.name,
        avatar: item.user.avatar,
        date: item.date,
        text: item.contenu,
        likes: 0,
        liked: false,
        rating: item.note,
        userId: item.user.id,
      }));
      
      setComments(formattedComments);
    } catch (err) {
      console.error('Erreur chargement:', err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -340 : 340,
        behavior: 'smooth'
      });
    }
  };

  const handleLike = (id) => {
    setComments(comments.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          liked: !comment.liked
        };
      }
      return comment;
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!newComment.trim()) return;
    if (rating === 0) {
      setError('Veuillez attribuer une note');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('contenu', newComment);
      formData.append('note', rating);

      const response = await createCommentaire(formData);

      if (response.success) {
        // Comment is pending approval — do NOT add it to the public list
        setNewComment('');
        setRating(0);
        setHoverRating(0);
        setIsFocused(false);
        setSuccess(
          '✅ Votre avis a été soumis et est en attente de validation par un administrateur.'
        );
        setTimeout(() => setSuccess(''), 6000);
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la publication');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onRate = null, onHover = null, hoverValue = 0) => {
    const displayRating = interactive ? (hoverValue || rating) : rating;
    return (
      <div className={`stars ${interactive ? 'interactive' : ''}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn ${star <= displayRating ? 'filled' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
            onMouseEnter={() => interactive && onHover && onHover(star)}
            onMouseLeave={() => interactive && onHover && onHover(0)}
            disabled={!interactive && isSubmitting}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  const getAvatarColor = (id) => `hsl(${(id * 137) % 360}, 70%, 55%)`;
  
  const getUserInitials = () => {
    if (!user || !user.name) return 'VO';
    return user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <section className="commentaire-section">
      <div className="commentaire-container">
        
        {/* Header */}
        <div className="commentaire-header">
          <span className="section-tag">AVIS VOYAGEURS</span>
          <h2 className="section-title">Ils Ont Voyagé Avec Nous</h2>
        </div>

        {/* Message succès */}
        {success && (
          <div className="alert-message alert-success">
            <span>{success}</span>
          </div>
        )}

        {/* Carousel */}
        <div className="carousel-area">
          <button className="carousel-arrow arrow-left" onClick={() => scroll('left')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className="comments-scroll" ref={scrollRef}>
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Chargement des avis...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="empty-state">
                <p>Aucun avis pour le moment</p>
                <span>Soyez le premier !</span>
              </div>
            ) : (
              comments.map((comment, idx) => (
                <div key={comment.id} className="comment-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="card-body">
                    <div className="card-top">
                      <div className="user-avatar" style={{ background: getAvatarColor(comment.id) }}>
                        {comment.avatar}
                      </div>
                      <div className="user-info">
                        <h4>{comment.name}</h4>
                        <span>{comment.date}</span>
                      </div>
                      {renderStars(comment.rating)}
                    </div>

                    <p className="comment-text">"{comment.text}"</p>

                    <div className="card-footer">
                      <button 
                        className={`like-btn ${comment.liked ? 'liked' : ''}`} 
                        onClick={() => handleLike(comment.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" 
                          fill={comment.liked ? "currentColor" : "none"} 
                          stroke="currentColor" strokeWidth="2"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <button className="carousel-arrow arrow-right" onClick={() => scroll('right')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Formulaire */}
        <div className={`add-comment-section ${isFocused ? 'focused' : ''}`}>
          <form className="add-comment-form" onSubmit={handleSubmit}>
            <div className="add-comment-top">
              <div className="add-comment-avatar" style={!isAuthenticated ? { background: '#ccc' } : {}}>
                {isAuthenticated ? getUserInitials() : '👤'}
              </div>
              
              <div className="input-area">
                <textarea
                  className="comment-input"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder={isAuthenticated 
                    ? `Bonjour ${user?.name?.split(' ')[0] || ''}, partagez votre expérience...`
                    : "Connectez-vous pour partager votre expérience de voyage..."
                  }
                  rows={3}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className={`comment-actions-bar ${isFocused || newComment ? 'visible' : ''}`}>
              <div className="actions-left">
                <div className="rating-area">
                  <span>Votre note:</span>
                  {renderStars(rating, true, setRating, setHoverRating, hoverRating)}
                </div>
              </div>

              <button 
                type="submit" 
                className={`publish-btn ${newComment.trim() && rating > 0 && !isSubmitting ? 'active' : ''}`}
                disabled={!newComment.trim() || rating === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-small"></span>
                    Publication...
                  </>
                ) : (
                  'Publier'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Login */}
      {showLoginModal && (
        <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>✕</button>
            
            <div className="modal-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            
            <h3>Connexion requise</h3>
            <p>Veuillez vous connecter pour publier votre commentaire.</p>
            
            <div className="modal-actions">
              <button className="modal-btn modal-btn-primary" onClick={() => window.location.href = '/login'}>
                Se connecter
              </button>
              <button className="modal-btn modal-btn-secondary" onClick={() => setShowLoginModal(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Commentaire;