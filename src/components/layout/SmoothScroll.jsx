import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
    useEffect(() => {
        // Refresh ScrollTrigger after a slight delay to ensure React has rendered
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        function update(time) {
            ScrollTrigger.update();
        }

        gsap.ticker.add(update);

        return () => {
            clearTimeout(timer);
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis root options={{
            duration: 1.5,
            lerp: 0.1,
            smoothWheel: true,
            wheelMultiplier: 1,
            infinite: false,
        }}>
            {children}
        </ReactLenis>
    );
}
