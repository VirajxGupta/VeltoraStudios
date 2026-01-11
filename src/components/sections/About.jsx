import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const paragraphs = sectionRef.current.querySelectorAll('.reveal-p');

            paragraphs.forEach((p) => {
                gsap.fromTo(p,
                    {
                        y: 40,
                        opacity: 0,
                        filter: 'blur(10px)'
                    },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: p,
                            start: 'top 95%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                );

                // Brutal skew side-effect
                gsap.to(p, {
                    skewX: -3,
                    scrollTrigger: {
                        trigger: p,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });

            // Parallax image...
            gsap.fromTo('.about-image',
                { yPercent: 10 },
                {
                    yPercent: -10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.about-image',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 md:py-60 px-8 md:px-24 bg-beige/30">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

                <div className="space-y-12 md:space-y-20">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-premium-text/40">Philosophy // 01</span>
                    </div>

                    <div className="space-y-8">
                        <p className="reveal-p text-3xl md:text-5xl font-black text-premium-text leading-tight uppercase tracking-tighter">
                            We live at the edge of <span className="text-premium-accent/20">culture</span> and <br />
                            <span className="underline decoration-lavender underline-offset-8">technology</span>.
                        </p>
                        <p className="reveal-p text-xl md:text-2xl text-premium-text/50 font-body lowercase leading-relaxed">
                            the internet is tired of boring grids. users are seeking emotion, fluidity, and a sense of "place". we create that place.
                        </p>
                        <p className="reveal-p text-xl md:text-2xl text-premium-text/50 font-body lowercase leading-relaxed">
                            our methodology is simple: build software that feels as soft as silk and as powerful as gravity. no friction. just flow.
                        </p>
                    </div>

                    <div className="reveal-p pt-8">
                        <div className="glass-card px-8 py-10 inline-block rounded-3xl">
                            <div className="flex gap-12 text-center">
                                <div>
                                    <div className="text-3xl font-black">54+</div>
                                    <div className="text-[10px] font-mono uppercase opacity-40">Drops</div>
                                </div>
                                <div className="w-[1px] h-10 bg-premium-text/10" />
                                <div>
                                    <div className="text-3xl font-black">01</div>
                                    <div className="text-[10px] font-mono uppercase opacity-40">Mission</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass-card p-2">
                    <div className="about-image relative w-full h-full bg-lavender/40 rounded-[1.8rem] overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564"
                            alt="Muted Abstract"
                            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                        />
                        {/* Soft decorative elements */}
                        <div className="absolute top-10 right-10 w-20 h-20 bg-peach blur-3xl opacity-50" />
                        <div className="absolute bottom-20 left-10 w-32 h-32 bg-sky blur-3xl opacity-50" />
                    </div>
                </div>

            </div>
        </section>
    );
}
