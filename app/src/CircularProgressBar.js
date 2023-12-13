import React, { useState, useEffect } from 'react';
import Starfield from './Starfield';

const CircularProgressBar = ({ onComplete, visible }) => {
    const [progress, setProgress] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const [progressComplete, setProgressComplete] = useState(false);
    let interval;

    const texts = [
        <h1 key={1}>HI</h1>,
        <h1 key={2}>We are an integrated creative agency</h1>,
        <h1 key={3}>since 2010</h1>,
        <h1 key={4}>transforming & growing with our clients</h1>,
    ];

    useEffect(() => {
        if (visible && progress < 360) {
            interval = setInterval(() => {
                setProgress((prevProgress) => prevProgress + 10);
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [visible, progress]);

    useEffect(() => {
        const progressPercentage = (progress / 360) * 100;

        let index = 0;
        if (progressPercentage < 25) {
            index = 0;
        } else if (progressPercentage < 50) {
            index = 1;
        } else if (progressPercentage < 75) {
            index = 2;
        } else {
            index = 3;
        }

        setTextIndex(index);

        if (progressPercentage >= 100 && !progressComplete) {
            setProgressComplete(true);
            clearInterval(interval);


            if (typeof onComplete === 'function') {
                onComplete();
            }
        }
    }, [progress, progressComplete, onComplete]);

    const strokeWidth = 5;
    const radius = 200;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = (circumference - (progress / 360) * circumference) % circumference;

    return (
        <div>
            {visible && !progressComplete && (
                <div style={{ position: 'relative', height: '580px', zIndex: -1, backgroundColor: 'black' }}>
                    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <div style={{ position: 'relative', width: `${2 * radius + strokeWidth}px`, height: `${2 * radius + strokeWidth}px` }}>
                            <svg width={2 * radius + strokeWidth} height={2 * radius + strokeWidth}>
                                {/* Grey track line */}
                                <circle
                                    cx={radius + strokeWidth / 2}
                                    cy={radius + strokeWidth / 2}
                                    r={radius}
                                    fill="none"
                                    stroke="#ccc"
                                    opacity="0.2"
                                    strokeWidth={strokeWidth}
                                />

                                {/* White progress line */}
                                <circle
                                    cx={radius + strokeWidth / 2}
                                    cy={radius + strokeWidth / 2}
                                    r={radius}
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth={strokeWidth}
                                    strokeDasharray={circumference}
                                    strokeDashoffset={progressOffset}
                                    strokeLinecap="round"
                                />
                            </svg>

                            {/* Text in the middle */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: '#fff',
                                    textAlign: 'center',
                                    fontSize: '50px',
                                }}
                            >
                                {texts[textIndex]}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {progressComplete && <Starfield />}
        </div>
    );
};

export default CircularProgressBar;

