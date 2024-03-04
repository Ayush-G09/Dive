import { Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { loginEndpoint, setClientToken} from "../../spotify";
import { useNavigate } from "react-router-dom";

type State = {
  token: string | null;
}

function Login() {

  const [state, setState] = useState<State>({
    token: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setState((prev) => ({
        ...prev,
        token: token,
      }));
      setClientToken(_token);
      navigate("/discover");
    } else {
      setState((prev) => ({
        ...prev,
        token: token,
      }));
      setClientToken(token);
      if(token){
        navigate("/discover");
      }
    }
  }, []);

  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <img
        src="https://e0.pxfuel.com/wallpapers/743/1007/desktop-wallpaper-music-is-pure-awesome-fullwpp-full-music-music-background-cool-digital-music.jpg"
        alt="Dive-music"
        style={{
          width: "10em",
          height: "10em",
          objectFit: "cover",
          borderRadius: "6px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        }}
      />
      <Typography variant="h5" color={"white"}>
        Dive
      </Typography>
      <Button sx={{ marginTop: 5 }} variant="contained" href={loginEndpoint}>
        Login
      </Button>
    </Container>
  );
}

export default Login;
