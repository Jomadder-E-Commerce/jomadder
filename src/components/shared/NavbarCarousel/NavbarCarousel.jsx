import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  import { cn } from "@/lib/utils";
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  
  const NavbarCarousel = ({ autoplay = true }) => {
    const data = [
      { label: "Facebook", path: "https://facebook.com" },
      { label: "Twitter", path: "https://twitter.com" },
      { label: "Instagram", path: "https://instagram.com" },
      { label: "LinkedIn", path: "https://linkedin.com" },
      { label: "YouTube", path: "https://youtube.com" },
      { label: "Pinterest", path: "https://pinterest.com" },
      { label: "Snapchat", path: "https://snapchat.com" },
      { label: "Reddit", path: "https://reddit.com" },
      { label: "TikTok", path: "https://tiktok.com" },
      { label: "WhatsApp", path: "https://whatsapp.com" },
      { label: "Telegram", path: "https://telegram.org" },
    ];
  
    const pathname = usePathname();
  
    return (
      <Carousel
        opts={{
            align: "center",
            loop: true, // Optional: make the carousel loop continuously
        }}
        className="w-full mx-auto my-2"
      >
        <CarouselContent className="mx-2 lg:mx-5 md:mx-3">
          {data?.map((item, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "flex justify-center transition-opacity",
                // Responsive basis for different screen sizes
                "basis-[29%] sm:basis-1/6 md:basis-[12%] lg:basis-[9%] xl:basis-[9%] ",
              )}
            >
              <Link
                href={item.path}
                className={``}
              >
                <p className="">{item.label}</p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn("absolute left-0 ")} />
        <CarouselNext className={cn("absolute right-0 ")} />
      </Carousel>
    );
  };
  
  export default NavbarCarousel;
  