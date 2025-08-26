import * as React from 'react';

import { cn } from '../../lib/utils';

const Input = React.forwardRef((props, ref) => {
  const { className, type, ...otherProps } = props;
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus:border-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...otherProps}
    />
  );
});
Input.displayName = 'Input';

export { Input };
