'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

function LogoAnimation() {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Ensure we have a video reference
    if (!videoRef.current) return;

    let ctx = gsap.context(() => {
      // Wait for metadata to load before setting up ScrollTrigger
      const setupScrollAnimation = () => {
        if (!videoRef.current) return;

        // Create ScrollTrigger timeline
        ScrollTrigger.create({
          trigger: videoRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2, // Smooth scrubbing
          markers: true, // For debugging, remove in production
          onUpdate: self => {
            if (videoRef.current) {
              // Seek video based on scroll progress
              videoRef.current.currentTime =
                self.progress * videoRef.current.duration;
            }
          },
        });
      };

      // Check if metadata is already loaded
      if (!videoRef.current) return;

      if (videoRef.current.readyState > 0) {
        setupScrollAnimation();
      } else {
        // Add event listener for metadata load
        videoRef.current.addEventListener(
          'loadedmetadata',
          setupScrollAnimation
        );
      }
    }, containerRef);

    // Cleanup function
    return () => {
      ctx.revert(); // Revert GSAP context

      // Remove metadata event listener if it exists
      // if (videoRef.current) {
      //   videoRef.current.removeEventListener(
      //     'loadedmetadata',
      //     setupScrollAnimation
      //   );
      // }

      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Touch device detection
  const isTouchDevice = () =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return (
    <div
      ref={containerRef}
      className='w-full h-[100vh] border-2 overflow-hidden'
    >
      <video
        ref={videoRef}
        className='video h-full w-full object-cover'
        playsInline
        webkit-playsinline='true'
        preload='metadata'
        muted
        disablePictureInPicture
      >
        <source src='/videos/1.mp4' type='video/mp4' />
      </video>
    </div>
  );
}

export default LogoAnimation;
