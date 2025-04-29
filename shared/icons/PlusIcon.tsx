import * as React from 'react';
import { IconProps } from './types';

export const PlusIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        ref={forwardedRef}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        {...props}>
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    );
  }
);

PlusIcon.displayName = 'PlusIcon';

export default PlusIcon;
