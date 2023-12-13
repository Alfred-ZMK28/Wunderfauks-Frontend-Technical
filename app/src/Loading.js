import React, { useEffect, useState } from 'react';
import './Loading.css';

const Loading = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const finishLoading = () => {
            setLoading(false);
        };


        const timeout = setTimeout(finishLoading, 3000);


        return () => clearTimeout(timeout);
    }, []);

    return loading ? (
        <div className="loading-overlay">
            <div className="loading-line">
            </div>
        </div>
    ) : null;
};

export default Loading;
