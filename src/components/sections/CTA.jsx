import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CTA() {
    const buttonRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const btn = buttonRef.current;

            const handleMouseMove = (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            };

            const handleMouseLeave = () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.3)'
                });
            };

            btn.addEventListener('mousemove', handleMouseMove);
            btn.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-60 px-8 md:px-24 text-center relative overflow-hidden">
            {/* Background Soft Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-sky/30 blur-[150px] rounded-full -z-10" />

            <div className="max-w-4xl mx-auto space-y-16">
                <div className="space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-premium-text/40">Engagement // 05</span>
                    <h2 className="text-7xl md:text-[10vw] font-black text-premium-text leading-[0.8] tracking-tighter uppercase">
                        Let&apos;s build <br />
                        <span className="italic text-premium-accent/30 underline decoration-lavender decoration-from-font underline-offset-[2rem]">Something</span> Calm.
                    </h2>
                </div>

                <p className="text-xl md:text-3xl text-premium-text/40 font-body lowercase max-w-2xl mx-auto leading-relaxed">
                    we are currently accepting select missions for 2026. if your project seeks quiet excellence, we seek you.
                </p>

                <div className="pt-8">
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=virajgupta.work@gmail.com&su=Portfolio%20Contact&body=Hi%20Viraj%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        ref={buttonRef}
                        className="group relative px-16 py-8 bg-premium-text text-premium-bg font-black text-2xl uppercase rounded-full overflow-hidden transition-all hover:scale-105 inline-block"
                    >
                        <span className="relative z-10">Start mission</span>
                        <div className="absolute inset-0 bg-lavender translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-premium-text opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>
            </div>
        </section>
    );
}
