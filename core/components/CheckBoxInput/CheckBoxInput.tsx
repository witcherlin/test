import { forwardRef } from 'react';

import styles from './CheckBoxInput.module.scss';

export type CheckBoxInputProps = {
  value?: boolean;
  onChange?: (value: boolean) => void;
};

export const CheckBoxInput = forwardRef<HTMLInputElement, CheckBoxInputProps>(function CheckBoxInput(
  { value, onChange },
  ref,
) {
  return (
    <input
      ref={ref}
      className={styles.input}
      type="checkbox"
      checked={value}
      onChange={(event) => onChange?.(event.target.checked)}
    />
  );
});
