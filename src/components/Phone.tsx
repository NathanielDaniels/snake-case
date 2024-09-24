import { cn } from "@/lib/utils";

interface PhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div className={cn("relative z-50 overflow-hidden ", className)} {...props}>
      <img
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        className="pointer-events-none z-50 select-none"
        alt="phone image"
      />
      <div className="absolute -z-10 inset-0">
        <img
          src={imgSrc}
          className="object-cover min-w-full min-h-full"
          alt="overlaying phone image"
        />
      </div>
      {/* <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
        <img src="/phone-screen.png" className="w-48 h-96" alt="" />
      </div> */}
    </div>
  );
};

export default Phone;
