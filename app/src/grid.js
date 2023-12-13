import React from 'react';
import { useNavigate } from 'react-router-dom';

const Grid = ({ data }) => {
    const navigate = useNavigate();

    const handleImageClick = (id) => {
        navigate(`/details/${id}`);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0' }} id="grid">
            {data.map((item, index) => (
                <div
                    key={item.id}
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '0px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.querySelector('.text-overlay').style.opacity = 1;
                        e.currentTarget.querySelector('.image-overlay').style.opacity = 0.8; // Adjust opacity as needed
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.querySelector('.text-overlay').style.opacity = 0;
                        e.currentTarget.querySelector('.image-overlay').style.opacity = 0;
                    }}
                    onClick={() => handleImageClick(item.id)}
                >
                    <img
                        src={item.acf.image.url}
                        alt={item.acf.image.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            transition: 'transform 0.3s ease',
                        }}
                    />
                    <div
                        className="text-overlay"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            color: '#fff',
                            width: '90%',
                            maxWidth: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            zIndex: 1,
                        }}
                    >
                        <h2 style={{ color: 'white', fontSize: '40px', margin: '0', zIndex: 2 }}>{item.acf.client}</h2>
                        <p style={{ color: '#ccc', fontSize: '15px', fontWeight: 'bold', margin: '0', opacity: 0.5, zIndex: 1 }}>{item.acf.work_category}</p>
                        <span style={{ color: 'white', fontSize: '300px', position: 'absolute', top: '50%', left: '50%', opacity: 0.1, transform: 'translate(-50%, -50%)', zIndex: 0 }}>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                    </div>
                    <div
                        className="image-overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.8)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    ></div>
                </div>
            ))}
        </div>
    );
};

export default Grid;
