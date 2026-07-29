import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

export default function SliderBase({ children, options = { loop: true, axis: "y" } }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    nextBtnDisabled,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="relative w-full h-full group overflow-hidden">

      <NextButton
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        className="absolute bottom-4 right-9 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 text-white shadow-lg  rotate-90"
      />

      <div
        className="overflow-hidden w-full h-full"
        ref={emblaRef}
      >
        <div className="flex flex-col h-full select-none">
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 h-full relative flex flex-col justify-end overflow-hidden"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}