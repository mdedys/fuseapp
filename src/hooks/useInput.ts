import { ChangeEventHandler, useCallback, useState } from "react";

type UseInputHook = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  reset(): void;
};

export default function useInput(defaultValue = ""): UseInputHook {
  const [value, setValue] = useState(defaultValue);
  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(evt => {
    setValue(evt.target.value);
  }, []);
  const reset = useCallback(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return { value, onChange, reset };
}
