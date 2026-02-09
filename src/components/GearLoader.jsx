import React from 'react';
import './GearLoader.css';

/**
 * Planetary Gear Loading Animation
 * Features a central sun gear with orbiting planet gears that mesh together
 * Perfect for engineering/mechanical portfolio
 */
const GearLoader = ({ size = 80, message = "Loading..." }) => {
    return (
        <div className="gear-loader-container">
            <div className="gear-system" style={{ width: size, height: size }}>
                {/* Sun gear (center) */}
                <div className="sun-gear">
                    <svg viewBox="0 0 100 100" className="gear">
                        <circle cx="50" cy="50" r="30" fill="var(--matcha-main)" />
                        {/* Gear teeth */}
                        {[...Array(8)].map((_, i) => {
                            const angle = (i * 360) / 8;
                            return (
                                <rect
                                    key={i}
                                    x="46"
                                    y="18"
                                    width="8"
                                    height="8"
                                    fill="var(--matcha-main)"
                                    transform={`rotate(${angle} 50 50)`}
                                />
                            );
                        })}
                        <circle cx="50" cy="50" r="12" fill="#1a1a1a" />
                    </svg>
                </div>

                {/* Planet gears (3 orbiting gears) */}
                {[0, 120, 240].map((angle, index) => (
                    <div
                        key={index}
                        className="planet-orbit"
                        style={{
                            transform: `rotate(${angle}deg)`
                        }}
                    >
                        <div className="planet-gear">
                            <svg viewBox="0 0 100 100" className="gear">
                                <circle cx="50" cy="50" r="20" fill="var(--matcha-lighter)" />
                                {/* Gear teeth */}
                                {[...Array(6)].map((_, i) => {
                                    const toothAngle = (i * 360) / 6;
                                    return (
                                        <rect
                                            key={i}
                                            x="46"
                                            y="28"
                                            width="8"
                                            height="6"
                                            fill="var(--matcha-lighter)"
                                            transform={`rotate(${toothAngle} 50 50)`}
                                        />
                                    );
                                })}
                                <circle cx="50" cy="50" r="8" fill="#1a1a1a" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
            {message && <p className="gear-loader-message">{message}</p>}
        </div>
    );
};

export default GearLoader;
