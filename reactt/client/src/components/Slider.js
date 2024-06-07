import React, { useState } from 'react';
import './Sliderr.css';

const Slider = () => {
    const [startValue, setStartValue] = useState(0);
    const [endValue, setEndValue] = useState(100);

    const handleStartChange = (value) => {
        setStartValue(value);
    };

    const handleEndChange = (value) => {
        setEndValue(value);
    };

    const handleMouseDown = (handle, value) => (e) => {
        if (handle === 'start') {
            document.addEventListener('mousemove', () => {
                handleStartChange(Math.max(0, Math.min(100, e.clientX / document.body.clientWidth * 100)));
            });
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', null);
            });
        } else if (handle === 'end') {
            document.addEventListener('mousemove', () => {
                handleEndChange(Math.max(0, Math.min(100, e.clientX / document.body.clientWidth * 100)));
            });
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', null);
            });
        }
    };

    return (
        <div className="slider-container">
            <div
                className="slider"
                style={{
                    width: '100%',
                    height: '20px',
                    backgroundColor: 'lightgray',
                    borderRadius: '5px',
                    position: 'relative',
                }}
            >
                <div
                    className="handle"
                    style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'black',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '50%',
                        left: `${startValue}%`,
                        transform: `translateY(-50%)`,
                        cursor: 'pointer',
                    }}
                    onMouseDown={handleMouseDown('start', startValue)}
                >
                    Start
                </div>
                <div
                    className="handle"
                    style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: 'black',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '50%',
                        right: '0',
                        transform: `translateY(-50%) ${endValue}%`,
                        cursor: 'pointer',
                    }}
                    onMouseDown={handleMouseDown('end', endValue)}
                >
                    End
                </div>
            </div>
        </div>
    );
};

export default Slider;