import { ToastAndroid } from "react-native";
import { ErrorResponse } from "../api/utils";

export const showError = (error: unknown) => {
  ToastAndroid.showWithGravity(
    (error as ErrorResponse).message,
    1000,
    ToastAndroid.BOTTOM
  );
};

export const showMessage = (message: string) => {
  ToastAndroid.showWithGravity(message, 1000, ToastAndroid.BOTTOM);
};
