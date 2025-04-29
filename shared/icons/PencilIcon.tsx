import * as React from 'react';
import { IconProps } from './types';

export const PencilIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
        <g id="pencil" clipPath="url(#clip0_987_13146)">
          <path
            id="Vector"
            d="M22.9518 4.87578C21.7518 3.60078 20.4768 2.32578 19.2018 1.08828C18.9393 0.825781 18.6393 0.675781 18.3018 0.675781C17.9643 0.675781 17.6268 0.788281 17.4018 1.05078L3.26432 15.0758C3.03932 15.3008 2.88932 15.5633 2.77682 15.8258L0.714323 22.1258C0.601823 22.4258 0.676823 22.7258 0.826823 22.9508C1.01432 23.1758 1.27682 23.3258 1.61432 23.3258H1.76432L8.17682 21.1883C8.47682 21.0758 8.73932 20.9258 8.92682 20.7008L22.9893 6.67578C23.2143 6.45078 23.3643 6.11328 23.3643 5.77578C23.3643 5.43828 23.2143 5.13828 22.9518 4.87578ZM7.72682 19.5383C7.68932 19.5758 7.65182 19.5758 7.61432 19.6133L2.77682 21.2258L4.38932 16.3883C4.38932 16.3508 4.42682 16.3133 4.46432 16.2758L14.7768 6.00078L18.0393 9.26328L7.72682 19.5383ZM19.2018 8.06328L15.9393 4.80078L18.2268 2.51328C19.3143 3.56328 20.4018 4.68828 21.4518 5.77578L19.2018 8.06328Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_987_13146">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
);

PencilIcon.displayName = 'PencilIcon';

export default PencilIcon;
