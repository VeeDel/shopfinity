import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import { ShopContext } from "../context/ShopContext";

export default function SignUp() {
  const navigater = useNavigate();
  const { handleSubmit, error, submitButtonDisabled, handleLogout } =
    useContext(ShopContext);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmitButton = (e) => {
    e.preventDefault();
    handleSubmit(values.name, values.email, values.password);
    navigater("/");
  };

  return (
    <div>
      <h4>SignUp</h4>
      <form id="signup-Form" onSubmit={handleSubmitButton}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="emailHelp"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
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
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
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
        <b>
          <p>{error}</p>
        </b>
        <button
          disabled={submitButtonDisabled}
          type="submit"
          className={`btn ${
            submitButtonDisabled ? "btn-grey" : "btn-primary"
          } submitdisabled`}
        >
          SignUp
        </button>
      </form>
      <h6 className={styles.singupHere}>
        Already have an account?
        <mark>
          <Link to="/login">Log in</Link>
        </mark>
        Here
      </h6>
    </div>
  );
}
