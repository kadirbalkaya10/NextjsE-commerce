"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";

const links = [
  {
    title: "Profile",
    href: "/user/profile",
  },
  {
    title: "Order",
    href: "/user/orders",
  },
];

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}>
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathName.includes(item.href) ? "" : "text-muted-foreground"
          )}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
