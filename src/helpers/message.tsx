import { Notify } from "notiflix/build/notiflix-notify-aio";

export const showErrorMessage = (message: string) => {
  Notify.failure(message, { position: "center-top", timeout: 2000 });
};
