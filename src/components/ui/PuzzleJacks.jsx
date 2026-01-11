import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const jacks = [
    { color: 'lavender', size: 100, top: '20%', left: '15%', delay: 0 },
    { color: 'sky', size: 80, top: '60%', left: '10%', delay: 0.5 },
    { color: 'peach', size: 120, top: '30%', left: '75%', delay: 1 },
    { color: 'sage', size: 90, top: '70%', left: '65%', delay: 1.5 },
    { color: 'beige', size: 140, top: '45%', left: '45%', delay: 2 },
];

export default function PuzzleJacks() {
    return (
        <div className="absolute inset-0 pointer-events-none z-[15] overflow-hidden">
            {jacks.map((jack, i) => (
                <JackPiece key={i} config={jack} />
            ))}
        </div>
    );
}

function JackPiece({ config }) {
    const jackRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const jack = jackRef.current;

            // Idle floating
            gsap.to(jack, {
                y: '+=20',
                rotate: '+=15',
                duration: 3 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: config.delay
            });

            const onMouseEnter = () => {
                gsap.to(jack, {
                    x: 'random(-50, 50)',
                    y: 'random(-50, 50)',
                    rotateX: '+=180',
                    rotateY: '+=180',
                    scale: 1.2,
                    duration: 0.8,
                    ease: 'expo.out'
                });
            };

            const onMouseLeave = () => {
                gsap.to(jack, {
                    scale: 1,
                    duration: 1.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            };

            jack.addEventListener('mouseenter', onMouseEnter);
            jack.addEventListener('mouseleave', onMouseLeave);
        }, jackRef);

        return () => ctx.revert();
    }, [config.delay]);

    const barClass = `absolute bg-current rounded-full`;

    return (
        <div
            ref={jackRef}
            style={{
                top: config.top,
                left: config.left,
                width: config.size,
                height: config.size,
                perspective: '1000px',
                transformStyle: 'preserve-3d'
            }}
            className={`absolute pointer-events-auto cursor-pointer flex items-center justify-center text-${config.config?.color || config.color} opacity-80`}
        >
            {/* The "Jack" Shape (3 intersecting bars) */}
            <div className="relative w-full h-full flex items-center justify-center transform-gpu">
                {/* Horizontal Bar */}
                <div
                    className={barClass}
                    style={{ width: '100%', height: '20%', transform: 'rotateY(0deg)' }}
                />
                {/* Vertical Bar */}
                <div
                    className={barClass}
                    style={{ width: '20%', height: '100%', transform: 'rotateX(0deg)' }}
                />
                {/* Depth Bar (Diagonal look in 2D) */}
                <div
                    className={barClass}
                    style={{ width: '20%', height: '100%', transform: 'rotateZ(45deg)' }}
                />

                {/* Center dot for depth feel */}
                <div className="absolute w-1/4 h-1/4 bg-white/30 rounded-full blur-sm" />
            </div>
        </div>
    );
}
