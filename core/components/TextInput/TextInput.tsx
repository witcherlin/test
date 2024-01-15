import { forwardRef } from 'react';

import styles from './TextInput.module.scss';

export type TextInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { placeholder, value, onChange },
  ref,
) {
  return (
    <input
      ref={ref}
      className={styles.input}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
    />
  );
});
