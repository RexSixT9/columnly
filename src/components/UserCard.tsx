import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'sonner';
import { useFetcher } from 'react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Avatar from 'react-avatar';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Trash2Icon } from 'lucide-react';
import type { UserResponse } from '@/hooks/useUser';

type props = {
  userId: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  createdAt: string;
  loggedInUser: UserResponse;
  onUserDeleteSuccess?: () => void;
};

const UserCard = ({
  userId,
  username,
  email,
  firstName,
  lastName,
  role,
  createdAt,
  loggedInUser,
  onUserDeleteSuccess,
}: props) => {
    
  const fetcher = useFetcher();


  return (
    <Card className='group py-4'>
      <CardContent className='grid grid-cols-[max-content_minmax(0,_1fr)_max-content] gap-4 px-4'>
        <Avatar
          email={email}
          size='40'
          name={firstName || lastName ? [firstName, lastName].join(' ') : email}
          round
          className='rounded-lg'
        />

        <div>
          <div className='flex items-center gap-2'>
            <h3 className='font-semibold'>
              {firstName || lastName ? [firstName, lastName].join(' ') : email}
            </h3>
            {role === 'admin' && (
              <Badge
                variant='outline'
                className='capitalize'
              >
                {role}
              </Badge>
            )}
          </div>
          <p className='text-sm text-muted-foreground'>{email}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
