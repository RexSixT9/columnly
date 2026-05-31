import { useCallback } from 'react';
import { useCurrentEditor } from '@tiptap/react';

import { cn } from '@/lib/utils';

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  HeadingIcon,
  ItalicIcon,
  Undo2Icon,
  Redo2Icon,
  StrikethroughIcon,
  TextQuoteIcon,
  CodeSquareIcon,
  ChevronDownIcon,
  ListOrderedIcon,
  ListIcon,
} from 'lucide-react';

import type { LucideProps } from 'lucide-react';
type Level = 1 | 2 | 3;

interface HeadingType {
  level: Level;
  label: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

const HEADINGS: HeadingType[] = [
  {
    level: 1,
    label: 'Heading 1',
    Icon: Heading1Icon,
  },
  {
    level: 2,
    label: 'Heading 2',
    Icon: Heading2Icon,
  },
  {
    level: 3,
    label: 'Heading 3',
    Icon: Heading3Icon,
  },
];

export const Toolbar = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const { editor } = useCurrentEditor();

  const getActiveIcon = useCallback(() => {
    if (!editor) return <HeadingIcon />;

    const activeHeading = HEADINGS.find((level) =>
      editor.isActive('heading', { level }),
    );

    if (!activeHeading?.level) return <HeadingIcon />;
    return <activeHeading.Icon />;
  }, [editor]);

  if (!editor) return null;
  const isAnyHeadingActive = editor.isActive('heading');

  return (
    <div
      className={cn('flex items-center gap-1 p-2', className)}
      {...props}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            disabled={!editor.can().undo()}
            onClick={() => editor.commands.undo()}
          >
            <Undo2Icon />
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side='bottom'
          className='text-center'
        >
          Undo
          <div className='text-primary-foreground/60'>Ctrl+Z</div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            disabled={!editor.can().redo()}
            onClick={() => editor.commands.redo()}
          >
            <Redo2Icon />
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side='bottom'
          className='text-center'
        >
          Redo
          <div className='opacity-60'>Ctrl+Shift+Z</div>
        </TooltipContent>
      </Tooltip>

      <Separator
        orientation='vertical'
        className='data-[orientation=vertical]:h-4'
      />

      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={isAnyHeadingActive ? 'secondary' : 'ghost'}
                size='icon'
                className='px-2! gap-0'
              >
                {getActiveIcon()}
                <ChevronDownIcon className='text-muted-foreground' />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent
            side='bottom'
            className='text-center'
          >
            Heading
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          align='start'
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className='text-muted-foreground'>
              Heading
            </DropdownMenuLabel>
            {HEADINGS.map(({ label, Icon, level }) => (
              <DropdownMenuItem
                key={`heading-${level}`}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level }).run()
                }
                disabled={!editor.can().toggleHeading({ level })}
              >
                <Icon />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Bullet List */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label='Toggle Bullet List'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
            pressed={editor.isActive('bulletList')}
            className='aria-pressed:bg-secondary aria-pressed:text-secondary-foreground'
          >
            <ListIcon />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side='bottom'>Bullet List</TooltipContent>
      </Tooltip>

      {/* Ordered List */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label='Toggle Ordered List'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
            pressed={editor.isActive('orderedList')}
            className='aria-pressed:bg-secondary aria-pressed:text-secondary-foreground'
          >
            <ListOrderedIcon />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side='bottom'>Ordered List</TooltipContent>
      </Tooltip>

      {/* Blockquote */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label='Toggle Blockquote'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
            pressed={editor.isActive('blockquote')}
            className='aria-pressed:bg-secondary aria-pressed:text-secondary-foreground'
          >
            <TextQuoteIcon />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          className='text-center'
        >
          Blockquote
          <div className='opacity-60'>Ctrl+Shift+B</div>
        </TooltipContent>
      </Tooltip>

      {/* Code Block */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label='Toggle Code Block'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
            pressed={editor.isActive('codeBlock')}
            className='aria-pressed:bg-secondary aria-pressed:text-secondary-foreground'
          >
            <CodeSquareIcon />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          className='text-center'
        >
          Code Block
          <div className='opacity-60'>Ctrl+Alt+C</div>
        </TooltipContent>
      </Tooltip>

      <Separator
        orientation='vertical'
        className='data-[orientation=vertical]:h-4'
      />

      {/* Bold */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label='Toggle Bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            pressed={editor.isActive('bold')}
            className='aria-pressed:bg-secondary aria-pressed:text-secondary-foreground'
          >
            <BoldIcon />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          className='text-center'
        >
          Bold
          <div className='opacity-60'>Ctrl+B</div>
        </TooltipContent>
      </Tooltip>

      {/* Italic */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label='Toggle Italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            pressed={editor.isActive('italic')}
            className='aria-pressed:bg-secondary aria-pressed:text-secondary-foreground'
          >
            <ItalicIcon />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          className='text-center'
        >
          Italic
          <div className='opacity-60'>Ctrl+I</div>
        </TooltipContent>
      </Tooltip>

      {/* Strikethrough */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label='Toggle Strikethrough'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            pressed={editor.isActive('strikeThrough')}
            className='aria-pressed:bg-secondary aria-pressed:text-secondary-foreground'
          >
            <StrikethroughIcon />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          className='text-center'
        >
          Strikethrough
          <div className='opacity-60'>Ctrl+Shift+S</div>
        </TooltipContent>
      </Tooltip>

      {/* Code */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-label='Toggle Code'
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            pressed={editor.isActive('code')}
            className='aria-pressed:bg-secondary aria-pressed:text-secondary-foreground'
          >
            <CodeIcon />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          className='text-center'
        >
          Code
          <div className='opacity-60'>Ctrl+E</div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
