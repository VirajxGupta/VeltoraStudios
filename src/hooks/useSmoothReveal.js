import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.fromTo(element,
            {
                y: options.y || 50,
                opacity: 0,
                filter: 'blur(10px)'
            },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: options.duration || 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    ...options.scrollTrigger
                }
            }
        );
    }, [options]);

    return ref;
}
