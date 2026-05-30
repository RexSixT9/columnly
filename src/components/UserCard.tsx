import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'sonner';
import { useFetcher } from 'react-router';

import { Card, CardContent } from '@/components/ui/card';
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
      <CardContent className='grid grid-cols-[max-content_minmax(0,1fr)_max-content] gap-4 px-4'>
        <Avatar
          size='40'
          name={firstName || lastName ? [firstName, lastName].join(' ') : email}
          className='rounded-lg'
        />

        <div>
          <div className='flex items-center gap-2'>
            <h3 className='font-semibold'>
              {firstName || lastName
                ? [firstName, lastName].join(' ')
                : username}
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
          <p className='text-sm text-muted-foreground truncate'>{email}</p>
          <div className='text-xs text-muted-foreground mt-2'>
            <Tooltip delayDuration={250}>
              <TooltipTrigger>
                Joined{' '}
                {formatDistanceToNowStrict(createdAt, { addSuffix: true })}
              </TooltipTrigger>
              <TooltipContent side='right'>
                {new Date(createdAt).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {loggedInUser?.username !== username && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                aria-label={`Delete ${username}`}
                className='ms-auto -mt-1.5 xl:opacity-0 group-hover:opacity-100'
              >
                <Trash2Icon className='h-4 w-4' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Delete user <strong>{username}</strong>. This action cannot be
                  undone. This will permanently delete the user.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    const submitPromise = fetcher.submit(
                      { userId },
                      {
                        method: 'DELETE',
                        action: '/admin/users',
                        encType: 'application/json',
                      },
                    );

                    toast.promise(submitPromise, {
                      loading: 'Deleting user...',
                      success: () => {
                        if (onUserDeleteSuccess) onUserDeleteSuccess();

                        return {
                          message: 'User deleted successfully',
                          description: `${username} has been deleted.`,
                        };
                      },
                      error: 'Failed to delete user',
                    });
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
