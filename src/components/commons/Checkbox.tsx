import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface BaseCheckboxProps {
  label?: string;
}

interface ControlledCheckboxProps<T extends FieldValues>
  extends BaseCheckboxProps {
  control: Control<T>;
  name: Path<T>;
  onChange?: never;
  checked?: never;
}

interface UncontrolledCheckboxProps extends BaseCheckboxProps {
  control?: never;
  name?: never;
  onChange: (checked: boolean) => void;
  checked: boolean;
}

type CheckboxProps<T extends FieldValues> =
  | ControlledCheckboxProps<T>
  | UncontrolledCheckboxProps;

function Checkbox<T extends FieldValues>(props: CheckboxProps<T>) {
  const CheckboxContent = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <label
      className="flex items-center cursor-pointer gap-2 w-full"
      onClick={() => onChange(!checked)}
    >
      <div className="w-5 h-5 border-2 rounded-full flex items-center justify-center">
        {checked && <div className="w-4 h-4 bg-primary rounded-full" />}
      </div>
      {props.label && (
        <span
          className={`${'control' in props ? 'font-medium text-body' : 'font-semibold text-captionHeader'}`}
        >
          {props.label}
        </span>
      )}
    </label>
  );

  if ('control' in props && props.control) {
    return (
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <CheckboxContent checked={field.value} onChange={field.onChange} />
        )}
      />
    );
  }

  return <CheckboxContent checked={props.checked} onChange={props.onChange} />;
}

export default Checkbox;
