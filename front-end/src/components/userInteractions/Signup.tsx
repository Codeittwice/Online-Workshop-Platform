import { USER_FORM_TYPE } from "@/utils/enums";
import UserFormLayout from "./UserFormLayout";
import { useQuery } from "react-query";
import { useState } from "react";

const Signup = (props: any) => {
  const [values, setValues] = useState<any>();
  const { isLoading, error, data } = useQuery("signup", () => {
    if (!values) return;

    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    }).then((res) => console.log(res.json()));
  });
  const processSubmit = (_values: any) => {
    setValues(_values);
  };

  return (
    <UserFormLayout formType={USER_FORM_TYPE.SIGNUP} onSubmit={processSubmit} />
  );
};
export default Signup;
