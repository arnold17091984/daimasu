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
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',

        // ─── Phase 1 luxury variants ────────────────────────────────
        // The previous filled-red CTAs read as "ramen counter". These
        // ghost-outline-with-gold variants land in the kaiseki / Tatler
        // band. Variant names are kept (`daimasu-red`, `daimasu-orange`)
        // so existing call sites don't have to be touched.
        // ----------------------------------------------------------------
        'daimasu-main':
          'bg-ink-900 text-washi-50 hover:bg-ink-700 transition-colors font-poppins font-medium tracking-[0.06em]',
        // Primary CTA: ink-fill with gold text + gold hairline border. Reads
        // as a kaiseki seal on both light (washi-50) and dark (hero / black
        // membership / footer) surfaces — replaces the legacy filled red.
        'daimasu-red':
          'bg-ink-900 text-gold-300 border border-gold-500 hover:bg-ink-700 hover:text-gold-300 transition-colors font-poppins font-medium tracking-[0.08em] uppercase',
        // Secondary CTA on dark surfaces — pure ghost outline in gold.
        'daimasu-orange':
          'bg-transparent text-gold-300 border border-gold-500 hover:bg-gold-500 hover:text-ink-900 transition-colors font-poppins font-medium tracking-[0.08em] uppercase',
        'daimasu-cream':
          'bg-washi-50 text-ink-900 border border-ink-900/20 hover:bg-washi-100 transition-colors font-poppins font-medium tracking-[0.06em]',
        'daimasu-olive':
          'bg-transparent text-gold-500 border border-gold-500/60 hover:border-gold-500 hover:text-gold-300 transition-colors font-poppins font-medium tracking-[0.06em]',
        'daimasu-outline':
          'border border-ink-900 bg-transparent text-ink-900 hover:bg-ink-900 hover:text-washi-50 transition-colors font-poppins font-medium tracking-[0.08em] uppercase',
        'daimasu-outline-red':
          'border border-gold-500 bg-transparent text-ink-900 hover:bg-gold-500 hover:text-ink-900 transition-colors font-poppins font-medium tracking-[0.08em] uppercase',
        'daimasu-outline-orange':
          'border border-gold-500 bg-transparent text-gold-500 hover:bg-gold-500 hover:text-ink-900 transition-colors font-poppins font-medium tracking-[0.08em] uppercase',
        'daimasu-ghost':
          'bg-transparent text-ink-900 hover:text-gold-500 transition-colors font-poppins font-medium tracking-[0.06em]',
        'daimasu-ghost-light':
          'bg-transparent text-washi-50 hover:text-gold-300 transition-colors font-poppins font-medium tracking-[0.06em]',

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
