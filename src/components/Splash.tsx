import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AuthUser from '@/app/(auth)/AuthUser';

export default function Splash({ authUser }) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundImage = "url('/images/luciddreaming.jpg')";
  
    const timeout = setTimeout(() => {
      if (authUser) {
        router.push('/home'); // Navigate to the home page if the user is signed in
      } else {
        router.push('/signin'); // Navigate to the sign-in page if the user is not signed in
      }
    }, 5000);
  
    return () => {
      clearTimeout(timeout); // Clear the timeout if the component is unmounted
    };
  }, [authUser, router]);
  

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center overlay">
        {/* to do: logo animation and loading timeout */}
        <Image src="/images/logo.svg" alt="Slumberjack Logo" className="logo" width={154} height={212} priority />
        <h1 className="text-4xl tracking-wide p-4">
          Slumber<span className="pewterblue">jack</span>
        </h1>
      </main>
      <AuthUser />
    </>
  );
}
