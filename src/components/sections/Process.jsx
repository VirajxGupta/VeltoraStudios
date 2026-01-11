import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: '01',
        title: 'Inquiry',
        desc: 'we listen to the whispers of your idea and find its gravitational center.',
        color: 'lavender'
    },
    {
        id: '02',
        title: 'Architecture',
        desc: 'designing a silent skeleton that supports immersive experiences.',
        color: 'sky'
    },
    {
        id: '03',
        title: 'Formation',
        desc: 'bringing pixels to life with fluid motion and organic easing.',
        color: 'peach'
    },
    {
        id: '04',
        title: 'Release',
        desc: 'the project enters the world, calm, collected, and ready to breathe.',
        color: 'beige'
    }
];

export default function Process() {
    const triggerRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const totalWidth = containerRef.current.scrollWidth - window.innerWidth;

            gsap.to(containerRef.current, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    start: 'top top',
                    end: () => `+=${containerRef.current.scrollWidth}`,
                    invalidateOnRefresh: true,
                }
            });

            // Brutal card squeeze on horizontal scroll
            gsap.fromTo('.process-card',
                { scale: 0.9, rotate: 2 },
                {
                    scale: 1,
                    rotate: 0,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: 'top top',
                        end: () => `+=${containerRef.current.scrollWidth}`,
                        scrub: true
                    }
                }
            );
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={triggerRef} className="overflow-hidden bg-[#F2F1EC]">
            <div
                ref={containerRef}
                className="flex h-screen items-center px-8 md:px-24 gap-32 w-fit"
            >
                <div className="flex-shrink-0 w-[400px]">
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-premium-text/40">Workflow // 03</span>
                    <h2 className="text-7xl font-black text-premium-text tracking-tighter uppercase mt-4">
                        How we <br />
                        <span className="italic text-premium-accent/30">Move.</span>
                    </h2>
                </div>

                {steps.map((step, i) => (
                    <div
                        key={i}
                        className="process-card flex-shrink-0 w-[500px] h-[500px] glass-card p-16 flex flex-col justify-between rounded-[3.5rem] relative group"
                    >
                        <div className={`absolute -top-10 -right-10 w-40 h-40 bg-${step.color}/20 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-1000`} />

                        <span className="text-6xl font-black text-premium-accent/10 font-display">
                            {step.id}
                        </span>

                        <div className="space-y-6">
                            <h4 className="text-4xl font-black text-premium-text uppercase tracking-tight">
                                {step.title}
                            </h4>
                            <p className="text-xl text-premium-text/50 font-body lowercase leading-relaxed">
                                {step.desc}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-1 bg-${step.color} rounded-full`} />
                            <div className="h-[2px] flex-1 bg-premium-text/5" />
                        </div>
                    </div>
                ))}

                {/* Final spacer/exit hint */}
                <div className="flex-shrink-0 w-[200px] h-[1px]" />
            </div>
        </div>
    );
}
