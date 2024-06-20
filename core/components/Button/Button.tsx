import { forwardRef, ReactNode } from 'react';

import styles from './Button.module.scss';
import clsx from 'clsx';

export type ButtonProps = {
  type?: 'button' | 'submit';
  variant?: 'primary' | 'danger';
  children?: ReactNode;
  onClick?: () => void;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { type = 'button', variant = 'primary', children, onClick },
  ref,
) {
  return (
    <button
      ref={ref}
      className={clsx(styles.button, {
        [styles.buttonPrimary]: variant === 'primary',
        [styles.buttonDanger]: variant === 'danger',
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
