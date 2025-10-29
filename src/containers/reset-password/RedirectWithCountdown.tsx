/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const REDIRECT_ROUTE = "/login";

const RedirectWithCountdown: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(3);
  const router = useRouter();

  const handleRedirectNow = useCallback(() => {
    Cookies.remove("accessToken", { path: "/" });
    localStorage.clear();
    router.push(REDIRECT_ROUTE);
  }, [router]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (secondsLeft !== 0) {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    const timeout = setTimeout(() => {
      handleRedirectNow();
    }, 5000);

    return () => {
      clearInterval(countdown);
      clearTimeout(timeout);
    };
  }, [router, handleRedirectNow]);

  return (
    <Box
      className="redirect-with-countdown"
      textAlign="center"
      padding="1rem"
      color="black"
    >
      <Typography
        sx={{ fontSize: "0.8rem" }}
        variant="caption"
      >
        You will be redirected to the login page
        {" "}
        {" "}
        <strong>{secondsLeft}</strong>
        {" "}
        seconds.
      </Typography>
      <Box>
        <Typography
          sx={{ fontSize: "0.8rem" }}
          variant="caption"
        >
          If not,
          {" "}
          <Link onClick={() => handleRedirectNow()} sx={{ cursor: "pointer" }}>
            click here.
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RedirectWithCountdown;
