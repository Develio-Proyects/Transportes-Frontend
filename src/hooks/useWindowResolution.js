import { useState, useEffect } from 'react';

export const useWindowResolution = () => {
    const [resolution, setResolution] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setResolution(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);

    return resolution;
}