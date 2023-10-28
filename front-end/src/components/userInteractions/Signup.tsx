import { PATHNAMES, USER_FORM_TYPE } from "@/utils/enums";
import UserFormLayout from "./UserFormLayout";
import Cookies from "js-cookie";
import { LoginDataType } from "@/utils/types";
import router from "next/router";

const Signup = (props: any) => {
  const signupUserRequest = async (_values: any) => {
    const responce = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: _values.name,
        email: _values.email,
        password: _values.password,
      }),
    });
    const data: LoginDataType = await responce.json();
    if (!data) throw new Error("Unable to login!");
    return data;
  };

  const processSignup = async (_values: any) => {
    try {
      const data = await signupUserRequest(_values);

      Cookies.set("isLoggedIn", "true", { expires: 7 });
      Cookies.set("isAdmin", (data?.user?.role == "admin").toString()),
        { expires: 7 };
      Cookies.set("token", new String(data?.token).toString(), { expires: 7 });
      Cookies.set("user", JSON.stringify(data?.user), { expires: 7 });

      router.push(PATHNAMES.WORKSHOPS);
    } catch (e) {
      console.log(e);
    }
  };
  const processSubmit = (_values: any) => {
    processSignup(_values);
  };

  return (
    <UserFormLayout formType={USER_FORM_TYPE.SIGNUP} onSubmit={processSubmit} />
  );
};
export default Signup;
