import React, { useState } from 'react';
import DriveImage from './DriveImage';
import DriveFile from './DriveFile';
import ImageCarousel from './ImageCarousel';
import FileViewer from './FileViewer';
import { useDrive } from '../context/DriveContext';

const MarkdownText = ({ text, className = "" }) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <p className={className}>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                }
                return part;
            })}
        </p>
    );
};

export const Navbar = () => {
    return (
        <nav>
            <div className="brand">Siddhartha Chaturvedi</div>
            <div className="nav-right">
                <span className="contact-info">+91 9691865830</span>
                <a href="mailto:siddharthachaturvedi025@gmail.com" className="contact-info">siddharthachaturvedi025@gmail.com</a>
                <a href="https://www.linkedin.com/in/siddhartha-chaturvedi/" target="_blank" className="contact-info">
                    <i className="fab fa-linkedin-in"></i>
                </a>
            </div>
        </nav>
    );
};

export const Hero = ({ data }) => {
    const { fileData } = useDrive();

    const handleDownload = () => {
        // Check for 'resume.pdf' or 'cv.pdf' in localized file data
        const resumeFile = fileData['resume.pdf'] || fileData['cv.pdf'] || fileData['resume'] || fileData['cv'];

        if (resumeFile && resumeFile.downloadUrl) {
            window.open(resumeFile.downloadUrl);
        } else {
            // Fallback to local
            window.open('/resume.pdf');
        }
    };

    return (
        <header className="hero">
            <div className="container hero-grid">
                <div className="hero-text">
                    <span className="section-subtitle">{data.subtitle}</span>
                    <h1>{data.title} <br /><span>{data.titleSpan}</span></h1>
                    <div className="hero-bio">
                        <MarkdownText text={data.bio} />
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button className="btn btn-primary" onClick={handleDownload}>
                            <i className="fas fa-arrow-down"></i> Download Resume
                        </button>
                        <a href="mailto:siddharthachaturvedi025@gmail.com" className="btn btn-outline">Email Me</a>
                    </div>
                </div>
                <div className="profile-wrapper">
                    <div className="profile-slot">
                        <DriveImage name={data.profileImage} alt="Profile" initialSrc="" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export const BioSection = ({ data }) => {
    return (
        <section className="bio-section">
            <div className="container bio-grid">
                <div>
                    <span className="section-subtitle">{data.subtitle}</span>
                    <h2 className="bio-title" dangerouslySetInnerHTML={{ __html: data.title.replace(/\n/g, '<br/>') }}></h2>
                </div>
                <div>
                    <MarkdownText text={data.text1} />
                    <MarkdownText text={data.text2} />
                </div>
            </div>
        </section>
    );
};

export const QuoteSection = ({ data }) => {
    return (
        <div className="quote-section">
            <div className="container">
                <p className="quote-text">{data.text}</p>
            </div>
        </div>
    );
};

export const Competencies = ({ data }) => {
    return (
        <section className="comp-section">
            <div className="container">
                <h2 className="section-title" style={{ textAlign: 'center' }}>Core Competencies</h2>
                <div className="comp-grid">
                    {data.map((item, i) => (
                        <div className="comp-card" key={i}>
                            <i className={`fas ${item.icon} comp-icon`}></i>
                            <h3>{item.title}</h3>
                            <ul className="comp-list">
                                {item.items.map((sub, j) => (
                                    <li key={j}>{sub}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const SoftwareSection = ({ data }) => {
    return (
        <section className="software-section">
            <div className="container">
                <div className="software-grid">
                    {data.map((item, i) => (
                        <div className="soft-item" key={i}>
                            <i className={`fas ${item.icon}`}></i>
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const Projects = ({ data }) => {
    return (
        <section className="projects-section">
            <div className="container">
                {data.map((proj, i) => (
                    <div className={`project-row ${proj.reverse ? 'reverse' : ''}`} key={i}>
                        {/* Text Side (Sticky) - Render Logic based on reverse */}
                        {!proj.reverse ? (
                            <div className="sticky">
                                <span className="section-subtitle">{proj.subtitle}</span>
                                <h2 className="section-title">{proj.title}</h2>
                                <div className="narrative">
                                    {proj.narrative.map((p, pIdx) => <MarkdownText key={pIdx} text={p} />)}
                                </div>
                                {proj.specs && proj.specs.length > 0 && (
                                    <div className="spec-grid">
                                        {proj.specs.map((s, sIdx) => (
                                            <div className="spec" key={sIdx}><h5>{s.label}</h5><span>{s.value}</span></div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="visual-stack">
                                {proj.images.map((imgGroup, imgIdx) => {
                                    // Convert names array to image objects for carousel
                                    const carouselImages = imgGroup.names.map((name, idx) => ({
                                        name: name,
                                        caption: imgGroup.caption,
                                        icon: imgGroup.icon
                                    }));

                                    return (
                                        <div className="display-zone" key={imgIdx}>
                                            <ImageCarousel images={carouselImages} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Opposite Side */}
                        {proj.reverse ? (
                            <div className="sticky">
                                <span className="section-subtitle">{proj.subtitle}</span>
                                <h2 className="section-title">{proj.title}</h2>
                                <div className="narrative">
                                    {proj.narrative.map((p, pIdx) => <MarkdownText key={pIdx} text={p} />)}
                                </div>
                                {proj.specs && proj.specs.length > 0 && (
                                    <div className="spec-grid">
                                        {proj.specs.map((s, sIdx) => (
                                            <div className="spec" key={sIdx}><h5>{s.label}</h5><span>{s.value}</span></div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="visual-stack">
                                {proj.images.map((imgGroup, imgIdx) => {
                                    // Convert names array to image objects for carousel
                                    const carouselImages = imgGroup.names.map((name, idx) => ({
                                        name: name,
                                        caption: imgGroup.caption,
                                        icon: imgGroup.icon
                                    }));

                                    return (
                                        <div className="display-zone" key={imgIdx}>
                                            <ImageCarousel images={carouselImages} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export const Research = ({ data }) => {
    const [viewerFile, setViewerFile] = useState(null);

    const handleFileClick = (item) => {
        setViewerFile({
            name: item.image,
            title: item.title,
            section: 'Academic Research'
        });
    };

    const handleDownload = (fileName, fileUrl) => {
        // TODO: Implement download tracking
        console.log('Download tracked:', fileName);
    };

    return (
        <section className="research-section">
            <div className="container">
                <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>Academic Research</h2>
                <div className="research-grid">
                    {data.map((item, i) => (
                        <div className="r-card" key={i}>
                            <h3>{item.title}</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--matcha-main)' }}>{item.subtitle}</p>
                            <MarkdownText text={item.text} />
                            <div
                                className="mini-display-zone clickable"
                                onClick={() => handleFileClick(item)}
                            >
                                <DriveFile name={item.image} alt={item.title} type="auto" />
                                {!item.image && <div className="ph-content"><i className={`fas ${item.icon}`}></i></div>}
                                <div className="file-overlay">
                                    <i className="fas fa-search-plus"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* File Viewer Modal */}
            {viewerFile && (
                <FileViewer
                    file={viewerFile}
                    onClose={() => setViewerFile(null)}
                    onDownload={handleDownload}
                />
            )}
        </section>
    );
};

export const Supplementary = () => {
    const [expanded, setExpanded] = useState(false);
    const [viewerFile, setViewerFile] = useState(null);
    const items = Array.from({ length: 22 }).map((_, i) => ({
        name: `supp${i + 1}.jpg`,
        title: `Supplementary ${i + 1}`,
        section: 'Supplementary Work'
    }));

    const handleFileClick = (file) => {
        setViewerFile(file);
    };

    const handleDownload = (fileName, fileUrl) => {
        // TODO: Implement download tracking with email notification
        console.log('Download tracked:', fileName);
        // This will require a serverless function to send email notifications
    };

    return (
        <section className="supp-section">
            <div className="container">
                <div className="supp-header" onClick={() => setExpanded(!expanded)}>
                    <span className="section-subtitle">Additional Portfolio</span>
                    <h2 style={{ display: 'inline-block', marginRight: '20px' }}>Supplementary Work</h2>
                    <i className={`fas fa-chevron-down`} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '0.3s' }}></i>
                    <p>Click to view 22 additional design samples and documentation.</p>
                </div>
                <div className="supp-grid" style={{
                    maxHeight: expanded ? '5000px' : '0',
                    opacity: expanded ? 1 : 0,
                    marginTop: expanded ? '60px' : '0',
                    overflow: 'hidden',
                    transition: '0.8s ease'
                }}>
                    {items.map((item, i) => (
                        <div
                            className="supp-card clickable"
                            key={i}
                            onClick={() => handleFileClick(item)}
                        >
                            <DriveFile name={item.name} alt={item.title} type="auto" />
                            <div className="supp-overlay">
                                <i className="fas fa-search-plus"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* File Viewer Modal */}
            {viewerFile && (
                <FileViewer
                    file={viewerFile}
                    onClose={() => setViewerFile(null)}
                    onDownload={handleDownload}
                />
            )}
        </section>
    );
};

export const Footer = () => (
    <footer>
        <div className="container">
            <h2>Let's Engineer the Future.</h2>
            <p style={{ color: '#FDFCF8', opacity: 0.8, margin: '20px auto' }}>Open for opportunities in Mechanical Design, EV Systems, and Advanced Manufacturing across Automotive and Defence sectors.</p>
            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '50px' }}>© 2026 Siddhartha Chaturvedi. All Rights Reserved.</div>
        </div>
    </footer>
);
