'use client';
import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

import PageSlider from './home/_sections/PageSlider';

export default function Home() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    function update(time) {
      // @ts-ignore
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root>
        <PageSlider />
      </ReactLenis>
    </>
  );
}
