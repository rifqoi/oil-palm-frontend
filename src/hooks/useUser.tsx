import { useState } from "react";
import { checkUser } from "../libs/api";
import { User } from "../types/User";

export default function useUser() {
  const [user, setUser] = useState<User>();
  const getUser = () => {
    checkUser()
      .then((resp) => {
        if (!resp.ok) {
          localStorage.removeItem("access_token");
          setUser(undefined);
        }

        return resp.json();
      })
      .then((userRsp: User) => {
        setUser(userRsp);
      });
  };

  return [user] as const;
}
