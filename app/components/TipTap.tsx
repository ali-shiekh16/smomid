'use client';

import { useCallback, useEffect } from 'react';
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  Editor,
  Extension,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
  Link as LinkIcon,
} from 'lucide-react';

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

interface TipTapProps {
  content?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
}

const TipTap: React.FC<TipTapProps> = ({
  content = '<p>Hello World! 🌎️</p>',
  onChange = () => {},
  editable = true,
}) => {
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
      }),
      CustomLinkExtension, // Add our custom extension
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

  // Add this effect to update editor content when the content prop changes
  useEffect(() => {
    if (editor && content) {
      // Only update if the content differs from current editor content
      const currentContent = editor.getHTML();
      if (currentContent !== content) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

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
    const url = window.prompt('URL');
    if (url && editor) {
      // Make sure URL has http/https protocol
      let finalUrl = url;
      if (!/^https?:\/\//i.test(url)) {
        finalUrl = 'https://' + url;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: finalUrl })
        .run();
    }
  }, [editor]);

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className='tiptap-editor border border-gray-300 rounded-md overflow-hidden'>
      {editable && (
        <div className='bg-gray-200 p-2 border-b flex flex-wrap gap-1'>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-300 text-gray-800 ${
              editor.isActive('bold') ? 'bg-gray-300' : ''
            }`}
            title='Bold'
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-300 text-gray-800 ${
              editor.isActive('italic') ? 'bg-gray-300' : ''
            }`}
            title='Italic'
          >
            <Italic size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-gray-300 text-gray-800 ${
              editor.isActive('code') ? 'bg-gray-300' : ''
            }`}
            title='Code'
          >
            <Code size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-300 text-gray-800 ${
              editor.isActive('bulletList') ? 'bg-gray-300' : ''
            }`}
            title='Bullet List'
          >
            <List size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-300 text-gray-800 ${
              editor.isActive('orderedList') ? 'bg-gray-300' : ''
            }`}
            title='Ordered List'
          >
            <ListOrdered size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-300 text-gray-800 ${
              editor.isActive('blockquote') ? 'bg-gray-300' : ''
            }`}
            title='Quote'
          >
            <Quote size={18} />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setHeading({ level: 2 }).run()
            }
            className={`p-2 rounded hover:bg-gray-300 text-gray-800 font-bold ${
              editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''
            }`}
            title='Heading 2'
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setHeading({ level: 3 }).run()
            }
            className={`p-2 rounded hover:bg-gray-300 text-gray-800 font-bold ${
              editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''
            }`}
            title='Heading 3'
          >
            H3
          </button>
          <button
            onClick={setLink}
            className={`p-2 rounded hover:bg-gray-300 text-gray-800 font-medium ${
              editor.isActive('link') ? 'bg-gray-300' : ''
            }`}
            title='Link'
          >
            <LinkIcon size={18} />
          </button>
          {editor.isActive('link') && (
            <button
              onClick={removeLink}
              className='p-2 rounded hover:bg-gray-300 text-gray-800 font-medium'
              title='Remove Link'
            >
              Unlink
            </button>
          )}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className='p-2 rounded hover:bg-gray-300 text-gray-800 disabled:opacity-50 disabled:text-gray-400'
            title='Undo'
          >
            <Undo size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className='p-2 rounded hover:bg-gray-300 text-gray-800 disabled:opacity-50 disabled:text-gray-400'
            title='Redo'
          >
            <Redo size={18} />
          </button>
        </div>
      )}

      <div className='p-4 min-h-[200px] bg-white'>
        <EditorContent
          editor={editor}
          className='prose max-w-none [&_.ProseMirror]:text-gray-900 [&_.ProseMirror_p]:text-gray-900 [&_.ProseMirror_h1]:text-black [&_.ProseMirror_h2]:text-black [&_.ProseMirror_h3]:text-black [&_.ProseMirror_ul]:text-gray-900 [&_.ProseMirror_ol]:text-gray-900 [&_.ProseMirror_blockquote]:text-gray-800 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-gray-300 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-5 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-5 [&_.ProseMirror_code]:bg-gray-100 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:font-mono [&_.ProseMirror_a]:text-blue-600 [&_.ProseMirror_a]:underline [&_.ProseMirror_a:hover]:text-blue-800 [&_.ProseMirror]:p-0'
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
            className={`p-2 hover:bg-gray-100 text-gray-800 ${
              editor.isActive('bold') ? 'bg-gray-100' : ''
            }`}
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 hover:bg-gray-100 text-gray-800 ${
              editor.isActive('italic') ? 'bg-gray-100' : ''
            }`}
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 hover:bg-gray-100 text-gray-800 ${
              editor.isActive('code') ? 'bg-gray-100' : ''
            }`}
          >
            <Code size={16} />
          </button>
          {editor.isActive('link') && (
            <button
              onClick={removeLink}
              className='p-2 hover:bg-gray-100 text-red-600'
            >
              Unlink
            </button>
          )}
          {!editor.isActive('link') && (
            <button
              onClick={setLink}
              className='p-2 hover:bg-gray-100 text-gray-800'
            >
              <LinkIcon size={16} />
            </button>
          )}
        </BubbleMenu>
      )}
    </div>
  );
};

export default TipTap;
