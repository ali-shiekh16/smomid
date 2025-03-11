import { Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import Block from './Block';

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
  return <Link href={href}>{children}</Link>;
};

const NavIcon = ({ href, icon }: { href: string; icon: string }) => {
  return (
    <NavLink href={href}>
      <Image src={`/icons/${icon}.svg`} alt='Logo.' width='20' height='20' />
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <nav className='flex flex-col  md:flex-row items-center md:justify-between sticky bottom-0  py-8 text-md md:text-lg sm:space-x-3 px-16 md:px-32'>
      <ul className='flex space-x-3 md:space-x-5'>
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
        <NavIcon href='#' icon='instagram' />
        <NavIcon href='#' icon='twitter' />
        <NavIcon href='#' icon='youtube' />
        <NavIcon href='#' icon='tiktok' />
        <NavIcon href='#' icon='spotify' />
        <NavIcon href='#' icon='music' />
        <NavIcon href='#' icon='sound-cloud' />
      </ul>
    </nav>
  );
};

export default Navbar;
