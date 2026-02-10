import React, { useEffect, useRef, useState } from 'react';

/**
 * Component to render the first page of a PDF as a thumbnail using PDF.js
 */
const PDFThumbnail = ({ url, alt, className = '' }) => {
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!url || !window.pdfjsLib) {
            console.error('PDF.js not loaded or no URL provided');
            setError(true);
            setLoading(false);
            return;
        }

        const loadPDF = async () => {
            try {
                setLoading(true);
                setError(false);

                // Load the PDF
                const loadingTask = window.pdfjsLib.getDocument(url);
                const pdf = await loadingTask.promise;

                // Get the first page
                const page = await pdf.getPage(1);

                // Set up canvas
                const canvas = canvasRef.current;
                if (!canvas) return;

                const context = canvas.getContext('2d');

                // Calculate scale to fit 260px height
                const viewport = page.getViewport({ scale: 1 });
                const scale = 260 / viewport.height;
                const scaledViewport = page.getViewport({ scale });

                // Set canvas size
                canvas.width = scaledViewport.width;
                canvas.height = scaledViewport.height;

                // Render the page
                await page.render({
                    canvasContext: context,
                    viewport: scaledViewport
                }).promise;

                setLoading(false);
            } catch (err) {
                console.error('Error loading PDF thumbnail:', err);
                setError(true);
                setLoading(false);
            }
        };

        loadPDF();
    }, [url]);

    if (loading) {
        return (
            <div className={`pdf-thumbnail-loading ${className}`} style={{
                width: '100%',
                height: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f5f5f5',
                borderRadius: '8px'
            }}>
                <div style={{ textAlign: 'center', color: '#999' }}>
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '10px' }}></i>
                    <p style={{ fontSize: '0.85rem' }}>Loading PDF...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`pdf-thumbnail-error ${className}`} style={{
                width: '100%',
                height: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--matcha-main) 0%, var(--matcha-dark) 100%)',
                borderRadius: '8px'
            }}>
                <div style={{ textAlign: 'center', color: '#fff' }}>
                    <i className="fas fa-file-pdf" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                    <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>{alt || 'PDF Document'}</p>
                </div>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className={`pdf-thumbnail-canvas ${className}`}
            style={{
                width: '100%',
                height: '260px',
                objectFit: 'contain',
                borderRadius: '8px',
                background: '#fff',
                display: 'block'
            }}
        />
    );
};

export default PDFThumbnail;
