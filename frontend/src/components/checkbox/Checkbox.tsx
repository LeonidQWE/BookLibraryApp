import s from './Checkbox.module.css';

type CheckboxProps = {
  labelText: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ labelText, value, onChange }: CheckboxProps) => {
  return (
    <label className={s.checkbox}>
      <input
        className={s.input}
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      <span>{labelText}</span>
    </label>
  );
};
