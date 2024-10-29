import toast from "react-hot-toast";
import { IApiResponse } from "../interfaces/apiResponse";

const handleResponse = async <T>(data: IApiResponse<T>) => {
  try {
    if (data && data?.success) {
      toast.success(`${data.message}`);
    } else {
      toast.error(`${data?.message}.`);
      if (Array.isArray(data?.errorMessages)) {
        data.errorMessages.forEach((e) => {
          const errorMessage = e?.message ? `${e.message}.` : "Unknown error.";
          const errorPath = e?.path ? ` path: ${e.path}` : "";
          toast.error(`${errorMessage}${errorPath}`);
        });
      }
    }
  } catch (error) {
    console.error("Failed to perform operation:", error);
  }
};

export default handleResponse;
