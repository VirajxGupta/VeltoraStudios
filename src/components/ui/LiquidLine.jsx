import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LiquidLine() {
    const svgRef = useRef(null);
    const pathRef = useRef(null);
    const filterRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const path = pathRef.current;
            const filter = filterRef.current;

            // 1. Initial State: Hidden
            gsap.set(svgRef.current, { opacity: 0, xPercent: -10 });

            // 2. Scroll Direction Listener
            ScrollTrigger.create({
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => {
                    // direction: 1 = down, -1 = up
                    if (self.direction === 1 && self.progress > 0.05) {
                        // Scrolling Down -> Show
                        gsap.to(svgRef.current, {
                            opacity: 1,
                            xPercent: 0,
                            duration: 1.5,
                            ease: "power3.out",
                            overwrite: 'auto'
                        });
                    } else if (self.direction === -1) {
                        // Scrolling Up -> Hide
                        gsap.to(svgRef.current, {
                            opacity: 0,
                            xPercent: 10,
                            duration: 1,
                            ease: "power3.in",
                            overwrite: 'auto'
                        });
                    }
                }
            });

            // 3. Global Mouse Turbulence
            // We'll map mouse velocity to the turbulence frequency/scale
            let lastX = 0;
            let lastY = 0;
            let timeout;

            const handleMouseMove = (e) => {
                const velX = Math.abs(e.clientX - lastX);
                const velY = Math.abs(e.clientY - lastY);
                const velocity = Math.min(velX + velY, 200); // Cap velocity

                // Map velocity to turbulence
                // baseFrequency: higher = more noise. 
                // scale: higher = more displacement.

                const targetFreq = 0.01 + (velocity * 0.0005);
                const targetScale = 20 + (velocity * 0.5);

                gsap.to(filter, {
                    attr: { baseFrequency: `${targetFreq} 0.01`, scale: targetScale },
                    duration: 0.5,
                    ease: "power2.out"
                });

                lastX = e.clientX;
                lastY = e.clientY;

                // Reset to calm
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    gsap.to(filter, {
                        attr: { baseFrequency: "0.01 0.005", scale: 5 },
                        duration: 2,
                        ease: "sine.inOut"
                    });
                }, 100);
            };

            window.addEventListener('mousemove', handleMouseMove);

            // Continuous "Aliveness" flow even without mouse
            gsap.to(path, {
                strokeDashoffset: -1000,
                duration: 60,
                ease: 'none',
                repeat: -1
            });

        }, svgRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[30] mix-blend-multiply opacity-80">
            <svg
                ref={svgRef}
                className="w-full h-full"
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <filter id="liquid-filter">
                        <feTurbulence
                            ref={filterRef}
                            type="fractalNoise"
                            baseFrequency="0.01 0.005"
                            numOctaves="2"
                            result="warp"
                        />
                        <feDisplacementMap
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale="30"
                            in="SourceGraphic"
                            in2="warp"
                        />
                    </filter>

                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo */}
                        <stop offset="50%" stopColor="#818CF8" /> {/* Soft Indigo */}
                        <stop offset="100%" stopColor="#C7D2FE" /> {/* Lavender */}
                    </linearGradient>
                </defs>

                {/* Main 3D-like Curve */}
                <path
                    ref={pathRef}
                    d="M-200,800 C100,600 300,900 600,500 S1000,800 1600,100"
                    fill="none"
                    stroke="url(#line-gradient)"
                    strokeWidth="80"
                    strokeLinecap="round"
                    filter="url(#liquid-filter)"
                    style={{ strokeDasharray: '2000 2000' }}
                />
            </svg>
        </div>
    );
}
