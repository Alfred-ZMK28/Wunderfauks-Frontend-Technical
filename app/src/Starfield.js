import React, { useEffect, useState, useRef } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { FaAngleDown } from 'react-icons/fa';

const Starfield = () => {
    const [init, setInit] = useState(false);
    const particlesRef = useRef();


    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });

        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const particlesInstance = particlesRef.current;

            if (particlesInstance) {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const deltaX = clientX - centerX;
                const deltaY = centerY - clientY;


                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);


                particlesInstance.canvas.draw.context.translate(centerX, centerY);
                particlesInstance.canvas.draw.context.rotate((angle + 90) * (Math.PI / 180)); // Change here
                particlesInstance.canvas.draw.context.translate(-centerX, -centerY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const scrollToGrid = () => {
        const gridElement = document.getElementById('grid');
        if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{ position: 'relative', height: '580px', zIndex: -1 }}>
            <Particles
                ref={particlesRef}
                options={{
                    background: {
                        color: {
                            value: '#242323',
                        },
                    },
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: '#ffffff',
                        },
                        move: {
                            enable: true,
                            speed: 2,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                            value: 150,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: 'circle',
                        },
                        size: {
                            random: true,
                            value: 2,
                        },
                    },
                    detectRetina: true,
                }}
            />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <h1 style={{ color: 'white', fontSize: '5em', margin: 0 }}>CHANGE IS THE ONLY CONSTANT</h1>
            </div>
            <button
                onClick={scrollToGrid}
                style={{
                    position: 'absolute',
                    color: 'white',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <span>Work</span>
                <FaAngleDown />
            </button>
        </div>
    );
};

export default Starfield;
