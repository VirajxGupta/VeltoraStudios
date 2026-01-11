import { useState, useEffect } from 'react';

export default function Footer() {
    const [time, setTime] = useState('');

    useEffect(() => {
        // Initial set
        setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));

        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="py-20 px-8 md:px-24 border-t border-premium-text/5 bg-premium-bg">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-20">

                <div className="space-y-8 max-w-sm">
                    <div className="font-black text-4xl tracking-tighter uppercase">
                        VELTORA<span className="text-premium-accent/30">.STUDIO</span>
                    </div>
                    <p className="text-sm text-premium-text/40 font-body lowercase leading-relaxed">
                        a design-led engineering forge building immersive digital habitats. based in the cloud, serving the world.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-32">
                    <div className="space-y-6">
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-30">Socials</span>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="interactive hover:text-lavender transition-colors"><a href="https://www.linkedin.com/in/viraj-gupta-ok" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li className="interactive hover:text-peach transition-colors"><a href="https://www.reddit.com/user/__fluf_/" target="_blank" rel="noopener noreferrer">Reddit</a></li>
                            <li className="interactive hover:text-sky transition-colors"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=virajgupta.work@gmail.com&su=Portfolio%20Contact&body=Hi%20Viraj%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer">Email</a></li>
                        </ul>
                    </div>



                    <div className="space-y-6 col-span-2 md:col-span-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest opacity-30">Local Time</span>
                        <div className="text-2xl font-black font-mono tracking-tight">{time || '00:00:00'}</div>
                        <p className="text-[10px] font-mono opacity-20 uppercase tracking-widest">Global Ops // Active</p>
                    </div>
                </div>

            </div>

            <div className="max-w-[1400px] mx-auto mt-32 pt-12 border-t border-premium-text/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[10px] font-mono opacity-20 uppercase tracking-[0.3em]">
                    © 2026 Veltora Studio. All rights reserved.
                </p>
                <p className="text-[10px] font-mono opacity-20 uppercase tracking-[0.3em]">
                    Built with calm in mind.
                </p>
            </div>
        </footer>
    );
}
