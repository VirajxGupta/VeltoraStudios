import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SoftCursor() {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const onMouseMove = (e) => {
            const { clientX, clientY, target } = e;

            // Small precise point
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: 'power2.out'
            });

            // Larger liquid follower
            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.6,
                ease: 'power3.out'
            });

            // Interaction detection
            const isHovering = target.closest('button, a, .interactive');
            if (isHovering) {
                gsap.to(follower, {
                    scale: 2.5,
                    backgroundColor: 'rgba(230, 230, 250, 0.3)', // Lavender tint
                    borderWidth: '0px',
                    duration: 0.4
                });
            } else {
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderWidth: '1px',
                    duration: 0.4
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-premium-text rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 border border-premium-text/20 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
            />
        </>
    );
}
