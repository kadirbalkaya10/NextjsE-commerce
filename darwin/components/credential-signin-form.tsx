"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CredentialsSignInForm = () => {
  return (
    <form>
      <div className='space-y-6'>
        <div>
          <Label htmlFor='Email' className='mb-2'>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
          />
        </div>
        <div>
          <Label htmlFor='Password' className='mb-2'>
            Password
          </Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
          />
        </div>
        <div>
          <Button type='submit' className='w-full' variant='default'>
            Sign In
          </Button>
        </div>
        <div className='text-sm text-center text-muted-foreground'>
          Don&apos;t have an account ?{" "}
          <Link href='/sign-up' target='_self' className='link'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
