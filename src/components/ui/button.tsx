import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Default shadcn variants
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',

        // Daimasu variants
        'daimasu-main':
          'bg-daimasu-main text-white shadow-sm hover:bg-daimasu-main/90 font-poppins font-bold',
        'daimasu-red':
          'bg-daimasu-red text-white shadow-[0px_4px_9.4px_0px_rgba(0,0,0,0.5)] hover:bg-daimasu-red/90 font-poppins font-bold',
        'daimasu-orange':
          'bg-daimasu-accent3 text-white shadow-sm hover:bg-daimasu-accent3/90 font-poppins font-bold',
        'daimasu-cream':
          'bg-daimasu-sub2 text-daimasu-main shadow-sm hover:bg-daimasu-sub2/90 font-poppins font-bold',
        'daimasu-olive':
          'bg-daimasu-accent2 text-white shadow-sm hover:bg-daimasu-accent2/90 font-poppins font-bold',
        'daimasu-outline':
          'border-2 border-daimasu-main bg-transparent text-daimasu-main hover:bg-daimasu-main hover:text-white font-poppins font-bold',
        'daimasu-outline-red':
          'border-2 border-daimasu-red bg-transparent text-daimasu-red hover:bg-daimasu-red hover:text-white font-poppins font-bold',
        'daimasu-outline-orange':
          'border-2 border-daimasu-accent3 bg-transparent text-daimasu-accent3 hover:bg-daimasu-accent3 hover:text-white font-poppins font-bold',
        'daimasu-ghost':
          'bg-transparent text-daimasu-main hover:bg-daimasu-sub2/50 font-poppins font-bold',
        'daimasu-ghost-light':
          'bg-transparent text-white hover:bg-white/10 font-poppins font-bold',

        // Legacy
        menu_filter: 'bg-black text-muted !h-[40px]'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        xl: 'h-12 rounded-lg px-10 text-base',
        icon: 'h-9 w-9',
        // Daimasu sizes
        'daimasu-sm': 'h-8 rounded-[9px] px-4 py-2 text-xs',
        'daimasu-md': 'h-10 rounded-[9px] px-6 py-3 text-sm',
        'daimasu-lg': 'h-12 rounded-[9px] px-8 py-4 text-base',
        'daimasu-xl': 'h-14 rounded-[9px] px-10 py-4 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({variant, size, className}))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export {Button, buttonVariants};
