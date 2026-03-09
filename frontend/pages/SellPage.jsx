import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Genre } from '../types';
import { API_URL } from '../config';

const SellPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState(Genre.FANTASY);
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageDragActive, setImageDragActive] = useState(false);
  const [pdfDragActive, setPdfDragActive] = useState(false);
  const { token } = useAuth();
  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setImageDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePdfDrop = (e) => {
    e.preventDefault();
    setPdfDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || (!isFree && !price) || !description || !coverImage || !pdfFile) {
      alert('Please fill out all fields and upload both cover image and PDF.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('description', description);
    formData.append('price', isFree ? 0 : price);
    formData.append('is_free', isFree ? 'True' : 'False');
    formData.append('cover_image', coverImage);
    formData.append('pdf_file', pdfFile);

    try {
      const headers = {};
      if (token) {
        headers['Authorization'] = `Token ${token}`;
      }

      const response = await fetch(`${API_URL}/api/books/`, {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Book uploaded successfully:', data);
        setTitle('');
        setAuthor('');
        setGenre(Genre.FANTASY);
        setPrice('');
        setIsFree(false);
        setDescription('');
        setCoverImage(null);
        setPdfFile(null);
        setImagePreview(null);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        let errorMessage = `Server returned status ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = JSON.stringify(errorData, null, 2);
        } catch (e) {
          const errorText = await response.text();
          errorMessage = errorText;
        }
        alert('Failed to upload book:\n' + errorMessage);
      }
    } catch (error) {
      alert('Error uploading book: ' + error.message + `\n\nMake sure the backend server is running on ${API_URL}`);
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = title && author && (isFree || price) && description && coverImage && pdfFile;

  const completionSteps = [
    { label: 'Title', done: !!title },
    { label: 'Author', done: !!author },
    { label: 'Cover', done: !!coverImage },
    { label: 'PDF', done: !!pdfFile },
    { label: 'Description', done: !!description },
    { label: 'Price', done: isFree || !!price },
  ];
  const completionPercent = Math.round((completionSteps.filter(s => s.done).length / completionSteps.length) * 100);

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#0a0a1a',
      position: 'relative',
      overflow: 'hidden',
    },
    bgOrbs: {
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    orb1: {
      position: 'absolute',
      width: '450px',
      height: '450px',
      borderRadius: '50%',
      filter: 'blur(120px)',
      opacity: 0.2,
      background: 'rgba(139, 92, 246, 0.4)',
      top: '-100px',
      left: '-100px',
      animation: 'orbFloat1 15s ease-in-out infinite',
    },
    orb2: {
      position: 'absolute',
      width: '350px',
      height: '350px',
      borderRadius: '50%',
      filter: 'blur(100px)',
      opacity: 0.18,
      background: 'rgba(99, 102, 241, 0.35)',
      bottom: '-80px',
      right: '-80px',
      animation: 'orbFloat2 18s ease-in-out infinite',
    },
    orb3: {
      position: 'absolute',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      filter: 'blur(80px)',
      opacity: 0.12,
      background: 'rgba(236, 72, 153, 0.25)',
      top: '60%',
      left: '60%',
      animation: 'orbFloat3 12s ease-in-out infinite',
    },
    content: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px 24px',
    },
    heroSection: {
      textAlign: 'center',
      marginBottom: '40px',
      animation: 'fadeInUp 0.6s ease-out',
    },
    heroTitle: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 800,
      color: '#ffffff',
      letterSpacing: '-0.03em',
      marginBottom: '12px',
      lineHeight: 1.1,
    },
    heroGradient: {
      background: 'linear-gradient(135deg, #818cf8, #c084fc, #f472b6)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    heroSubtitle: {
      fontSize: '1.1rem',
      color: 'rgba(255, 255, 255, 0.45)',
      maxWidth: '500px',
      margin: '0 auto',
      lineHeight: 1.6,
    },
    formCard: {
      background: 'rgba(15, 15, 35, 0.6)',
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '28px',
      padding: '40px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(99, 102, 241, 0.03)',
      animation: 'fadeInUp 0.6s ease-out 0.1s both',
    },
    progressSection: {
      marginBottom: '32px',
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    progressLabel: {
      fontSize: '0.85rem',
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 0.5)',
    },
    progressPercent: {
      fontSize: '0.85rem',
      fontWeight: 700,
      color: completionPercent === 100 ? '#22c55e' : '#818cf8',
    },
    progressBar: {
      height: '4px',
      borderRadius: '2px',
      background: 'rgba(255, 255, 255, 0.06)',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: '2px',
      background: completionPercent === 100
        ? 'linear-gradient(90deg, #22c55e, #4ade80)'
        : 'linear-gradient(90deg, #6366f1, #8b5cf6, #c084fc)',
      width: `${completionPercent}%`,
      transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    },
    progressSteps: {
      display: 'flex',
      gap: '8px',
      marginTop: '12px',
      flexWrap: 'wrap',
    },
    progressStep: (done) => ({
      fontSize: '0.75rem',
      padding: '4px 12px',
      borderRadius: '20px',
      background: done ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 255, 255, 0.04)',
      color: done ? '#4ade80' : 'rgba(255, 255, 255, 0.3)',
      border: `1px solid ${done ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.06)'}`,
      fontWeight: 500,
      transition: 'all 0.3s ease',
    }),
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    formGroupFull: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      gridColumn: '1 / -1',
    },
    label: {
      fontSize: '0.85rem',
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 0.55)',
      letterSpacing: '0.02em',
    },
    input: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '14px',
      padding: '13px 16px',
      color: '#ffffff',
      fontSize: '0.95rem',
      fontFamily: "'Inter', sans-serif",
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      boxSizing: 'border-box',
      width: '100%',
    },
    select: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '14px',
      padding: '13px 16px',
      color: '#ffffff',
      fontSize: '0.95rem',
      fontFamily: "'Inter', sans-serif",
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      appearance: 'none',
      width: '100%',
      boxSizing: 'border-box',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 14px center',
      paddingRight: '36px',
    },
    textarea: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '14px',
      padding: '13px 16px',
      color: '#ffffff',
      fontSize: '0.95rem',
      fontFamily: "'Inter', sans-serif",
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      resize: 'vertical',
      minHeight: '120px',
      boxSizing: 'border-box',
      width: '100%',
    },
    dropZone: (active) => ({
      border: `2px dashed ${active ? 'rgba(99, 102, 241, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
      borderRadius: '18px',
      padding: '32px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      background: active ? 'rgba(99, 102, 241, 0.06)' : 'rgba(255, 255, 255, 0.01)',
      position: 'relative',
      overflow: 'hidden',
    }),
    dropZoneIcon: {
      width: '52px',
      height: '52px',
      margin: '0 auto 16px',
      borderRadius: '16px',
      background: 'rgba(99, 102, 241, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropZoneTitle: {
      color: '#ffffff',
      fontSize: '0.95rem',
      fontWeight: 600,
      marginBottom: '6px',
    },
    dropZoneText: {
      color: 'rgba(255, 255, 255, 0.35)',
      fontSize: '0.8rem',
    },
    dropZoneHighlight: {
      color: '#818cf8',
      fontWeight: 600,
    },
    imagePreview: {
      width: '100%',
      maxHeight: '200px',
      objectFit: 'cover',
      borderRadius: '12px',
      marginBottom: '12px',
    },
    checkboxRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 16px',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '14px',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    checkbox: {
      width: '20px',
      height: '20px',
      accentColor: '#818cf8',
      cursor: 'pointer',
    },
    checkboxLabel: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.9rem',
      fontWeight: 500,
    },
    freeTag: {
      marginLeft: 'auto',
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))',
      color: '#4ade80',
      fontSize: '0.75rem',
      fontWeight: 700,
      padding: '4px 12px',
      borderRadius: '20px',
      border: '1px solid rgba(34, 197, 94, 0.2)',
    },
    fileInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 16px',
      background: 'rgba(99, 102, 241, 0.06)',
      borderRadius: '12px',
      border: '1px solid rgba(99, 102, 241, 0.15)',
      marginTop: '12px',
    },
    fileInfoIcon: {
      color: '#818cf8',
      flexShrink: 0,
    },
    fileInfoText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '0.85rem',
      fontWeight: 500,
    },
    fileInfoSize: {
      color: 'rgba(255, 255, 255, 0.35)',
      fontSize: '0.75rem',
      marginLeft: 'auto',
    },
    submitBtn: {
      width: '100%',
      padding: '16px 24px',
      background: isFormValid
        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
        : 'rgba(255, 255, 255, 0.05)',
      border: isFormValid ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      color: isFormValid ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
      fontSize: '1rem',
      fontWeight: 700,
      fontFamily: "'Inter', sans-serif",
      cursor: isFormValid ? 'pointer' : 'not-allowed',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      position: 'relative',
      overflow: 'hidden',
      marginTop: '8px',
    },
    successBanner: {
      background: 'rgba(34, 197, 94, 0.1)',
      border: '1px solid rgba(34, 197, 94, 0.2)',
      borderRadius: '16px',
      padding: '20px 24px',
      marginBottom: '28px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      animation: 'fadeInUp 0.4s ease-out',
    },
    successIcon: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      background: 'rgba(34, 197, 94, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    successText: {
      color: '#86efac',
      fontSize: '0.95rem',
      fontWeight: 600,
    },
    successSubtext: {
      color: 'rgba(134, 239, 172, 0.6)',
      fontSize: '0.85rem',
      marginTop: '2px',
    },
  };

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 40px); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(-40%, -60%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sell-input:focus, .sell-select:focus, .sell-textarea:focus {
          border-color: rgba(99, 102, 241, 0.4) !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08) !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .sell-select option {
          background: #1a1a2e;
          color: #ffffff;
        }
        .sell-dropzone:hover {
          border-color: rgba(99, 102, 241, 0.4) !important;
          background: rgba(99, 102, 241, 0.04) !important;
        }
        .sell-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.1);
        }
        .sell-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .sell-checkbox-row:hover {
          background: rgba(255, 255, 255, 0.04) !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .uploading-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @media (max-width: 640px) {
          .sell-form-grid {
            grid-template-columns: 1fr !important;
          }
          .sell-form-card {
            padding: 24px !important;
            border-radius: 20px !important;
          }
        }
      `}</style>

      {/* Background Orbs */}
      <div style={styles.bgOrbs}>
        <div style={styles.orb1}></div>
        <div style={styles.orb2}></div>
        <div style={styles.orb3}></div>
      </div>

      <div style={styles.content}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <h1 style={styles.heroTitle}>
            Publish Your <span style={styles.heroGradient}>Book</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Share your creation with the world. Upload your ebook and reach thousands of readers.
          </p>
        </div>

        {/* Form Card */}
        <div style={styles.formCard} className="sell-form-card">
          {/* Success Banner */}
          {submitted && (
            <div style={styles.successBanner}>
              <div style={styles.successIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <div>
                <div style={styles.successText}>Book Published Successfully! 🎉</div>
                <div style={styles.successSubtext}>Your book is now live and available for readers.</div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div style={styles.progressSection}>
            <div style={styles.progressHeader}>
              <span style={styles.progressLabel}>Completion</span>
              <span style={styles.progressPercent}>{completionPercent}%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={styles.progressFill}></div>
            </div>
            <div style={styles.progressSteps}>
              {completionSteps.map((step, i) => (
                <span key={i} style={styles.progressStep(step.done)}>
                  {step.done ? '✓' : '○'} {step.label}
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid} className="sell-form-grid">
              {/* Title */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Book Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your book title"
                  style={styles.input}
                  className="sell-input"
                  required
                />
              </div>

              {/* Author */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Author Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  style={styles.input}
                  className="sell-input"
                  required
                />
              </div>

              {/* Cover Image Upload */}
              <div style={styles.formGroupFull}>
                <label style={styles.label}>Cover Image</label>
                <div
                  style={styles.dropZone(imageDragActive)}
                  className="sell-dropzone"
                  onClick={() => imageInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setImageDragActive(true); }}
                  onDragLeave={() => setImageDragActive(false)}
                  onDrop={handleImageDrop}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Cover preview" style={styles.imagePreview} />
                  ) : (
                    <div style={styles.dropZoneIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                      </svg>
                    </div>
                  )}
                  <div style={styles.dropZoneTitle}>
                    {coverImage ? coverImage.name : 'Drop your cover image here'}
                  </div>
                  <div style={styles.dropZoneText}>
                    or <span style={styles.dropZoneHighlight}>browse files</span> — PNG, JPG, GIF up to 10MB
                  </div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    required
                  />
                </div>
              </div>

              {/* Genre */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Genre</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  style={styles.select}
                  className="sell-select"
                >
                  {Object.values(Genre).map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Price Section */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Pricing</label>
                <div
                  style={styles.checkboxRow}
                  className="sell-checkbox-row"
                  onClick={() => setIsFree(!isFree)}
                >
                  <input
                    type="checkbox"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                    style={styles.checkbox}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span style={styles.checkboxLabel}>Free to Read</span>
                  {isFree && <span style={styles.freeTag}>FREE</span>}
                </div>
                {!isFree && (
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price in ₹"
                    min="0"
                    step="0.01"
                    style={{ ...styles.input, marginTop: '4px' }}
                    className="sell-input"
                    required={!isFree}
                  />
                )}
              </div>

              {/* PDF Upload */}
              <div style={styles.formGroupFull}>
                <label style={styles.label}>Upload PDF Book</label>
                <div
                  style={styles.dropZone(pdfDragActive)}
                  className="sell-dropzone"
                  onClick={() => pdfInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setPdfDragActive(true); }}
                  onDragLeave={() => setPdfDragActive(false)}
                  onDrop={handlePdfDrop}
                >
                  <div style={styles.dropZoneIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                      <path d="M10 18v-4"/>
                      <path d="M14 18v-2"/>
                    </svg>
                  </div>
                  <div style={styles.dropZoneTitle}>
                    {pdfFile ? pdfFile.name : 'Drop your PDF file here'}
                  </div>
                  <div style={styles.dropZoneText}>
                    or <span style={styles.dropZoneHighlight}>browse files</span> — PDF format only
                  </div>
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfChange}
                    style={{ display: 'none' }}
                    required
                  />
                </div>
                {pdfFile && (
                  <div style={styles.fileInfo}>
                    <svg style={styles.fileInfoIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    </svg>
                    <span style={styles.fileInfoText}>{pdfFile.name}</span>
                    <span style={styles.fileInfoSize}>
                      {(pdfFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div style={styles.formGroupFull}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a compelling description for your book..."
                  style={styles.textarea}
                  className="sell-textarea"
                  required
                />
              </div>

              {/* Submit */}
              <div style={styles.formGroupFull}>
                <button
                  type="submit"
                  style={styles.submitBtn}
                  className={`sell-submit ${isUploading ? 'uploading-shimmer' : ''}`}
                  disabled={!isFormValid || isUploading}
                >
                  {isUploading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Publishing...
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 17V3"/>
                        <path d="m6 11 6 6 6-6"/>
                        <path d="M19 21H5"/>
                      </svg>
                      Publish Book
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
