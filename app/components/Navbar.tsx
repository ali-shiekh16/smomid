'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

const NavLink = ({
  href,
  children,
  target,
}: {
  href: string;
  children: ReactNode;
  target?: '_self' | '_blank';
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      target={target || '_self'}
      className={clsx('text-lg', {
        'font-bold text-3xl underline underline-offset-4': pathname === href,
      })}
    >
      {children}
    </Link>
  );
};

const NavIcon = ({ href, icon }: { href: string; icon: string }) => {
  return (
    <NavLink href={href} target='_blank'>
      <Image src={`/icons/${icon}.svg`} alt='Logo.' width='20' height='20' />
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <nav className='flex space-y-5 md:space-y-0 flex-col md:flex-row items-center md:justify-between sticky bottom-0  py-8 text-md md:text-lg  px-10 md:px-32  z-30'>
      <ul className='flex justify-center md:justify-start flex-wrap space-x-3 md:space-x-5'>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/about'>About</NavLink>
        <NavLink href='/media'>Media</NavLink>
        <NavLink href='/events'>Events</NavLink>
        <NavLink href='/merchandise'>Merchandise</NavLink>
        <NavLink href='/contact'>Contact</NavLink>
        <NavLink href='/press'>Press</NavLink>
        <NavLink href='/blogs'>Blogs</NavLink>
      </ul>
      <ul className='flex space-x-5'>
        <NavIcon href='https://www.instagram.com/smomid/' icon='instagram' />
        <NavIcon href='https://www.youtube.com/@Smomid' icon='youtube' />
        <NavIcon href='https://www.facebook.com/Smomid' icon='facebook' />
        <NavIcon href='https://smomid.bandcamp.com/' icon='bandcamp' />
        <NavIcon
          href='https://open.spotify.com/artist/34tsz5yU9BVkcSjlZvzP2W'
          icon='spotify'
        />
      </ul>
    </nav>
  );
};

export default Navbar;
