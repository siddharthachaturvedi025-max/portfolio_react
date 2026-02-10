import React, { useState } from 'react';
import { useDrive } from '../context/DriveContext';

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

    // Handle PDF files - Show first page as thumbnail using iframe
    if (fileType === 'pdf') {
        // Use preview URL to show first page of PDF
        const pdfPreviewUrl = fileMeta?.viewUrl || fileUrl;

        return (
            <div className={`file-display pdf-display ${className}`} style={{ background: 'transparent', padding: 0 }}>
                <div className="pdf-preview-wrapper">
                    {pdfPreviewUrl ? (
                        <>
                            {/* Show first page of PDF in iframe */}
                            <iframe
                                src={`${pdfPreviewUrl}`}
                                className="pdf-thumbnail-iframe"
                                title={alt || name}
                                frameBorder="0"
                                scrolling="no"
                                style={{
                                    width: '100%',
                                    height: '260px',
                                    border: 'none',
                                    pointerEvents: 'none',
                                    display: 'block',
                                    borderRadius: '8px',
                                    background: '#fff'
                                }}
                            />
                            <div className="pdf-overlay">
                                <a
                                    href={pdfPreviewUrl}
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
                        </>
                    ) : (
                        <div className="file-preview" style={{
                            background: 'linear-gradient(135deg, var(--matcha-main) 0%, var(--matcha-dark) 100%)',
                            padding: '30px',
                            minHeight: '260px',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <i className="fas fa-file-pdf" style={{ fontSize: '3rem', color: '#fff' }}></i>
                            <p style={{ marginTop: '10px', fontWeight: '500', color: '#fff' }}>{alt || name}</p>
                        </div>
                    )}
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
