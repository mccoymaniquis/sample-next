import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// hooks/useInitializeUser.ts
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "@/reducers/User";
import { useGetUserDetails } from "@/services/queries/users";

type DecodedToken = {
  sub: string;
  exp: number;
};

export function useInitializeUser() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line node/no-process-env
    const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME || "accessToken";
    const token = Cookies.get(cookieName);
    if (!token)
      return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded?.sub) {
        // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
        setEmail(decoded.sub);
      }
    }
    catch (err) {
      console.error("Invalid token", err);
      Cookies.remove(cookieName);
    }
  }, []);

  const { data } = useGetUserDetails({ email });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);
}
