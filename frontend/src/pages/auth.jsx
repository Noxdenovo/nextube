import { useState, useContext } from "react";
import { useParams, Navigate } from "react-router";
import { Link } from "react-router";
import { AuthContext } from "../context";

export default function Auth() {
  const params = useParams();

  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const action = params.action;

  const [isRegistered, setRegistered] = useState(false);
  const [isAuthenticated, setAuthenticated] = useContext(AuthContext);

  function handleChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    setFields({ ...fields, [field]: value });
  }
  async function handleSubmit(e) {
    let newErrorState = {};

    e.preventDefault();
    setErrors("");
    if (action === "register") {
      if (!handleValidation()) {
        return;
      }
    }

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch(`http://localhost:5000/videos/api/auth/${action}`, {
      method: form.method,
      body: formData,
      credentials: "include",
    });
    const responseJson = await response.json();
    const message = responseJson.detail;
    resetForm();

    if (response.status == 400) {
      newErrorState = { ...errors, server: `${message}` };
      setErrors(newErrorState);
    }
    if (response.status == 200 && action === "login") {
      setAuthenticated(true);
    }
    if (response.status == 200 && action === "register") {
      setRegistered(true);
      console.log(isRegistered);
    }

    e.target.reset();
  }
  function resetForm() {
    setFields({});
    setErrors({});
  }
  function handleValidation() {
    let isFormValid = true;
    const newErrorState = {};
    if (!fields.username) {
      newErrorState.username = "Username can't be blank";

      isFormValid = false;
    } else if (fields.username) {
      if (!fields.username.match(/^[a-zA-Z0-9_]+$/)) {
        newErrorState.username = "Username can only contain letters, numbers and underscores";

        isFormValid = false;
      }
    }

    if (!fields.email) {
      newErrorState.email = "Email can't be blank";

      isFormValid = false;
    }

    if (fields.email) {
      if (!fields.email.match(/^.+@.*\.[a-z]{2,3}/)) {
        (newErrorState.email = "Please enter a valid email such as example.com@mail.com"),
          (isFormValid = false);
      }
    }
    if (!fields.passwordField) {
      newErrorState.passwordField = "Password cannot be empty";

      isFormValid = false;
    }
    if (fields.passwordField) {
      if (!fields.passwordField.match(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#=]).*)$/)) {
        (newErrorState.passwordField =
          "Password needs to have at least one uppercase letter, one lowercase letter and one special symbol"),
          (isFormValid = false);
      }
    }
    if (fields.passwordField && fields.passwordCheck != fields.passwordField) {
      newErrorState.passwordCheck = "Passwords need to match";
      isFormValid = false;
    }
    console.log(newErrorState);
    setErrors(newErrorState);

    return isFormValid;
  }
  return (
    <>
      <div className="body-div min-h-screen flex justify-center items-center  bg-gray-200">
        {isAuthenticated === false ? (
          <>
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="flex flex-col p-12 pb-4 pt-8 bg-white shadow-lg max-w-sm"
            >
              <h1 className="text-center text-2xl mb-4">
                Welcome back! <br></br> Please sign {action === "login" ? "in" : "up"}
              </h1>
              <AuthUserInput
                id="username"
                labelText="Username"
                errors={errors}
                handleChange={handleChange}
                placeholder="Type in your username"
                type="text"
              />

              {action === "register" ? (
                <>
                  <AuthUserInput
                    id="email"
                    labelText="E-mail"
                    errors={errors}
                    handleChange={handleChange}
                    placeholder="Type in your e-mail"
                    type="text"
                  />
                </>
              ) : (
                <></>
              )}
              <AuthUserInput
                id="passwordField"
                labelText="Password"
                errors={errors}
                handleChange={handleChange}
                placeholder="Type in your password"
                type="password"
              />

              {action === "register" ? (
                <AuthUserInput
                  id="passwordCheck"
                  labelText="Re-enter password"
                  errors={errors}
                  handleChange={handleChange}
                  placeholder="Re-enter your password"
                  type="password"
                />
              ) : (
                <></>
              )}

              <input
                type="submit"
                className="border-gray-200 border rounded bg-blue-500 hover:bg-blue-600 pl-1 active:bg-blue-700 text-white w-72 h-12 mt-8 mb-2"
                value={action === "login" ? "Sign in" : "Sign up"}
              ></input>
              <p className="error-message text-center text-red-600 min-h-12 mt-2">
                {errors.server && errors.server}{" "}
              </p>
              {action === "login" ? (
                <span>
                  Don't have an account?{" "}
                  <Link
                    onClick={resetForm}
                    className="text-blue-500 hover:text-blue-700"
                    to="/auth/register"
                  >
                    {" "}
                    Sign up
                  </Link>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <Link
                    onClick={resetForm}
                    className="text-blue-500 hover:text-blue-700"
                    to="/auth/login"
                  >
                    Sign in
                  </Link>
                </span>
              )}
            </form>
          </>
        ) : (
          <>
            <Navigate to="/upload" />
          </>
        )}
      </div>
    </>
  );
}
export function Logout({ setAuthenticated }) {
  async function handleLogout() {
    const response = await fetch("http://localhost:5000/videos/api/auth/logout", {
      credentials: "include",
    });
    const responseJson = await response.json();
    const message = responseJson.detail;
    console.log(message);
    setAuthenticated(false);
  }
  return (
    <>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}
export function AuthUserInput({ id, labelText, errors, handleChange, placeholder, type }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={`${id}`} className="text-sm font-semibold mt-4">
        {labelText}
      </label>
      <label className="text-xs text-red-500  " htmlFor={`${id}`}>
        {errors[id]}
      </label>

      <input
        className={
          (errors[id] ? "ring-red-500 ring-2" : "") +
          " bg-gray-200 rounded h-12 pl-2 focus:outline-none focus:ring-2 mt-2 w-72"
        }
        id={`${id}`}
        onChange={handleChange}
        type={type}
        name={`${id}`}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
