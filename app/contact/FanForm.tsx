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
const fanFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z
    .string()
    .min(5, { message: 'Message must be at least 5 characters' })
    .max(300, { message: 'Message must not exceed 300 characters' })
    .optional()
    .or(z.literal('')), // Allow empty string
});

// Define the type for our form data
type FanFormData = z.infer<typeof fanFormSchema>;

const FanForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FanFormData>({
    resolver: zodResolver(fanFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: FanFormData) => {
    try {
      // Send the form data to the email-list API endpoint
      const response = await fetch('/api/email-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to subscribe to email list');
      }

      // Reset the form after successful submission
      reset();
      alert('Thank you for subscribing to our email list!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(
        'There was an error subscribing to the email list. Please try again.'
      );
    }
  };

  return (
    <Section>
      <ContactSecHeading align='right'>Add to email list</ContactSecHeading>
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
          className='bg-black border-black px-15 mt-5'
          // disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </ButtonOutline>
      </form>
    </Section>
  );
};

export default FanForm;
