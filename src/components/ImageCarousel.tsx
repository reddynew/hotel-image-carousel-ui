
import * as React from "react";
import { CircleDot } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (images.length === 0) return null;

  // If there's only one image, render it without the carousel
  if (images.length === 1) {
    return (
      <div className="relative w-full h-48">
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-48">
                <img
                  src={image}
                  alt={`${alt} - Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`p-1 rounded-full transition-all ${
              current === index
                ? "text-primary scale-125"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <CircleDot className="h-3 w-3" />
          </button>
        ))}
      </div>
    </div>
  );
}
