'use client';

import { useCallback, useState, useEffect } from 'react';
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
  Editor,
  Extension,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// Note: You'll need to install these extensions
// npm install @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-text-align @tiptap/extension-underline @tiptap/extension-color @tiptap/extension-highlight @tiptap/extension-typography @tiptap/extension-image @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-cell @tiptap/extension-table-header @tiptap/extension-youtube
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Youtube from '@tiptap/extension-youtube';
import CloudinaryUploader from './CloudinaryUploader';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ImagePlus,
  Link as LinkIcon,
  Table as TableIcon,
  Highlighter,
  Palette,
  Hash,
  Youtube as YoutubeIcon,
} from 'lucide-react';

interface AdvancedTipTapProps {
  content?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
  placeholder?: string;
}

// Create a custom extension to handle link clicks
const CustomLinkExtension = Extension.create({
  name: 'customLink',

  onCreate() {
    // Add click handler to the editor DOM element
    if (this.editor.options.element) {
      const handleClick = (event: Event) => {
        // Check if clicked element is a link
        const target = event.target as HTMLElement;
        const anchor = target.closest('a');

        if (anchor) {
          const href = anchor.getAttribute('href');
          if (href) {
            event.preventDefault();
            window.open(href, '_blank', 'noopener,noreferrer');
          }
        }
      };

      this.editor.options.element.addEventListener('click', handleClick);

      // Store the handler reference for cleanup
      this.storage.handleClick = handleClick;
    }
  },

  onDestroy() {
    // Remove event listener when component unmounts
    if (this.editor.options.element && this.storage.handleClick) {
      this.editor.options.element.removeEventListener(
        'click',
        this.storage.handleClick
      );
    }
  },
});

