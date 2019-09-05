import { useState } from "react";

export const useFormHook = (callback, initialStateVal) => {
  const [Values, setValues] = useState(initialStateVal);

  const onChange = e => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    Values
  };
};
