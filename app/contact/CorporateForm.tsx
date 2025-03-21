'use client';

import React from 'react';
import Section from '../components/Section';
import ContactSecHeading from './ContactSecHeading';
import TextField from '../components/TextField';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import ButtonOutline from '../components/ButtonOutline';

const CorporateForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Section>
      <ContactSecHeading>Inquiries</ContactSecHeading>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='md:flex md:space-x-10 md:space-y-0 space-y-10'>
          <div className='space-y-10 flex-3'>
            <TextField label='Name :' htmlFor='name' />
            <TextField label='Email:' htmlFor='email' />
            <TextField label='Contact no:' htmlFor='contact' />
            <div className='md:flex md:space-y-0 space-y-5 space-x-10'>
              <Select htmlFor='inquiryType' label='Inquiry Type' />
              <Select htmlFor='attachment' label='Attachment' />
            </div>
          </div>
          <div className='flex-2'>
            <Textarea label='Message :' htmlFor='message' />
          </div>
        </div>
        <ButtonOutline className='bg-black border-black px-15 mt-5'>
          Send
        </ButtonOutline>
      </form>
    </Section>
  );
};

export default CorporateForm;
