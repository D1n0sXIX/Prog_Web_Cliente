import React from "react";
import { useFormContext } from "react-hook-form";

/**
 * ListCheck
 * Props:
 * - name: string (nombre del campo para react-hook-form)
 * - label: string (etiqueta para el grupo)
 * - options: array (puede ser array de strings o array de objetos { value, label })
 */
export default function ListCheck({ name, label, options = [] }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors && errors[name];

  return (
    <div className={`field list-check ${error ? "has-error" : ""}`}>
      {label && <label>{label}</label>}
      <div className="checkbox-list">
        {options.map((opt, idx) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const lab = typeof opt === "string" ? opt : opt.label;
          return (
            <label key={value + idx} className="checkbox-item">
              <input type="checkbox" value={value} {...register(name)} />
              <span>{lab}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="error">{error.message}</p>}
    </div>
  );
}
