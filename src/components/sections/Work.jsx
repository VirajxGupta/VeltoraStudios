import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'Ticket Gen System',
        category: 'Development / 2025',
        img: '/ticket-gen-system.png',
        link: 'https://ticket-generation-system-pv6k.vercel.app/',
        description: 'robust ticket generation system built for scale, featuring automated workflows and real-time processing.'
    },
    {
        title: 'Internship Recommender System',
        category: 'AI Platform / 2025',
        img: '/pm-ai-platform.png',
        link: 'https://pm-ai-internship-scheme-platform.onrender.com/',
        description: 'intelligent recommendation engine for product management internships, utilizing advanced matching algorithms.'
    },
    {
        title: 'Legacy Portfolio',
        category: 'Design / 2024',
        img: '/portfolio.png',
        link: 'https://portfolio-gray-nu-jlx9n13pmd.vercel.app/#',
        description: 'experimental UI design exploring calm motion principles and architectural clarity in digital spaces.'
    }
];

export default function Work() {
    const itemsRef = useRef([]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            itemsRef.current.forEach((item) => {
                const img = item.querySelector('.project-img');
                const text = item.querySelector('.project-text');

                // Parallax Effect (Existing)
                gsap.fromTo(img,
                    { scale: 1.3, clipPath: 'inset(15% 15% 15% 15%)', yPercent: 20 },
                    {
                        scale: 1,
                        clipPath: 'inset(0% 0% 0% 0%)',
                        yPercent: -20,
                        duration: 1.5,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                );

                // CONTINUOUS FLOATING EFFECT (NEW) 
                // We animate the container itself to float efficiently
                const floatDuration = 3 + Math.random() * 2; // Random between 3-5s
                const floatY = 10 + Math.random() * 10;      // Random movement 10-20px

                gsap.to(item.querySelector('.project-img-container'), {
                    y: -floatY,
                    rotation: Math.random() * 2 - 1, // Slight drift rotation
                    duration: floatDuration,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: Math.random() * 2 // Random start delay
                });

                // Scroll Text Reveal (Existing)
                gsap.to(text, {
                    skewX: -5,
                    xPercent: -5,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });

                gsap.fromTo(text,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 70%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-32 md:py-60 px-8 md:px-24 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-24 flex items-center gap-6">
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-premium-text/40">Portfolio // 04</span>
                    <div className="h-[1px] flex-1 bg-premium-text/5" />
                </div>

                <div className="space-y-40 md:space-y-60">
                    {projects.map((item, i) => (
                        <div
                            key={i}
                            ref={(el) => (itemsRef.current[i] = el)}
                            className="group relative"
                        >
                            <div className="flex flex-col md:flex-row gap-12 items-end">
                                <div className="project-img-container relative flex-1 aspect-[16/10] overflow-hidden rounded-[3rem] glass-card p-2">
                                    <div className="relative w-full h-full overflow-hidden rounded-[2.8rem]">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="project-img w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="project-text md:w-[400px] space-y-8 pb-12">
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-mono opacity-40 uppercase tracking-widest">{item.category}</span>
                                    </div>
                                    <h3 className="text-6xl font-black text-premium-text uppercase tracking-tighter leading-none group-hover:italic transition-all duration-700">
                                        {item.title}
                                    </h3>
                                    <p className="text-lg text-premium-text/40 font-body lowercase leading-relaxed">
                                        {item.description}
                                    </p>
                                    <a
                                        href={item.link}
                                        target={item.link !== '#' ? "_blank" : undefined}
                                        rel={item.link !== '#' ? "noopener noreferrer" : undefined}
                                        className="flex items-center gap-4 interactive group/link cursor-pointer inline-flex"
                                    >
                                        <div className="w-10 h-10 rounded-full border border-premium-text/10 flex items-center justify-center group-hover/link:bg-premium-text group-hover/link:text-premium-bg transition-all">
                                            <span className="rotate-[-45deg] group-hover/link:rotate-0 transition-transform">→</span>
                                        </div>
                                        <span className="text-xs font-mono uppercase tracking-widest opacity-40 group-hover/link:opacity-100">Live</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
