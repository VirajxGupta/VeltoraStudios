import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingFlow from '../ui/FloatingFlow';
import PuzzleJacks from '../ui/PuzzleJacks';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo('.hero-text-line span',
                { y: 100, rotate: 5, opacity: 0 },
                { y: 0, rotate: 0, opacity: 1, duration: 1.5, ease: 'expo.out', stagger: 0.1 }
            )
                .fromTo('.hero-sub',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                    "-=0.5"
                );

            // Brutal Text Skew on Scroll
            gsap.to('.hero-text-line', {
                skewX: -5,
                xPercent: -5,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });



            // Subtle background element floating
            gsap.to('.hero-blob', {
                x: 'random(-50, 50)',
                y: 'random(-50, 50)',
                duration: 'random(5, 10)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col justify-center px-8 md:px-24 overflow-hidden">
            <FloatingFlow />
            <PuzzleJacks />
            {/* Soft Background Blobs */}
            <div className="hero-blob absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-lavender/30 blur-[120px] rounded-full -z-10" />
            <div className="hero-blob absolute bottom-[10%] left-[5%] w-[35vw] h-[35vw] bg-peach/20 blur-[100px] rounded-full -z-10" />

            <div className="max-w-[1200px]">
                <h1 ref={textRef} className="text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter text-premium-text">
                    <div className="hero-text-line overflow-hidden"><span className="block">WE_BUILD</span></div>
                    <div className="hero-text-line overflow-hidden ml-[5vw]"><span className="block italic text-premium-accent/40">VELTORA</span></div>
                    <div className="hero-text-line overflow-hidden"><span className="block">EXPERIENCES.</span></div>
                </h1>

                <div className="hero-sub mt-12 flex flex-col md:flex-row md:items-end gap-8">
                    <p className="text-xl md:text-2xl text-premium-text/60 font-body max-w-md leading-tight lowercase">
                        [A digital studio by Gen-Z, for the internet-native world. We turn complexity into calm.]
                    </p>

                    <div className="flex items-center gap-4 group interactive">
                        <div className="w-12 h-[1px] bg-premium-text/20 group-hover:w-20 transition-all duration-500" />
                        <span className="text-xs font-mono uppercase tracking-[0.3em]">Scroll to start</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
