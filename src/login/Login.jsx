import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../fireBase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!values.email || !values.password) {
      setError("Please fill in all the fields");
      return;
    }
    setError("");
    setSubmitButtonDisabled(true);
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setSubmitButtonDisabled(false);
      const user = res.user;
      console.log(user);

      navigate("/");
    } catch (err) {
      setError(err.message);
      setSubmitButtonDisabled(false);
    }
  };
  return (
    <div>
      <h4>Login</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>

        <p>{error}</p>
        <button
          disabled={submitButtonDisabled}
          type="submit"
          className={`btn ${
            submitButtonDisabled ? "btn-grey" : "btn-primary"
          } submitdisabled`}
        >
          {!submitButtonDisabled ? "Login" : "wait..."}
        </button>
      </form>
      <h6 className={styles.singupHere}>
        Don't Have an account?{" "}
        <mark>
          {" "}
          <Link to={"/signup"}>Sign Up</Link>
        </mark>{" "}
        Here
      </h6>
    </div>
  );
}
