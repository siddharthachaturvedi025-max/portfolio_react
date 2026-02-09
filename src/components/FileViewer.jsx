import React from 'react';
import { useDrive } from '../context/DriveContext';

/**
 * Google Drive-style modal viewer for PDFs, images, and documents
 * Dark theme with center content and translucent margins
 * Supports download tracking and full-page scrolling
 */
const FileViewer = ({ file, onClose, onDownload }) => {
    const { files } = useDrive();

    if (!file) return null;

    // Get file URL from Drive context
    let fileUrl = null;
    if (files && files[file.name]) {
        fileUrl = files[file.name];
    } else if (files && file.name && files[file.name.toLowerCase()]) {
        fileUrl = files[file.name.toLowerCase()];
    }

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
        if (onDownload) {
            try {
                await fetch('/.netlify/functions/track-download', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fileName: file.name,
                        section: file.section || 'Unknown'
                    })
                });
                onDownload(file.name, fileUrl);
            } catch (error) {
                console.error('Error tracking download:', error);
                // Continue with download even if tracking fails
                onDownload(file.name, fileUrl);
            }
        }

        // Open file in new tab for download
        if (fileUrl) {
            window.open(fileUrl, '_blank');
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
                    {fileUrl ? (
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
                    ) : (
                        <div className="viewer-loading">
                            <i className="fas fa-spinner fa-spin"></i>
                            <p>Loading file...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileViewer;