const AdvancedTipTap: React.FC<AdvancedTipTapProps> = ({
  content = '<p>Hello World! 🌎️</p>',
  onChange = () => {},
  editable = true,
  placeholder = 'Write something amazing...',
}) => {
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [showImageInput, setShowImageInput] = useState<boolean>(false);
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [showYoutubeInput, setShowYoutubeInput] = useState<boolean>(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false, // We'll handle this ourselves
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800 cursor-pointer',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        validate: url => /^(https?:\/\/)/.test(url),
      }),
      CustomLinkExtension, // Add our custom extension
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Typography,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-md max-w-full',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({
        HTMLAttributes: {
          class: 'w-full aspect-video rounded-lg my-4',
        },
        width: 640,
        height: 360,
        nocookie: true,
        modestBranding: true,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg max-w-none focus:outline-none text-gray-900',
      },
    },
  });

  // Add a global click handler as a fallback approach
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (!editor) return;

      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.closest('.ProseMirror')) {
        e.preventDefault();
        const href = target.getAttribute('href');
        if (href) {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    if (showLinkInput) {
      if (linkUrl) {
        // Make sure URL has http/https protocol
        let finalUrl = linkUrl;
        if (!/^https?:\/\//i.test(linkUrl)) {
          finalUrl = 'https://' + linkUrl;
        }
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: finalUrl })
          .run();
      }
      setShowLinkInput(false);
      setLinkUrl('');
    } else {
      setShowLinkInput(true);
      // Pre-fill with selected text if it looks like a URL
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, ' ');
      if (text && /^(https?:\/\/)?[^\s]+\.[^\s]+$/i.test(text)) {
        setLinkUrl(text);
      }
    }
  }, [editor, linkUrl, showLinkInput]);

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;

    if (showImageInput) {
      setShowImageInput(false);
      setImageUrl('');
    } else {
      setShowImageInput(true);
    }
  }, [editor, showImageInput]);

  const handleImageUpload = useCallback(
    (url: string) => {
      if (!editor) return;

      editor.chain().focus().setImage({ src: url }).run();
      setShowImageInput(false);
    },
    [editor]
  );

  const addYoutube = useCallback(() => {
    if (!editor) return;

    if (showYoutubeInput) {
      if (youtubeUrl) {
        try {
          console.log('Inserting YouTube video with URL:', youtubeUrl);

          // According to docs, we need to use setYoutubeVideo command
          // https://tiptap.dev/docs/editor/extensions/nodes/youtube#commands
          editor
            .chain()
            .focus()
            .setYoutubeVideo({
              src: youtubeUrl, // Pass the full URL, the extension will extract the ID
              width: 640,
              height: 360,
            })
            .run();

          console.log('YouTube video insertion completed');
        } catch (error) {
          console.error('Error inserting YouTube video:', error);
          alert(
            'Error inserting YouTube video. Check if the YouTube extension is properly installed.'
          );
        }
      }
      setShowYoutubeInput(false);
      setYoutubeUrl('');
    } else {
      setShowYoutubeInput(true);
    }
  }, [editor, youtubeUrl, showYoutubeInput]);

  const addTable = useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className='tiptap-editor border border-gray-300 rounded-md overflow-hidden'>
      {editable && (
        <>
          <div className='bg-gray-200 p-2 border-b flex flex-wrap gap-1'>
            <div className='flex items-center space-x-1 mr-2'>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('bold') ? 'bg-gray-300' : ''
                }`}
                title='Bold'
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('italic') ? 'bg-gray-300' : ''
                }`}
                title='Italic'
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('underline') ? 'bg-gray-300' : ''
                }`}
                title='Underline'
              >
                <UnderlineIcon size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('strike') ? 'bg-gray-300' : ''
                }`}
                title='Strike'
              >
                <Strikethrough size={16} />
              </button>
            </div>

            <span className='h-6 w-px bg-gray-400 mx-1'></span>

            <div className='flex items-center space-x-1 mr-2'>
              <button
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 2 }).run()
                }
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''
                }`}
                title='Heading 2'
              >
                <Heading2 size={16} />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 3 }).run()
                }
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''
                }`}
                title='Heading 3'
              >
                <Heading3 size={16} />
              </button>
            </div>

            <span className='h-6 w-px bg-gray-400 mx-1'></span>

            <div className='flex items-center space-x-1 mr-2'>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('bulletList') ? 'bg-gray-300' : ''
                }`}
                title='Bullet List'
              >
                <List size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('orderedList') ? 'bg-gray-300' : ''
                }`}
                title='Ordered List'
              >
                <ListOrdered size={16} />
              </button>
            </div>

            <span className='h-6 w-px bg-gray-400 mx-1'></span>

            <div className='flex items-center space-x-1 mr-2'>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''
                }`}
                title='Align Left'
              >
                <AlignLeft size={16} />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign('center').run()
                }
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''
                }`}
                title='Align Center'
              >
                <AlignCenter size={16} />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''
                }`}
                title='Align Right'
              >
                <AlignRight size={16} />
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign('justify').run()
                }
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-300' : ''
                }`}
                title='Justify'
              >
                <AlignJustify size={16} />
              </button>
            </div>

            <span className='h-6 w-px bg-gray-400 mx-1'></span>

            <div className='flex items-center space-x-1 mr-2'>
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('blockquote') ? 'bg-gray-300' : ''
                }`}
                title='Quote'
              >
                <Quote size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('code') ? 'bg-gray-300' : ''
                }`}
                title='Code'
              >
                <Code size={16} />
              </button>
            </div>

            <span className='h-6 w-px bg-gray-400 mx-1'></span>

            <div className='flex items-center space-x-1 mr-2'>
              <button
                onClick={addImage}
                className='p-1.5 rounded hover:bg-gray-300 text-gray-800'
                title='Insert Image'
              >
                <ImagePlus size={16} />
              </button>
              <button
                onClick={setLink}
                className={`p-1.5 rounded hover:bg-gray-300 text-gray-800 ${
                  editor.isActive('link') ? 'bg-gray-300' : ''
                }`}
                title='Insert Link'
              >
                <LinkIcon size={16} />
              </button>
              <button
                onClick={addYoutube}
                className='p-1.5 rounded hover:bg-gray-300 text-gray-800'
                title='Insert YouTube Video'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z'></path>
                  <polygon points='9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02'></polygon>
                </svg>
              </button>
              <button
                onClick={addTable}
                className='p-1.5 rounded hover:bg-gray-300 text-gray-800'
                title='Insert Table'
              >
                <TableIcon size={16} />
              </button>
            </div>

            <span className='h-6 w-px bg-gray-400 mx-1'></span>

            <div className='flex items-center space-x-1'>
              <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className='p-1.5 rounded hover:bg-gray-300 disabled:opacity-50 text-gray-800'
                title='Undo'
              >
                <Undo size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className='p-1.5 rounded hover:bg-gray-300 disabled:opacity-50 text-gray-800'
                title='Redo'
              >
                <Redo size={16} />
              </button>
            </div>
          </div>

          {showLinkInput && (
            <div className='p-2 bg-gray-200 border-b flex items-center gap-2'>
              <input
                type='text'
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                placeholder='https://example.com'
                className='flex-1 text-sm border rounded px-2 py-1 text-gray-900'
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setLink();
                  } else if (e.key === 'Escape') {
                    setShowLinkInput(false);
                    setLinkUrl('');
                  }
                }}
              />
              <button
                onClick={setLink}
                className='px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700'
              >
                Add Link
              </button>
              {editor.isActive('link') && (
                <button
                  onClick={removeLink}
                  className='px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700'
                >
                  Remove Link
                </button>
              )}
            </div>
          )}

          {showImageInput && (
            <div className='p-2 bg-gray-200 border-b flex items-center gap-2'>
              <CloudinaryUploader onImageUploaded={handleImageUpload} />
            </div>
          )}

          {showYoutubeInput && (
            <div className='p-2 bg-gray-200 border-b flex items-center gap-2'>
              <input
                type='text'
                value={youtubeUrl}
                onChange={e => setYoutubeUrl(e.target.value)}
                placeholder='https://www.youtube.com/watch?v=VIDEO_ID'
                className='flex-1 text-sm border rounded px-2 py-1 text-gray-900'
                autoFocus
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    addYoutube();
                  } else if (e.key === 'Escape') {
                    setShowYoutubeInput(false);
                    setYoutubeUrl('');
                  }
                }}
              />
              <button
                onClick={addYoutube}
                className='px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700'
              >
                Add Video
              </button>
            </div>
          )}
        </>
      )}

      <div className='p-4 min-h-[300px] bg-white'>
        <EditorContent
          editor={editor}
          className='prose prose-sm sm:prose-base lg:prose-lg max-w-none 
            [&_.ProseMirror]:text-gray-900 
            [&_.ProseMirror_p]:text-gray-900 
            [&_.ProseMirror_h1]:text-black [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4
            [&_.ProseMirror_h2]:text-black [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3
            [&_.ProseMirror_h3]:text-black [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:mb-3
            [&_.ProseMirror_ul]:text-gray-900 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ul_li]:mb-1
            [&_.ProseMirror_ol]:text-gray-900 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_ol_li]:mb-1
            [&_.ProseMirror_blockquote]:text-gray-800 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-gray-300 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:my-4
            [&_.ProseMirror_code]:bg-gray-100 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:font-mono
            [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-md [&_.ProseMirror_img]:my-4
            [&_.ProseMirror_a]:text-blue-600 [&_.ProseMirror_a]:underline [&_.ProseMirror_a]:transition-colors [&_.ProseMirror_a:hover]:text-blue-800 [&_.ProseMirror_a:focus]:outline [&_.ProseMirror_a:focus]:outline-blue-200 [&_.ProseMirror_a:focus]:outline-2 [&_.ProseMirror_a:focus]:outline-offset-2
            [&_.ProseMirror_table]:border-collapse [&_.ProseMirror_table]:w-full [&_.ProseMirror_table]:my-4 [&_.ProseMirror_table_td]:border [&_.ProseMirror_table_td]:border-gray-300 [&_.ProseMirror_table_td]:p-2 [&_.ProseMirror_table_th]:border [&_.ProseMirror_table_th]:border-gray-300 [&_.ProseMirror_table_th]:p-2 [&_.ProseMirror_table_th]:bg-gray-100
            [&_.ProseMirror_p.has-focus]:ring-2 [&_.ProseMirror_p.has-focus]:ring-blue-200 [&_.ProseMirror_p.has-focus]:ring-opacity-50
            [&_.ProseMirror_iframe]:w-full [&_.ProseMirror_iframe]:aspect-video [&_.ProseMirror_iframe]:rounded-md [&_.ProseMirror_iframe]:my-4
            [&_.ProseMirror]:p-0
            [&_.ProseMirror_mark]:bg-yellow-200 [&_.ProseMirror_mark]:p-0'
        />
      </div>

      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 150 }}
          className='bg-white shadow-lg border rounded-lg overflow-hidden flex'
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 hover:bg-gray-100 text-gray-800 ${
              editor.isActive('bold') ? 'bg-gray-100' : ''
            }`}
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 hover:bg-gray-100 text-gray-800 ${
              editor.isActive('italic') ? 'bg-gray-100' : ''
            }`}
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 hover:bg-gray-100 text-gray-800 ${
              editor.isActive('underline') ? 'bg-gray-100' : ''
            }`}
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            onClick={setLink}
            className={`p-1.5 hover:bg-gray-100 text-gray-800 ${
              editor.isActive('link') ? 'bg-gray-100' : ''
            }`}
          >
            <LinkIcon size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-1.5 hover:bg-gray-100 text-gray-800 ${
              editor.isActive('highlight') ? 'bg-gray-100' : ''
            }`}
          >
            <Highlighter size={16} />
          </button>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 150 }}
          className='bg-white shadow-lg border rounded-lg overflow-hidden flex flex-col'
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 hover:bg-gray-100 text-left text-gray-800 ${
              editor.isActive('heading', { level: 2 }) ? 'bg-gray-100' : ''
            }`}
          >
            <div className='flex items-center'>
              <Heading2 size={16} className='mr-2' /> Heading 2
            </div>
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`p-2 hover:bg-gray-100 text-left text-gray-800 ${
              editor.isActive('heading', { level: 3 }) ? 'bg-gray-100' : ''
            }`}
          >
            <div className='flex items-center'>
              <Heading3 size={16} className='mr-2' /> Heading 3
            </div>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 hover:bg-gray-100 text-left text-gray-800 ${
              editor.isActive('bulletList') ? 'bg-gray-100' : ''
            }`}
          >
            <div className='flex items-center'>
              <List size={16} className='mr-2' /> Bullet List
            </div>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 hover:bg-gray-100 text-left text-gray-800 ${
              editor.isActive('orderedList') ? 'bg-gray-100' : ''
            }`}
          >
            <div className='flex items-center'>
              <ListOrdered size={16} className='mr-2' /> Ordered List
            </div>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 hover:bg-gray-100 text-left text-gray-800 ${
              editor.isActive('blockquote') ? 'bg-gray-100' : ''
            }`}
          >
            <div className='flex items-center'>
              <Quote size={16} className='mr-2' /> Quote
            </div>
          </button>
        </FloatingMenu>
      )}
    </div>
  );
};

export default AdvancedTipTap;
