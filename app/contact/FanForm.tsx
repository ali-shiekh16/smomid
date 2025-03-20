'use client';
import React from 'react';
import Section from '../components/Section';
import ContactSecHeading from './ContactSecHeading';
import TextField from '../components/TextField';
import Textarea from '../components/Textarea';
import ButtonOutline from '../components/ButtonOutline';

const FanForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Section>
      <ContactSecHeading align='right'>Add to email list</ContactSecHeading>
      <form onSubmit={handleSubmit} className='md:flex md:space-x-10 w-full'>
        <div className='space-y-10 flex-3'>
          <TextField label='Name :' htmlFor='name' />
          <TextField label='Email:' htmlFor='email' />
          <ButtonOutline className='bg-black border-black px-15'>
            Send
          </ButtonOutline>
        </div>
        <div className='flex-2'>
          <Textarea label='Message :' htmlFor='message' />
        </div>
      </form>
    </Section>
  );
};

export default FanForm;
