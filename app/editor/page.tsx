'use client';

import { useState } from 'react';
import TipTap from '../components/TipTap';
import AdvancedTipTap from '../components/AdvancedTipTap';

export default function EditorPage() {
  const [content, setContent] = useState<string>(
    '<p>Edit me! This is the basic editor.</p>'
  );
  const [advancedContent, setAdvancedContent] = useState<string>(`
    <h2>Advanced TipTap Editor</h2>
    <p>This is a more feature-rich editor with additional extensions and styling.</p>
    <ul>
      <li>Support for tables</li>
      <li>Text alignment</li>
      <li>Links and images</li>
      <li>And much more!</li>
    </ul>
    <blockquote>You can quote text too!</blockquote>
  `);

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8 text-center text-gray-900'>
          TipTap Text Editor Demo
        </h1>

        <div className='mb-12'>
          <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='bg-gray-800 text-white py-3 px-4'>
              <h2 className='text-xl font-semibold'>Basic Editor</h2>
              <p className='text-sm text-gray-300 mt-1'>
                Text is formatted as you type
              </p>
            </div>
            <div className='p-4'>
              <TipTap content={content} onChange={html => setContent(html)} />
            </div>
          </div>
        </div>

        <div className='mb-12'>
          <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='bg-gray-800 text-white py-3 px-4'>
              <h2 className='text-xl font-semibold'>Advanced Editor</h2>
              <p className='text-sm text-gray-300 mt-1'>
                Note: You need to install additional TipTap extensions to use
                all features
              </p>
            </div>
            <div className='p-4'>
              <AdvancedTipTap
                content={advancedContent}
                onChange={html => setAdvancedContent(html)}
                placeholder='Write something amazing...'
              />
            </div>
          </div>
        </div>

        <div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <svg
                className='h-5 w-5 text-yellow-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-yellow-800'>
                Required packages for Advanced Editor
              </h3>
              <div className='mt-2 text-sm text-yellow-700'>
                <p>
                  To use the advanced editor with all features, install these
                  packages:
                </p>
                <code className='mt-2 block text-xs'>
                  npm install @tiptap/extension-bubble-menu
                  @tiptap/extension-floating-menu @tiptap/extension-link
                  @tiptap/extension-placeholder @tiptap/extension-text-align
                  @tiptap/extension-underline @tiptap/extension-color
                  @tiptap/extension-highlight @tiptap/extension-typography
                  @tiptap/extension-image @tiptap/extension-table
                  @tiptap/extension-table-row @tiptap/extension-table-cell
                  @tiptap/extension-table-header
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md overflow-hidden p-6'>
          <h2 className='text-xl font-bold mb-4'>Editor Features</h2>
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <h3 className='font-bold text-lg mb-2'>Basic Editor</h3>
              <ul className='list-disc pl-5 space-y-1'>
                <li>Bold, Italic, Code formatting</li>
                <li>Bullet and Ordered lists</li>
                <li>Blockquotes</li>
                <li>Headings</li>
                <li>Links</li>
                <li>Undo/Redo</li>
                <li>Bubble menu for quick formatting</li>
              </ul>
            </div>
            <div>
              <h3 className='font-bold text-lg mb-2'>Advanced Editor</h3>
              <ul className='list-disc pl-5 space-y-1'>
                <li>Everything from Basic Editor</li>
                <li>Text alignment options</li>
                <li>Tables with headers</li>
                <li>Image insertion</li>
                <li>Floating menu for empty lines</li>
                <li>Text highlighting</li>
                <li>Placeholder text</li>
                <li>Typography improvements</li>
                <li>Underline and Strikethrough</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
