import * as React from 'react';
import { IconProps } from './types';

export const CheckmarkIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
        <path
          d="M22.7244 5.02461C22.3869 4.68711 21.8619 4.68711 21.5244 5.02461L8.77443 17.3996L2.47443 11.2121C2.13693 10.8746 1.61193 10.9121 1.27443 11.2121C0.936925 11.5496 0.974425 12.0746 1.27443 12.4121L7.91193 18.8621C8.13693 19.0871 8.43692 19.1996 8.77443 19.1996C9.11193 19.1996 9.37443 19.0871 9.63693 18.8621L22.7244 6.14961C23.0619 5.88711 23.0619 5.36211 22.7244 5.02461Z"
          fill="white"
        />
      </svg>
    );
  }
);

CheckmarkIcon.displayName = 'CheckmarkIcon';

export default CheckmarkIcon;
