import { useState } from "react";
import { ErrorMessage, useField, useFormikContext } from "formik";
import Stack from "@mui/material/Stack";

const fieldContainerSx = {
  width: "100%",
};

export default function FloatingLabelField({
  name,
  label,
  type = "text",
  classes,
  showError = true,
  containerSx,
  endAdornment,
  ...inputProps
}) {
  const [field] = useField(name);
  const { errors, touched, submitCount } = useFormikContext();
  const [focused, setFocused] = useState(false);

  const hasError = (touched[name] || submitCount > 0) && errors[name];
  const isActive = focused || field.value;

  const wrapperClass = [
    classes.wrapper,
    isActive && classes.wrapperActive,
    hasError && classes.wrapperError,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClass = [classes.input, endAdornment && classes.inputWithAdornment]
    .filter(Boolean)
    .join(" ");

  return (
    <Stack sx={{ ...fieldContainerSx, ...containerSx }} spacing={0.5}>
      <div className={wrapperClass}>
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
        <input
          {...field}
          {...inputProps}
          id={name}
          name={name}
          type={type}
          className={inputClass}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            field.onBlur(e);
            inputProps.onBlur?.(e);
          }}
        />
        {endAdornment}
      </div>
      {showError && classes.error && (
        <ErrorMessage name={name} component="span" className={classes.error} />
      )}
    </Stack>
  );
}
