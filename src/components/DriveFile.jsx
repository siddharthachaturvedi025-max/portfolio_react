import React, { useState } from 'react';
import { useDrive } from '../context/DriveContext';
import PDFThumbnail from './PDFThumbnail';

/**
 * Enhanced component to display various file types from Google Drive
 * Supports: JPG, PNG, PDF (with preview), Word (DOCX), and other documents
 */
const DriveFile = ({ name, alt, type = 'auto', className, ...props }) => {
    const { files, fileData, loading } = useDrive();
    const [error, setError] = useState(false);

    // Get file URL from Drive
    let fileUrl = null;
    let fileMeta = null;

    if (files && files[name]) {
        fileUrl = files[name];
        fileMeta = fileData?.[name];
    } else if (files && name && files[name.toLowerCase()]) {
        fileUrl = files[name.toLowerCase()];
        fileMeta = fileData?.[name.toLowerCase()];
    }

    // For images, use thumbnail URL for better performance in grids
    const displayUrl = fileMeta?.thumbnailUrl || fileUrl;

    // Determine file type from extension if type is 'auto'
    const getFileType = (filename) => {
        if (!filename) return 'unknown';
        const ext = filename.toLowerCase().split('.').pop();

        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
        if (ext === 'pdf') return 'pdf';
        if (['doc', 'docx'].includes(ext)) return 'word';
        return 'document';
    };

    const fileType = type === 'auto' ? getFileType(name) : type;

    // Handle image files
    if (fileType === 'image') {
        if (error) {
            return (
                <div className={`file-placeholder ${className}`} style={{
                    background: 'var(--gradient-1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    minHeight: '200px',
                    borderRadius: '8px'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <i className="fas fa-image" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                        <p>{alt || 'Image'}</p>
                    </div>
                </div>
            );
        }

        return (
            <img
                src={displayUrl}
                alt={alt}
                className={className}
                onError={() => setError(true)}
                {...props}
            />
        );
    }

    // Handle PDF files - Show styled placeholder
    if (fileType === 'pdf') {
        const pdfViewUrl = fileMeta?.viewUrl || fileUrl;

        return (
            <div className={`file-display pdf-display ${className}`} style={{ background: 'transparent', padding: 0 }}>
                <div className="pdf-preview-wrapper">
                    <div className="pdf-placeholder" style={{
                        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                        padding: '40px 20px',
                        minHeight: '260px',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Background pattern */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
                            pointerEvents: 'none'
                        }}></div>

                        {/* Content */}
                        <i className="fas fa-file-pdf" style={{
                            fontSize: '4rem',
                            color: '#fff',
                            marginBottom: '15px',
                            position: 'relative',
                            zIndex: 1
                        }}></i>
                        <p style={{
                            marginTop: '0',
                            fontWeight: '600',
                            color: '#fff',
                            fontSize: '0.95rem',
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 1,
                            maxWidth: '90%'
                        }}>{alt || name}</p>
                        <span style={{
                            marginTop: '8px',
                            padding: '4px 12px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            color: '#fff',
                            fontWeight: '500',
                            position: 'relative',
                            zIndex: 1
                        }}>PDF Document</span>
                    </div>
                    <div className="pdf-overlay">
                        <a
                            href={pdfViewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-download-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <i className="fas fa-external-link-alt"></i> View Full PDF
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Handle Word documents
    if (fileType === 'word') {
        return (
            <div className={`file-display word-display ${className}`}>
                <div className="file-preview">
                    <i className="fas fa-file-word" style={{ fontSize: '3rem', color: '#2b579a' }}></i>
                    <p style={{ marginTop: '10px', fontWeight: '500' }}>{alt || name}</p>
                    {fileUrl && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="file-download-btn"
                        >
                            <i className="fas fa-download"></i> Download Document
                        </a>
                    )}
                </div>
            </div>
        );
    }

    // Generic document fallback
    return (
        <div className={`file-display doc-display ${className}`}>
            <div className="file-preview">
                <i className="fas fa-file-alt" style={{ fontSize: '3rem', color: '#95a5a6' }}></i>
                <p style={{ marginTop: '10px', fontWeight: '500' }}>{alt || name}</p>
                {fileUrl && (
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file-download-btn"
                    >
                        <i className="fas fa-download"></i> Download
                    </a>
                )}
            </div>
        </div>
    );
};

export default DriveFile;
