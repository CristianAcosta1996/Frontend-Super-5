import { ChangeEvent, useState } from "react";

export const useForm = <T>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values)
  };

  const reset = (): void => {
    setValues(initialState);
  };

  return {
    values,
    ...values,
    handleInputChange,
    reset,
  };
};
