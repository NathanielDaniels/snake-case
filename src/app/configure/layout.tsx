import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <MaxWidthWrapper className="flex flex-1 flex-col">
        {children}
      </MaxWidthWrapper>
    </div>
  );
};

export default Layout;
