import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";
import { unstable_noStore as noStore } from "next/cache";

// for Netlify compatibility
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  noStore();
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  return <DesignPreview configuration={configuration} />;
};

export default Page;
