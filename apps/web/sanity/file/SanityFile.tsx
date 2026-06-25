import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SanityFileProps = {
  file?: { [key: string]: any } | null;
  children?: React.ReactNode;
  className?: string;
} & ComponentProps<"a">;

/* Component for Sanity files with download functionality */
export function SanityFile({ file, children, className, ...props }: SanityFileProps) {
  if (!file?.asset) {
    console.warn("Missing Sanity file object in SanityFile component");
    return null;
  }

  const id = file.asset?._ref ?? file.asset?._id;
  const fileName = file.originalFilename || file.name || "document";

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    console.error("Missing Sanity configuration");
    return null;
  }
  let filePath = "";

  if (id.startsWith("file-")) {
    const [, hash, ext] = id.split("-");
    filePath = `${hash}.${ext}`;
  } else {
    console.warn("Unexpected Sanity file id format:", id);
    return null;
  }

  const url = `https://cdn.sanity.io/files/${projectId}/${dataset}/${filePath}`;

  return (
    <a
      href={url}
      download={fileName}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        className,
        "bg-transparent text-deep-navy-blue-900 hover:text-deep-navy-blue-900 hover:underline hover:cursor-pointer active:bg-blue-100 active:text-deep-navy-blue-900 disabled:bg-gray-200 disabled:text-gray-700 disabled:cursor-not-allowed disabled:hover:no-underline p-1 -ml-1 rounded-md transition-colors duration-200 ease-in-out"
      )}
      {...props}
    >
      {children}
    </a>
  );
}
