import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";
import { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <MaxWidthWrapper className="flex flex-1 flex-col">
        <Steps />
        {children}
      </MaxWidthWrapper>
    </div>
  );
};

export default Layout;
