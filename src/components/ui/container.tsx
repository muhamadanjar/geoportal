import classNames from "@/utils/class-names"
import React from "react";

export default function Container({
  className,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        className!
      )}
      {...props}
    />
  );
}
