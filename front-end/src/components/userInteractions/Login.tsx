import { PATHNAMES, USER_FORM_TYPE } from "@/utils/enums";
import UserFormLayout from "./UserFormLayout";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { LoginDataType } from "@/utils/types";

const Login = (props: any) => {
  const router = useRouter();

  const logInUserRequest = async (_values: any) => {
    const responce = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: _values.email,
        password: _values.password,
      }),
    });
    const data: LoginDataType = await responce.json();
    console.log("In request: " + data);

    if (!data) throw new Error("Unable to login!");
    return data;
  };

  const processLogin = async (_values: any) => {
    try {
      const data = await logInUserRequest(_values);
      const expirationDate = Date.now() + 5 * 24 * 60 * 60 * 1000; /// 5 days from now

      Cookies.set("isLoggedIn", "true", { expires: expirationDate });
      Cookies.set("isAdmin", (data?.user?.role == "admin").toString()),
        { expires: expirationDate };
      Cookies.set("token", new String(data?.token).toString(), {
        expires: expirationDate,
      });
      Cookies.set("user", JSON.stringify(data?.user), {
        expires: expirationDate,
      });

      router.push(PATHNAMES.WORKSHOPS);
    } catch (e) {
      console.log(e);
    }
  };

  const processSubmit = async (_values: any) => {
    processLogin(_values);
  };

  return (
    <UserFormLayout formType={USER_FORM_TYPE.LOGIN} onSubmit={processSubmit} />
  );
};
export default Login;
