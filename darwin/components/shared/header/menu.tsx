import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import {
  EllipsisVertical,
  ShoppingCart,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <ModeToggle />
        <Button asChild variant='ghost'>
          <Link href='/cart'>
            <ShoppingCart />
          </Link>
        </Button>
        <Button asChild>
          <Link href='/sign-in'>
            <UserIcon /> Sign In
          </Link>
        </Button>
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical />
            <SheetContent className='flex flex-col items-start p-3'>
              <SheetTitle>Menu</SheetTitle>
              <ModeToggle />
              <Button asChild variant='ghost'>
                <Link href='/cart'>
                  <ShoppingCartIcon /> Cart
                </Link>
              </Button>
              <Button asChild>
                <Link href='/sign-in'>
                  <UserIcon /> Sign In
                </Link>
              </Button>
              <SheetDescription></SheetDescription>
            </SheetContent>
          </SheetTrigger>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
