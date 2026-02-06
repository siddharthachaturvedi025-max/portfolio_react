import React, { useState } from 'react';
import { useDrive } from '../context/DriveContext';

const DriveImage = ({ name, initialSrc, alt, className, ...props }) => {
    const { files, loading } = useDrive();
    const [imgError, setImgError] = useState(false);

    // Determine source: Drive > Initial/Local > Placeholder
    // If drive has the file, use it. Otherwise use the provided initialSrc (local path)

    let src = initialSrc;

    if (files && files[name]) {
        src = files[name];
    } else if (files && files[name?.toLowerCase()]) {
        src = files[name.toLowerCase()];
    } else if (!initialSrc) {
        // If no local source provided, try to guess local path
        // src = `/images/${name}`;
        // Actually, stick to initialSrc passed by parent
    }

    if (imgError) {
        // Fallback if image fails to load
        return (
            <div className={`image-placeholder ${className}`} style={{ background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                <span>{alt || 'Image'}</span>
            </div>
        );
    }

    // If loading drive files and we *expect* a drive file (no local fallback), maybe show loader?
    // But usually we have local fallbacks.

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setImgError(true)}
            {...props}
        />
    );
};

export default DriveImage;
