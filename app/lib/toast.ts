import toast, { ToastOptions } from "react-hot-toast";

class ToastService {
  private defaultOptions: ToastOptions = {
    duration: 3000,
    position: "top-center",
    style: {
      background: "#333",
      color: "#fff",
    },
  };

  success(message: string, options?: ToastOptions) {
    toast.success(message, {
      ...this.defaultOptions,
      ...options,
    });
  }

  error(message: string, options?: ToastOptions) {
    toast.error(message, {
      ...this.defaultOptions,
      ...options,
    });
  }

  warning(message: string, options?: ToastOptions) {
    toast(message, {
      icon: "⚠️",
      ...this.defaultOptions,
      ...options,
    });
  }

  info(message: string, options?: ToastOptions) {
    toast(message, {
      icon: "ℹ️",
      ...this.defaultOptions,
      ...options,
    });
  }

  // predefined global messages
  captchaRequired() {
    this.error("Please complete the reCAPTCHA");
  }

  saved() {
    this.success("Saved successfully");
  }

  deleted() {
    this.success("Deleted successfully");
  }

  serverError() {
    this.error("Something went wrong. Please try again.");
  }
}

export const Toast = new ToastService();
