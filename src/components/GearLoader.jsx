import React from 'react';
import './GearLoader.css';

/**
 * Planetary Gear Loading Animation
 * Features a complete planetary gear system:
 * - 1 Central sun gear (rotating clockwise)
 * - 3 Planet gears orbiting the sun
 * - 1 Ring gear (internal gear) surrounding all (rotating counter-clockwise)
 * Perfect for engineering/mechanical portfolio
 */
const GearLoader = ({ size = 80, message = "Loading..." }) => {
    return (
        <div className="gear-loader-container">
            <div className="gear-system" style={{ width: size, height: size }}>
                {/* Ring gear (outermost - internal gear with inward teeth) */}
                <div className="ring-gear">
                    <svg viewBox="0 0 100 100" className="gear">
                        {/* Outer circle */}
                        <circle cx="50" cy="50" r="48" fill="none" stroke="var(--matcha-dark)" strokeWidth="3" />
                        {/* Inner circle */}
                        <circle cx="50" cy="50" r="42" fill="transparent" />
                        {/* Inward-facing teeth (12 teeth) */}
                        {[...Array(12)].map((_, i) => {
                            const angle = (i * 360) / 12;
                            return (
                                <rect
                                    key={i}
                                    x="47"
                                    y="42"
                                    width="6"
                                    height="8"
                                    fill="var(--matcha-dark)"
                                    transform={`rotate(${angle} 50 50)`}
                                />
                            );
                        })}
                    </svg>
                </div>

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
