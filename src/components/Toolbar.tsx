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
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

const HEADINGS: HeadingType[] = [
  {
    level: 1,
    label: 'Heading 1',
    icon: Heading1Icon,
  },
  {
    level: 2,
    label: 'Heading 2',
    icon: Heading2Icon,
  },
  {
    level: 3,
    label: 'Heading 3',
    icon: Heading3Icon,
  },
];

export const Toolbar = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const { editor } = useCurrentEditor();

  const getActiveIcon = useCallback(() => {
    if (!editor) return HeadingIcon;

    const activeHeading = HEADINGS.find((level) =>
      editor.isActive('heading', { level }),
    );

    if (!activeHeading?.level) return HeadingIcon;

    return <activeHeading.icon />;
  }, [editor]);

  if (!editor) return null;
  const isAnyHeadingActive = editor.isActive('heading');

  return (
    <div
      className={cn('flex items-center gap-1 p-2', className)}
      {...props}
    ></div>
  );
};
