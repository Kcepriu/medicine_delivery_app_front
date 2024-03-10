import { FormEvent } from "react";

export interface FormProps {
  handlerOnSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export interface FormRef {
  submitForm: () => void;
}
