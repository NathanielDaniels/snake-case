"use client";
import LoginModal from "@/components/LoginModal";
import { cn, formatPrice } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import Phone from "@/components/Phone";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { COLORS, MODELS } from "@/validators/option-validator";
import { ArrowRight, Check } from "lucide-react";
import { PRODUCT_PRICES, BASE_PRICE } from "@/config/products";
import { format } from "path";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "./actions";

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
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setShowConfetti(true));

  const borderDots = (
    <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
  );

  const { color, model, finish, material } = configuration;

  let totalPrice = BASE_PRICE;
  if (finish === "textured") {
    totalPrice += PRODUCT_PRICES.finish[finish];
  }
  if (material === "polycarbonate") {
    totalPrice += PRODUCT_PRICES.material[material];
  }

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      console.log("url", url);
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL.");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });

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
        <div className="mb-8 md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>
        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex item-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-4 sm:px-4 md:pt-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>Made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality {material} material</li>
                <li>Scratch & fingerprint resistant {finish} finish</li>
              </ol>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-zinc-800">Base Price</p>
                  {borderDots}
                  <p className="font-medium text-zinc-900">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>
                {finish && finish !== "smooth" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-zinc-800">
                      {finish.charAt(0).toUpperCase() + finish.slice(1)} Finish
                    </p>
                    {borderDots}
                    <p className="font-medium text-zinc-900">
                      {`+${formatPrice(PRODUCT_PRICES.finish[finish] / 100)}`}
                    </p>
                  </div>
                ) : null}
                {material && material !== "silicone" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-zinc-800">
                      {material.charAt(0).toUpperCase() + material.slice(1)}{" "}
                      Material
                    </p>
                    {borderDots}
                    <p className="font-medium text-zinc-900">
                      {`+${formatPrice(
                        PRODUCT_PRICES.material[material] / 100
                      )}`}
                    </p>
                  </div>
                ) : null}
                <div className="my-2 h-px bg-gray-200 " />
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="font-semibold text-zinc-900">Order Total:</p>
                  <p className="font-semibold text-zinc-900">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end pb-12">
              <Button
                onClick={() => {
                  setIsLoading(true);
                  createPaymentSession({ configId: configuration.id });
                }}
                isLoading={isLoading}
                loadingText="Continuing to Checkout"
                // disabled={isLoading}
                className="mt-6 p-3 sm:px-5 lg:px-8 font-semibold text-white bg-zinc-900 rounded-lg hover:bg-zinc-800"
              >
                Continue to Checkout
                <ArrowRight className="size-5 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
