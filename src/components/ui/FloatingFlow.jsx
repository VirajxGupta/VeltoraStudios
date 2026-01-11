import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const shapes = [
    { color: 'lavender', size: 'w-24 h-24', top: '2%', left: '2%', radius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
    { color: 'peach', size: 'w-32 h-32', top: '5%', left: '90%', radius: '60% 40% 30% 70% / 50% 60% 40% 50%' },
    { color: 'sky', size: 'w-20 h-20', top: '85%', left: '90%', radius: '30% 70% 60% 40% / 60% 40% 50% 40%' },
    { color: 'sage', size: 'w-28 h-28', top: '80%', left: '5%', radius: '50% 50% 20% 80% / 40% 30% 70% 60%' },
    { color: 'beige', size: 'w-48 h-48', top: '45%', left: '95%', radius: '70% 30% 50% 50% / 30% 70% 40% 60%' },
];

export default function FloatingFlow() {
    return (
        <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
            {shapes.map((shape, i) => (
                <FlowObject key={i} shape={shape} />
            ))}
        </div>
    );
}

function FlowObject({ shape }) {
    const elRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const el = elRef.current;

            // 1. Initial Flow (Autonomous motion)
            const tl = gsap.timeline({ repeat: -1, yoyo: true });

            tl.to(el, {
                x: 'random(-40, 40)',
                y: 'random(-40, 40)',
                rotate: 'random(-45, 45)',
                borderRadius: '50%',
                duration: 'random(5, 8)',
                ease: 'sine.inOut'
            });

            const handleMouseEnter = () => {
                tl.pause();
                gsap.to(el, {
                    scale: 1.8,
                    rotate: 0,
                    borderRadius: shape.radius,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    filter: 'blur(2px)',
                    opacity: 0.9,
                    duration: 0.8,
                    ease: 'expo.out'
                });
            };

            const handleMouseLeave = () => {
                gsap.to(el, {
                    scale: 1,
                    borderRadius: '50%',
                    backgroundColor: '',
                    filter: 'blur(30px)',
                    opacity: 0.4,
                    duration: 1.2,
                    ease: 'power2.inOut',
                    onComplete: () => tl.play()
                });
            };

            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        }, elRef);

        return () => ctx.revert();
    }, [shape.radius]);

    return (
        <div
            ref={elRef}
            style={{
                top: shape.top,
                left: shape.left,
                borderRadius: '50%'
            }}
            className={`absolute pointer-events-auto cursor-pointer blur-[30px] opacity-40 bg-${shape.color} ${shape.size} transition-shadow duration-700 hover:shadow-[0_0_80px_rgba(255,255,255,0.6)] hover:opacity-100 hover:blur-[0px]`}
        />
    );
}
