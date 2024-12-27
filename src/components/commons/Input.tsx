import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type: string;
  autoFocus?: boolean;
  maxLength?: number;
  className?: string;
}

function Input<T extends FieldValues>({
  control,
  name,
  label,
  type,
  autoFocus,
  maxLength,
  className,
}: InputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <label htmlFor={name.toString()}>{label}</label>
          <input
            autoFocus={autoFocus}
            maxLength={maxLength}
            id={name.toString()}
            type={type}
            className={`border outline-none ${fieldState.error ? 'border-red-500' : ''} ${className ? className : ''}`}
            {...field}
          />
          {fieldState.error && (
            <p className="text-red-500">{fieldState.error.message}</p>
          )}
        </>
      )}
    />
  );
}

export default Input;
