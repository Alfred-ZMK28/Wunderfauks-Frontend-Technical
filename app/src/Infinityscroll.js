import React, { useRef, useEffect } from 'react';

const InfinityScroll = ({ onScroll, children }) => {
    const containerRef = useRef();

    const handleScroll = () => {
        const container = containerRef.current;

        if (container) {
            const isAtBottom = container.scrollTop + container.clientHeight === container.scrollHeight;

            if (isAtBottom && typeof onScroll === 'function') {
                onScroll();
            }
        }
    };

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            container.addEventListener('scroll', handleScroll);

            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <div ref={containerRef} style={{ overflowY: 'auto', maxHeight: '100vh' }}>
            {children}
        </div>
    );
};

export default InfinityScroll;
