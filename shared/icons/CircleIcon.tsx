import * as React from 'react';
import { IconProps } from './types';

export const CircleIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        ref={forwardedRef}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        {...props}>
        <g id="Group">
          <path
            id="Vector"
            d="M12.0008 23.3633C5.73828 23.3633 0.675781 18.2633 0.675781 12.0008C0.675781 5.73828 5.73828 0.675781 12.0008 0.675781C18.2633 0.675781 23.3633 5.73828 23.3633 12.0008C23.3633 18.2633 18.2633 23.3633 12.0008 23.3633ZM12.0008 2.36328C6.67578 2.36328 2.36328 6.67578 2.36328 12.0008C2.36328 17.3258 6.71328 21.6758 12.0383 21.6758C17.3633 21.6758 21.7133 17.3258 21.7133 12.0008C21.6758 6.67578 17.3258 2.36328 12.0008 2.36328Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
);

CircleIcon.displayName = 'CircleIcon';

export default CircleIcon;
