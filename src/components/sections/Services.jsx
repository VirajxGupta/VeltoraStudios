import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, Cpu, Globe, Zap } from 'lucide-react';
import FlipCard from "../ui/FlipCard";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: 'Brand Systems',
        desc: 'Creating visual languages that breathe.',
        icon: Palette,
        color: 'lavender'
    },
    {
        title: 'Product Engineering',
        desc: 'Applications built with architectural calm.',
        icon: Cpu,
        color: 'sky'
    },
    {
        title: 'Digital Worlds',
        desc: 'Immersive 3D environments.',
        icon: Globe,
        color: 'peach'
    },
    {
        title: 'Motion Design',
        desc: 'Fluid interactions that speak.',
        icon: Zap,
        color: 'beige'
    }
];

export default function Services() {
    const container = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const cards = cardRefs.current;
            const totalScrollHeight = window.innerHeight * 3;
            const positions = [14, 38, 62, 86];
            const rotations = [15, -7.5, 7.5, -15];

            // Pin the entire section
            ScrollTrigger.create({
                trigger: container.current.querySelector(".cards-section"),
                start: "top top",
                end: () => `+=${totalScrollHeight}`,
                pin: true,
                pinSpacing: true,
                scrub: true,
            });

            // 1. Spread Cards Animation
            cards.forEach((card, index) => {
                gsap.to(card, {
                    left: `${positions[index]}%`,
                    rotation: rotations[index],
                    ease: "none",
                    scrollTrigger: {
                        trigger: container.current.querySelector(".cards-section"),
                        start: "top top",
                        end: () => `+=${window.innerHeight}`, // Spread over 1st screen height
                        scrub: 0.5,
                    }
                });
            });

            // 1.5 Continuous Floating Effect (NEW)
            cards.forEach((card) => {
                const wrapper = card.querySelector('.card-wrapper');
                const floatDuration = 3 + Math.random() * 2; // Random 3-5s
                const floatY = 20 + Math.random() * 20;      // Increased: Random 20-40px

                gsap.to(wrapper, {
                    y: -floatY,
                    rotation: Math.random() * 4 - 2, // Increased: -2 to +2 deg
                    duration: floatDuration,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: Math.random() * 2
                });
            });

            // 2. Flip Cards Animation
            cards.forEach((card, index) => {
                const frontEl = card.querySelector(".flip-card-front");
                const backEl = card.querySelector(".flip-card-back");

                // Stagger the flips slightly
                const staggerOffset = index * 0.05;
                const startOffset = 0.35 + staggerOffset; // Start flipping after spread
                const endOffset = 0.65 + staggerOffset;

                ScrollTrigger.create({
                    trigger: container.current.querySelector(".cards-section"),
                    start: "top top",
                    end: () => `+=${totalScrollHeight}`,
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;

                        // Only animate during the specific window for this card
                        if (progress >= startOffset && progress <= endOffset) {
                            const animProgress = (progress - startOffset) / (endOffset - startOffset);

                            const frontRotation = -180 * animProgress;
                            const backRotation = 180 - (180 * animProgress);
                            const targetRotation = rotations[index] * (1 - animProgress); // Straighten card

                            gsap.to(frontEl, { rotateY: frontRotation, overwrite: 'auto', ease: "power1.out" });
                            gsap.to(backEl, { rotateY: backRotation, overwrite: 'auto', ease: "power1.out" });
                            gsap.to(card, {
                                rotate: targetRotation,
                                overwrite: 'auto',
                                ease: "power1.out"
                            });
                        } else if (progress < startOffset) {
                            // Reset to initial state if scrolled back up
                            gsap.to(frontEl, { rotateY: 0, overwrite: 'auto' });
                            gsap.to(backEl, { rotateY: 180, overwrite: 'auto' });
                            gsap.to(card, { rotate: rotations[index], overwrite: 'auto' });
                        } else if (progress > endOffset) {
                            // Ensure final state
                            gsap.to(frontEl, { rotateY: -180, overwrite: 'auto' });
                            gsap.to(backEl, { rotateY: 0, overwrite: 'auto' });
                            gsap.to(card, { rotate: 0, overwrite: 'auto' });
                        }
                    }
                });
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="relative z-10 bg-premium-bg">
            {/* Cards Section Container */}
            <div className="cards-section h-screen w-full relative overflow-hidden flex flex-col items-center justify-center">

                {/* Header Text - Fades out as cards take over */}
                <div className="absolute top-[10%] text-center z-0">
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-premium-text/40">Capabilities // 02</span>
                    <h2 className="text-5xl md:text-7xl font-black text-premium-text tracking-tighter uppercase mt-4">
                        Our Quiet <span className="italic text-premium-accent/30">Expertise.</span>
                    </h2>
                    <p className="mt-4 text-sm text-premium-text/40 font-body lowercase tracking-widest">
                        keep scrolling to reveal
                    </p>
                </div>

                {/* The Cards */}
                {services.map((service, index) => (
                    <FlipCard
                        key={index}
                        ref={(el) => (cardRefs.current[index] = el)}
                        id={`card-${index + 1}`}
                        frontSrc="/card-pattern2.jpg" // Using the uploaded/copied asset
                        frontAlt="Abstract Pattern"
                        color={service.color}
                        backContent={
                            <div className="space-y-6">
                                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center bg-${service.color}/10 border border-${service.color}/30 text-premium-text/80 shadow-sm`}>
                                    <service.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-black text-premium-text uppercase tracking-tighter leading-none">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-premium-text/50 font-body lowercase leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        }
                    />
                ))}

            </div>

            {/* Spacing after section for clean scroll exit */}
            <div className="h-[20vh]" />
        </div>
    );
}
