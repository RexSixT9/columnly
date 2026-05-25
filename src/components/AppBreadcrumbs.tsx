import { Fragment, useMemo } from 'react';
import { Link, useMatches, useLocation } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import type { UIMatch } from 'react-router';

type HandleType = {
  breadcrumb?:
    | string
    | ((args: {
        params: Record<string, string | undefined>;
        data: unknown;
      }) => string);
};

export const AppBreadcrumbs = () => {
  const matches = useMatches() as UIMatch<HandleType>[];
  const location = useLocation();

    const breadcrumbs = useMemo(() => {
      return matches
        .filter((match): match is UIMatch<HandleType> => !!match.handle?.breadcrumb)
        .map((match) => {
          const breadcrumb = match.handle?.breadcrumb;
          if (typeof breadcrumb === 'function') {
            return breadcrumb({
              params: match.params,
              data: match.data,
            });
          }
          return breadcrumb;
        });
    }, [matches, location]);

    if (breadcrumbs.length === 0) return null;


    return (
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={location.pathname}>{crumb}</BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };
