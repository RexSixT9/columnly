import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';

import type { EditorProviderProps } from '@tiptap/react';
import { Toolbar } from './Toolbar';
type TiptapProps = Omit<EditorProviderProps, 'extensions' | 'slotBefore'>;

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Placeholder.configure({
    placeholder: 'Write your content here...',
  }),
];

export const Tiptap: React.FC<TiptapProps> = ({ ...props }) => {
  return (
    <EditorProvider
      {...props}
      extensions={extensions}
      editorContainerProps={{ className: 'p-4' }}
      slotBefore={
        <Toolbar className='sticky top-16 bg-background z-10 rounded-t-xl' />
      }
    ></EditorProvider>
  );
};
