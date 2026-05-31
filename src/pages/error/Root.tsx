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
      return (
        <Navigate
          to={`/refresh-token?redirect=${location.pathname}`}
          replace
        />
      );
    }
    return (
      <div
        role='alert'
        className='h-dvh grid place-content-center place-items-center gap-6 px-4 sm:px-6 lg:px-8 py-8'
      >
        <h1 className='text-2xl sm:text-3xl md:text-4xl leading-tight font-semibold text-center'>
          {error.status} {error.statusText}
        </h1>

        <p className='text-muted-foreground text-sm sm:text-base md:text-lg max-w-[40ch] sm:max-w-[60ch] text-center text-balance'>
          {error.data}
        </p>

        <Button
          onClick={() => navigate(-1)}
          className='w-full sm:w-auto mt-2'
        >
          Go Back
        </Button>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div
        role='alert'
        className='h-dvh grid place-content-center place-items-center gap-6 px-4 sm:px-6 lg:px-8 py-8'
      >
        <h1 className='text-2xl sm:text-3xl md:text-4xl leading-tight font-semibold text-center'>
          Error
        </h1>
        <p className='text-muted-foreground text-sm sm:text-base md:text-lg max-w-[40ch] sm:max-w-[60ch] text-center text-balance'>
          {error.message}
        </p>
        <p className='text-muted-foreground'>Stack Trace:</p>
        <pre className='w-full max-w-[90%] sm:max-w-[60ch] max-h-[40vh] overflow-auto bg-muted p-3 rounded text-sm whitespace-pre-wrap wrap-break-word'>
          {error.stack}
        </pre>
      </div>
    );
  } else {
    return (
      <div
        role='alert'
        className='h-dvh grid place-content-center place-items-center gap-6 px-4 sm:px-6 lg:px-8 py-8'
      >
        <h1 className='text-2xl sm:text-3xl md:text-4xl leading-tight font-semibold text-center'>
          Unknown Error
        </h1>
        <p className='text-muted-foreground text-sm sm:text-base md:text-lg max-w-[40ch] sm:max-w-[60ch] text-center text-balance'>
          An unknown error has occurred.
        </p>
        <Button
          onClick={() => navigate(-1)}
          className='w-full sm:w-auto mt-2'
        >
          Go Back
        </Button>
      </div>
    );
  }
};
