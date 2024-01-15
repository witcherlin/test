import { forwardRef } from 'react';

import styles from './SelectInput.module.scss';

export type SelectInputProps = {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
};

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(function SelectInput(
  { options, value, onChange },
  ref,
) {
  return (
    <select ref={ref} className={styles.input} value={value} onChange={(event) => onChange?.(event.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
});
