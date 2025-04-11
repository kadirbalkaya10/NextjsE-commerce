import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/shared/header/menu";
import MainNav from "./main-nav";
import { Input } from "@/components/ui/input";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='flex flex-col p-4'>
        <div className='border-b w-full mx-auto'>
          <div className='flex item-center h-16 px-4'>
            <Link href='/' className='w-22'>
              <Image
                src='/images/logo.svg'
                height={48}
                width={48}
                alt={APP_NAME}
              />
            </Link>
            {/* Main Nav */}
            <MainNav className='mx-6' />
            <div className='flex ml-auto item-center space-x-4'>
              <div className=' flex items-center'>
                <Input
                  type='search'
                  placeholder='search...'
                  className='md:w-[100px] lg:w-[300px] mr-2'
                />
              </div>
              <Menu />
            </div>
          </div>
        </div>
        <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto'>
          {children}
        </div>
      </div>
    </>
  );
}
