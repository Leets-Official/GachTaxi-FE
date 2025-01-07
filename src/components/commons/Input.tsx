import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string | React.ReactNode;
  type: string;
  autoFocus?: boolean;
  maxLength?: number;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  value?: string;
}

function Input<T extends FieldValues>({
  control,
  name,
  label,
  type,
  autoFocus = false,
  maxLength,
  className,
  labelClassName,
  placeholder,
  value,
}: InputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          {type === 'radio' ? (
            <>
              <label
                htmlFor={`${name}-${value}`}
                className={`${field.value === value ? 'text-black' : 'text-white'} font-medium text-body ${labelClassName}`}
              >
                {label}
              </label>
              <input
                autoFocus={autoFocus}
                maxLength={maxLength}
                id={`${name}-${value}`}
                type={type}
                value={value}
                checked={field.value === value}
                onChange={(e) => field.onChange(e.target.value)}
                className={className}
              />
            </>
          ) : (
            <div className="flex flex-col">
              <label
                htmlFor={name.toString()}
                className={`text-white font-medium text-[14px] mb-3 ${labelClassName}`}
              >
                {label}
              </label>
              <input
                autoFocus={autoFocus}
                maxLength={maxLength}
                id={name.toString()}
                type={type}
                placeholder={placeholder}
                className={`border outline-none border-textDarkGray bg-transparent rounded-common p-3 pl-4 text-textDarkGray placeholder:text-body ${className ? className : ''}`}
                {...field}
              />
              {fieldState.error && (
                <p className="text-red-500 mt-3">{fieldState.error.message}</p>
              )}
            </div>
          )}
        </>
      )}
    />
  );
}

export default Input;
