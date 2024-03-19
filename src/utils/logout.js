import { redirect } from "react-router-dom";

const logout = () => {
  localStorage.removeItem("user");
  return redirect("/");
};

export { logout };
