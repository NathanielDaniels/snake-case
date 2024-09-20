"use client";
import LoginModal from "@/components/LoginModal";
import { cn } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import Phone from "@/components/Phone";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const config = {
    // angle: 90,
    spread: 90,
    // startVelocity: 40,
    elementCount: 200,
    // dragFriction: 0.12,
    // duration: 3000,
    // stagger: 3,
    // width: "10px",
    // height: "10px",
    // perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => setShowConfetti(true));

  console.log(configuration);

  // const { color, model, finish, material } = configuration;

  //   const tw = COLORS.find(
  //     (supportedColor) => supportedColor.value === color
  //   )?.tw;
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti active={showConfetti} config={config} />
      </div>
      {/* <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} /> */}
      <div className="mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            // className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
