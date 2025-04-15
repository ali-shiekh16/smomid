'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Section from '../components/Section';
import ContactSecHeading from './ContactSecHeading';
import TextField from '../components/TextField';
import Textarea from '../components/Textarea';
import ButtonOutline from '../components/ButtonOutline';

// Define the validation schema using Zod
const corporateFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  contact: z
    .string()
    .min(5, { message: 'Contact number must be at least 5 digits' })
    .regex(/^[0-9+\-\s()]*$/, {
      message: 'Please enter a valid contact number',
    }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(500, { message: 'Message must not exceed 500 characters' }),
});

// Define the type for our form data
type CorporateFormData = z.infer<typeof corporateFormSchema>;

const CorporateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CorporateFormData>({
    resolver: zodResolver(corporateFormSchema),
    defaultValues: {
      name: '',
      email: '',
      contact: '',
      message: '',
    },
  });

  const onSubmit = async (data: CorporateFormData) => {
    try {
      // Send the form data to the inquiries API endpoint
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit inquiry');
      }

      // Reset the form after successful submission
      reset();
      alert('Thank you for your inquiry! We will get back to you soon.');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('There was an error submitting your inquiry. Please try again.');
    }
  };

  return (
    <Section>
      <ContactSecHeading>Inquiries</ContactSecHeading>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='md:flex md:space-x-10 md:space-y-0 space-y-10'>
          <div className='space-y-10 flex-3'>
            <TextField
              label='Name :'
              htmlFor='name'
              register={register}
              error={errors.name}
            />
            <TextField
              label='Email:'
              htmlFor='email'
              register={register}
              error={errors.email}
            />
            <TextField
              label='Contact no:'
              htmlFor='contact'
              register={register}
              error={errors.contact}
            />
          </div>
          <div className='flex-2'>
            <Textarea
              label='Message :'
              htmlFor='message'
              register={register}
              error={errors.message}
            />
          </div>
        </div>
        <ButtonOutline
          className={`bg-black border-black px-15 mt-5 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </ButtonOutline>
      </form>
    </Section>
  );
};

export default CorporateForm;
