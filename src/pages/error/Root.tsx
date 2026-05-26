import {
  isRouteErrorResponse,
  useRouteError,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router';
import { Button } from '@/components/ui/button';

export const RootErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();

  if (isRouteErrorResponse(error)) {
    const tokenExpired =
      error.status === 401 && error.data.includes('token expired');

    if (tokenExpired) {
      return <Navigate to={`/refresh-token?redirect=${location.pathname}`} replace />;
    }
    return (
      <div className='h-dvh grid place-content-center place-items-center gap-4'>
        <h1 className='text-4xl font-semibold'>
          {error.status} {error.statusText}
        </h1>

        <p className='text-muted-foreground max-w-[60ch] text-center text-balance'>
          {error.data}
        </p>

        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className='h-dvh grid place-content-center place-items-center gap-4'>
        <h1 className='text-4xl font-semibold'>Error</h1>
        <p className='text-muted-foreground max-w-[60ch] text-center text-balance'>
          {error.message}
        </p>
        <p className='text-muted-foreground'>Stack Trace:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return (
      <div className='h-dvh grid place-content-center place-items-center gap-4'>
        <h1 className='text-4xl font-semibold'>Unknown Error</h1>
        <p className='text-muted-foreground max-w-[60ch] text-center text-balance'>
          An unknown error has occurred.
        </p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }
};
