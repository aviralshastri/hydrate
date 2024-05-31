import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../header/navbar';
import { gsap } from 'gsap';

export default function Layout({ children, title = 'Next.js App', navbar = true }) {
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      gsap.from(mainRef.current.children, {
        y: 90,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1,
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {navbar && <Navbar />}
      <main ref={mainRef}>{children}</main>
    </>
  );
}
