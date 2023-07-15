import * as React from 'react';
import { LuLoader2 } from 'react-icons/lu';

import { cn } from '@/lib/utils';

const Spinner = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof LuLoader2>) => (
  <LuLoader2 className={cn('w-5 h-5 animate-spin', className)} {...props} />
);
Spinner.displayName = 'Spinner';

export { Spinner };
