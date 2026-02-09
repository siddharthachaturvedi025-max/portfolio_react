import React, { useState, useEffect } from 'react';
import { useDrive } from '../context/DriveContext';

/**
 * Google Drive-style modal viewer for PDFs, images, and documents
 * Dark theme with center content and translucent margins
 * SupportsDownload tracking and full-page scrolling
 */
const FileViewer = ({ file, onClose, onDownload }) => {
    const { files, loading } = useDrive();
    const [isLoading, setIsLoading] = useState(true);

    if (!file) return null;

    // Get file URL from Drive context with comprehensive fallback handling
    let fileUrl = null;
    if (files && file.name) {
        // Try exact match first
        fileUrl = files[file.name];

        // Try lowercase match
        if (!fileUrl) {
            fileUrl = files[file.name.toLowerCase()];
        }

        // Try uppercase match
        if (!fileUrl) {
            fileUrl = files[file.name.toUpperCase()];
        }

        // Try matching base filename without extension
        if (!fileUrl) {
            const baseNameWithoutExt = file.name.split('.')[0].toLowerCase();
            Object.keys(files).forEach(key => {
                const keyBase = key.split('.')[0].toLowerCase();
                if (keyBase === baseNameWithoutExt) {
                    fileUrl = files[key];
                }
            });
        }
    }

    // Update loading state after timeout or when file loads
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Stop loading after 3 seconds
        }, 3000);

        if (fileUrl || !loading) {
            setIsLoading(false);
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [fileUrl, loading]);

    // Determine file type
    const getFileType = (filename) => {
        if (!filename) return 'unknown';
        const ext = filename.toLowerCase().split('.').pop();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
        if (ext === 'pdf') return 'pdf';
        if (['doc', 'docx'].includes(ext)) return 'word';
        return 'unknown';
    };

    const fileType = getFileType(file.name);

    const handleDownload = async () => {
        // Track download by calling Netlify function
        try {
            await fetch('/.netlify/functions/track-download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fileName: file.name,
                    section: file.section || 'Unknown'
                })
            });
        } catch (error) {
            console.error('Error tracking download:', error);
        }

        // Open file for download or viewing
        if (fileUrl) {
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = file.name;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (onDownload) {
                onDownload(file.name, fileUrl);
            }
        } else {
            alert('File URL not available. Please check that the file is uploaded to Google Drive.');
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="file-viewer-overlay" onClick={handleBackdropClick}>
            <div className="file-viewer-container">
                {/* Header with title and download button */}
                <div className="file-viewer-header">
                    <div className="file-viewer-title">
                        <i className={`fas ${fileType === 'pdf' ? 'fa-file-pdf' :
                                fileType === 'image' ? 'fa-image' :
                                    fileType === 'word' ? 'fa-file-word' : 'fa-file'
                            }`}></i>
                        <span>{file.name}</span>
                    </div>
                    <div className="file-viewer-actions">
                        <button
                            className="viewer-btn download-btn"
                            onClick={handleDownload}
                            title="Download"
                            disabled={!fileUrl}
                        >
                            <i className="fas fa-download"></i>
                            Download
                        </button>
                        <button
                            className="viewer-btn close-btn"
                            onClick={onClose}
                            title="Close"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                {/* Content area */}
                <div className="file-viewer-content">
                    {isLoading ? (
                        <div className="viewer-loading">
                            <i className="fas fa-spinner fa-spin"></i>
                            <p>Loading file from Google Drive...</p>
                        </div>
                    ) : !fileUrl ? (
                        <div className="viewer-error">
                            <i className="fas fa-exclamation-triangle"></i>
                            <h3>File Not Found</h3>
                            <p>Unable to load <strong>{file.name}</strong> from Google Drive.</p>
                            <div style={{ marginTop: '20px', padding: '15px', background: '#2a2a2a', borderRadius: '4px', fontSize: '0.9rem', textAlign: 'left', maxWidth: '500px' }}>
                                <p style={{ marginBottom: '10px' }}><strong>Possible issues:</strong></p>
                                <ul style={{ marginLeft: '20px', lineHeight: '1.8', color: '#aaa' }}>
                                    <li>File not uploaded to Google Drive folder</li>
                                    <li>File name doesn't match exactly (check capitalization)</li>
                                    <li>Drive API key not configured in `.env`</li>
                                    <li>File permissions not set to "Anyone with link"</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <>
                            {fileType === 'image' && (
                                <div className="viewer-image-container">
                                    <img src={fileUrl} alt={file.name} />
                                </div>
                            )}

                            {fileType === 'pdf' && (
                                <iframe
                                    src={`${fileUrl}#view=FitH`}
                                    className="viewer-pdf-frame"
                                    title={file.name}
                                    frameBorder="0"
                                />
                            )}

                            {fileType === 'word' && (
                                <div className="viewer-word-container">
                                    <div className="viewer-word-message">
                                        <i className="fas fa-file-word"></i>
                                        <h3>Word Document Preview</h3>
                                        <p>Word documents cannot be previewed directly in the browser.</p>
                                        <button
                                            className="viewer-btn download-btn-large"
                                            onClick={handleDownload}
                                        >
                                            <i className="fas fa-download"></i>
                                            Download to View
                                        </button>
                                    </div>
                                </div>
                            )}

                            {fileType === 'unknown' && (
                                <div className="viewer-unknown-container">
                                    <div className="viewer-unknown-message">
                                        <i className="fas fa-file"></i>
                                        <h3>File Preview Unavailable</h3>
                                        <p>This file type cannot be previewed in the browser.</p>
                                        <button
                                            className="viewer-btn download-btn-large"
                                            onClick={handleDownload}
                                        >
                                            <i className="fas fa-download"></i>
                                            Download File
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileViewer;
