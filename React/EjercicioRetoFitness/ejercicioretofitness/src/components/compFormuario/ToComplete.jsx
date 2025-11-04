import { useFormContext } from "react-hook-form";

export default function ToComplete({ name, label, type = "text", condiciones = {} }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors && errors[name];

  return (
    <div className={`to-complete ${error ? "has-error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        {...register(name, condiciones)}
        aria-invalid={!!error}
        className="to-complete-input"
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}
