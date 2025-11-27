import { toast } from "sonner";

export const showSuccessAlert = (title: string, message?: string) => {
  toast.success(title, {
    description: message,
  });
};

export const showErrorAlert = (title: string, message?: string) => {
  toast.error(title, {
    description: message,
  });
};

export const showInfoAlert = (title: string, message?: string) => {
  toast.info(title, {
    description: message,
  });
};

export const showWarningAlert = (title: string, message?: string) => {
  toast.warning(title, {
    description: message,
  });
};