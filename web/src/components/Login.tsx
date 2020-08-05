import React, { useState, useEffect } from "react";
import { useIsMounted } from "use-is-mounted";
import { setSessionAuth, AuthState } from "../hooks/phoenix/PhoenixAuth";
import { connect } from "../hooks/phoenix/PhoenixConnect";

export const Login = () => {
  const isMounted = useIsMounted();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleLogin = () => {
    setLoading(true);
    connect(email, password)
      .then((res) => {
        if (!isMounted.current) {
          return;
        }

        console.log(res);
        if (
          res.status === 200 &&
          res.statusText === "OK" &&
          res?.data?.data?.user?.email === email
        ) {
          setHelperText("Login Successful");
          setTimeout(() => {
            setLoading(false);
            setSessionAuth(AuthState.User);
          }, 1000);
        }
      })
      .catch((err) => {
        if (!isMounted.current) {
          return;
        }

        setLoading(false);
        setHelperText("Incorrect email or password");
      });
  };

  return (
    <React.Fragment>
      <form
        className="sling-login-form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <p>{helperText}</p>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Enter your password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          onClick={handleLogin}
          disabled={isButtonDisabled || loading}
          value="Login"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
    </React.Fragment>
  );
};
