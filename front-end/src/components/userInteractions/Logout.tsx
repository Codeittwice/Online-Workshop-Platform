import Cookies from "js-cookie";
export const logOutUserRequest = async () => {
  //if (!values) return;
  const responce = await fetch("http://localhost:8000/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: Cookies.get("token"),
    }),
  });
  const data = await responce.json();

  return { data: data };
};
