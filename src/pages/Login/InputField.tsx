import { FC } from "react";
import { FieldRenderProps } from "react-final-form";

interface InputFieldProps extends FieldRenderProps<string, any> {
  label: string;
  typeField: string;
  meta: {
    error?: string;
    touched?: boolean;
  };
}

const InputField: FC<InputFieldProps> = ({ input, meta, typeField, label }) => {
  return (
    <div className="h-24 flex flex-col mx-auto">
      <label className="left">{label}</label>
      <div>
        <input
          {...input}
          type={typeField}
          className="border border-blue-200 shadow-sm h-10 text-lg w-full"
        />
        {meta.error && meta.touched && (
          <span className="text-red-500 font-semibold">{meta.error}</span>
        )}
      </div>
    </div>
  );
};

export default InputField;
