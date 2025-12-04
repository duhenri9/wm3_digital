import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

type DivProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-primary/5 backdrop-blur',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return (
    <div className={cn('p-6 pb-2', className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: DivProps) {
  return (
    <h3 className={cn('text-xl font-semibold tracking-tight', className)} {...props} />
  );
}

export function CardContent({ className, ...props }: DivProps) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props} />
  );
}
