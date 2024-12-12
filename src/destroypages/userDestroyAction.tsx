import { redirect, ActionFunction } from "react-router-dom";
import { deleteUserData } from "@/backendapi/user";
export const action: ActionFunction = async ({ params }) => {
  if (params && params.userId) {
    const data = await deleteUserData(params.userId);
    return data;
  }
  return redirect("/");
};
