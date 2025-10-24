import s from './CommonField.module.css';

type FieldType = 'text' | 'password' | 'email' | 'number';

type CommonFieldProps = {
  id?: string;
  value?: string;
  setValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
  type?: FieldType;
  placeholder?: string;
};

export const CommonField = ({
  id,
  value,
  setValue,
  labelText,
  type = 'text',
  placeholder = '',
}: CommonFieldProps) => {
  return (
    <div className={s.field} data-testid="field">
      <label htmlFor={id} className={s.fieldLabel} data-testid="label">
        {labelText}
      </label>
      <input
        data-testid="input"
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue && setValue(e)}
        className={s.fieldInput}
      />
    </div>
  );
};
