import { forwardRef } from "react";

const FlipCard = forwardRef(({ id, frontSrc, frontAlt, backContent, color }, ref) => {
    return (
        <div className="card absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[400px] perspective-1000" id={id} ref={ref}>
            <div className="card-wrapper w-full h-full relative">
                <div className="flip-card-inner w-full h-full relative preserve-3d">

                    {/* FRONT (Pattern/Image) */}
                    <div className="flip-card-front w-full h-full absolute backface-hidden rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src={frontSrc}
                            alt={frontAlt}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay for premium feel */}
                        <div className={`absolute inset-0 bg-${color}/20 mix-blend-overlay`} />
                    </div>

                    {/* BACK (Content/Details) */}
                    <div className="flip-card-back w-full h-full absolute backface-hidden rounded-3xl overflow-hidden bg-[#F8F7F2] border border-premium-text/5 p-8 flex flex-col justify-center items-center text-center rotate-y-180 shadow-2xl">
                        {backContent}
                    </div>

                </div>
            </div>
        </div>
    );
});

export default FlipCard;
