import React, { useState, useEffect, useRef } from 'react';
import { useDrive } from '../context/DriveContext';
import GearLoader from './GearLoader';

/**
 * Google Drive-style modal viewer for PDFs, images, and documents
 * Features proper PDF page navigation using PDF.js
 * Includes 1.5s loading animation with planetary gears
 */
const FileViewer = ({ file, onClose, onDownload }) => {
    const { files, fileData, loading } = useDrive();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pdfDocument, setPdfDocument] = useState(null);
    const canvasRef = useRef(null);

    if (!file) return null;

    // Get file URL and metadata from Drive context
    let fileUrl = null;
    let fileMeta = null;

    if (files && file.name) {
        fileUrl = files[file.name];
        fileMeta = fileData?.[file.name];

        if (!fileUrl) {
            fileUrl = files[file.name.toLowerCase()];
            fileMeta = fileData?.[file.name.toLowerCase()];
        }

        if (!fileUrl) {
            fileUrl = files[file.name.toUpperCase()];
            fileMeta = fileData?.[file.name.toUpperCase()];
        }

        if (!fileUrl) {
            const baseNameWithoutExt = file.name.split('.')[0].toLowerCase();
            Object.keys(files).forEach(key => {
                const keyBase = key.split('.')[0].toLowerCase();
                if (keyBase === baseNameWithoutExt) {
                    fileUrl = files[key];
                    fileMeta = fileData?.[key];
                }
            });
        }
    }

    // Reset page when file changes
    useEffect(() => {
        setCurrentPage(1);
        setPdfDocument(null);
    }, [file.name]);

    // Minimum 1.5s loading animation
    useEffect(() => {
        const minTimer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(minTimer);
    }, [fileUrl]);

    // Determine file type using MIME type
    const getFileType = (filename, metadata) => {
        if (metadata?.mimeType) {
            const mime = metadata.mimeType;
            console.log(`File: ${filename}, MIME: ${mime}`);
            if (mime.startsWith('image/')) return 'image';
            if (mime === 'application/pdf') return 'pdf';
            if (mime.includes('word') || mime.includes('document')) return 'word';
        }

        if (!filename) return 'unknown';
        const ext = filename.toLowerCase().split('.').pop();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
        if (ext === 'pdf') return 'pdf';
        if (['doc', 'docx'].includes(ext)) return 'word';
        return 'unknown';
    };

    const fileType = getFileType(file.name, fileMeta);

    // Load PDF with PDF.js (for proper page navigation)
    useEffect(() => {
        if (fileType === 'pdf' && fileUrl && fileMeta?.downloadUrl) {
            const loadPDF = async () => {
                try {
                    // Use downloadUrl for PDF.js to avoid CORS issues
                    const loadingTask = window.pdfjsLib.getDocument(fileMeta.downloadUrl);
                    const pdf = await loadingTask.promise;
                    setPdfDocument(pdf);
                    setTotalPages(pdf.numPages);
                    console.log(`📄 PDF loaded: ${pdf.numPages} pages`);
                } catch (error) {
                    console.error('PDF loading error:', error);
                }
            };

            // Check if PDF.js is loaded
            if (window.pdfjsLib) {
                loadPDF();
            } else {
                console.warn('PDF.js not loaded, falling back to iframe');
            }
        }
    }, [fileType, fileUrl, fileMeta]);

    // Render PDF page on canvas
    useEffect(() => {
        if (pdfDocument && canvasRef.current) {
            const renderPage = async () => {
                const page = await pdfDocument.getPage(currentPage);
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');

                const viewport = page.getViewport({ scale: 1.5 });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;
            };

            renderPage();
        }
    }, [pdfDocument, currentPage]);

    const handleDownload = async () => {
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

        const downloadUrl = fileMeta?.downloadUrl || fileUrl;

        if (downloadUrl) {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = file.name;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if (onDownload) {
                onDownload(file.name, downloadUrl);
            }
        } else {
            alert('File URL not available.');
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(1, prev - 1));
    };

    return (
        <div className="file-viewer-overlay" onClick={handleBackdropClick}>
            <div className="file-viewer-container">
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

                <div className="file-viewer-content">
                    {isLoading ? (
                        <div className="viewer-loading">
                            <GearLoader size={120} message="Loading from Google Drive..." />
                        </div>
                    ) : !fileUrl ? (
                        <div className="viewer-error">
                            <i className="fas fa-exclamation-triangle"></i>
                            <h3>File Not Found</h3>
                            <p>Unable to load <strong>{file.name}</strong> from Google Drive.</p>
                            <div style={{ marginTop: '20px', padding: '15px', background: '#2a2a2a', borderRadius: '4px', fontSize: '0.9rem', textAlign: 'left', maxWidth: '500px' }}>
                                <p style={{ marginBottom: '10px' }}><strong>Troubleshooting:</strong></p>
                                <ul style={{ marginLeft: '20px', lineHeight: '1.8', color: '#aaa' }}>
                                    <li>Check browser console (F12) for Drive API errors</li>
                                    <li>Verify file uploaded to Google Drive</li>
                                    <li>Check file name matches exactly</li>
                                    <li>Verify `.env` has API key and folder ID</li>
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
                                <>
                                    {pdfDocument ? (
                                        <div className="pdf-canvas-container">
                                            <canvas ref={canvasRef} className="pdf-canvas" />
                                        </div>
                                    ) : (
                                        <iframe
                                            src={fileUrl}
                                            className="viewer-pdf-frame"
                                            title={file.name}
                                            frameBorder="0"
                                        />
                                    )}
                                    <div className="pdf-navigation">
                                        <button
                                            className="pdf-nav-btn prev-btn"
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            title="Previous Page"
                                        >
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                        <div className="pdf-page-indicator">
                                            <i className="fas fa-file-pdf"></i>
                                            <span>Page {currentPage}{totalPages > 1 ? ` / ${totalPages}` : ''}</span>
                                        </div>
                                        <button
                                            className="pdf-nav-btn next-btn"
                                            onClick={handleNextPage}
                                            disabled={currentPage >= totalPages}
                                            title="Next Page"
                                        >
                                            <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </>
                            )}

                            {fileType === 'word' && (
                                <div className="viewer-word-container">
                                    <div className="viewer-word-message">
                                        <i className="fas fa-file-word"></i>
                                        <h3>Word Document</h3>
                                        <p>Preview not available in browser.</p>
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
                                        <h3>Preview Unavailable</h3>
                                        <p>This file type cannot be previewed.</p>
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
