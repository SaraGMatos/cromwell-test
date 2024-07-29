import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createUser } from "../api";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

export function RegisterPage(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [usernameInputError, setUsernameInputError] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [confirmedPasswordInputError, setConfirmedPasswordInputError] =
    useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isResponseSuccessful, setIsResponseSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event: FormEvent): void {
    event?.preventDefault();
    createUser(username, email, password)
      .then(() => {
        setIsRegisterError(false);
        setIsResponseSuccessful(true);

        setTimeout(() => {
          navigate("/login");
        }, 300);
      })
      .catch((error) => {
        setIsRegisterError(true);
        setIsResponseSuccessful(false);

        error.response.status === 409
          ? setErrorMessage(
              "There is an account registered under this email, please log in instead."
            )
          : setErrorMessage("Something went wrong!");
      });
  }

  function handleUsernameBlur(): void {
    if (username.length < 7) {
      setIsButtonDisabled(true);
      setUsernameInputError(
        "Please make sure your username matches the requirements."
      );
    } else {
      setIsButtonDisabled(false);
      setUsernameInputError("");
    }
  }

  function handleEmailBlur(): void {
    const emailRegexPattern = /^[\w-\.]+@([\w-]+\.)+[\w]{2,4}$/g;
    if (!emailRegexPattern.test(email)) {
      setIsButtonDisabled(true);
      setEmailInputError("Please make sure you are entering a valid email.");
    } else {
      setIsButtonDisabled(false);
      setEmailInputError("");
    }
  }

  function handlePasswordBlur(): void {
    const passwordRegexPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/g;

    if (!passwordRegexPattern.test(password)) {
      setIsButtonDisabled(true);
      setPasswordInputError(
        "Please make sure your password matches the requirements."
      );
    } else {
      setIsButtonDisabled(false);
      setPasswordInputError("");
    }
  }

  function handleConfirmedPasswordBlur(): void {
    setIsButtonDisabled(true);
    if (password !== confirmedPassword) {
      setIsButtonDisabled(true);
      setConfirmedPasswordInputError("Passwords do not match.");
    } else {
      setIsButtonDisabled(false);
      setConfirmedPasswordInputError("");
    }
  }

  useEffect(() => {
    if (emailInputError || passwordInputError || confirmedPasswordInputError) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [isButtonDisabled]);

  return (
    <section className="h-full bg-white">
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="object-contain"
            src="https://i.postimg.cc/t4P6fw7X/Cromwell-Logo.png"
            alt="Cromwell's logo - a bright orange capital C in the shape of half a nut"
          />
          <h2 className="mt-10 text-center text-xl lg:text-2xl font-bold leading-9 tracking-tight text-[gray-900]">
            Create an account
          </h2>
        </div>

        <div className="flex flex-col items-center w-full">
          <form
            className="space-y-6 md:w-max md:items-center"
            onSubmit={handleSubmit}
          >
            <div>
              {isRegisterError && <ErrorAlert message={errorMessage} />}
              {isResponseSuccessful && (
                <SuccessAlert
                  message={`Account created! Please proceed to the log in page using the link at the bottom.`}
                />
              )}
              <label
                htmlFor="username"
                className="block text-sm md:text-md lg:text-xl font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setUsername(event.target.value);
                  }}
                  onBlur={handleUsernameBlur}
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm md:text-md lg:text-lg sm:leading-6"
                />
                {usernameInputError && (
                  <p className="text-[13px] md:text-[13px] text-red-500">
                    {usernameInputError}
                  </p>
                )}
                <label
                  htmlFor="username"
                  className="block text-[12px] md:text-[13px] font-medium leading-6 text-gray-600"
                >
                  Please ensure your username is at least 7 characters long
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm md:text-md lg:text-xl font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value);
                  }}
                  onBlur={handleEmailBlur}
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm md:text-md lg:text-lg sm:leading-6"
                />
                {emailInputError && (
                  <p className="text-[13px] md:text-[13px] text-red-500">
                    {emailInputError}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm md:text-md lg:text-xl font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.target.value);
                  }}
                  onBlur={handlePasswordBlur}
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm md:text-md lg:text-lg sm:leading-6"
                />
                {passwordInputError && (
                  <p className="text-[13px] md:text-[13px] lg:text-[13px] text-red-500">
                    {passwordInputError}
                  </p>
                )}
                <label
                  htmlFor="email"
                  className="block text-[12px] md:text-[13px] font-medium leading-6 text-gray-600"
                >
                  Please ensure your password is minimum 10 characters long and
                  contains at least a number and a capitalised letter
                </label>
              </div>
            </div>

            <div>
              <div className="flex-col items-center justify-between">
                <label
                  htmlFor="confirmedPassword"
                  className="block text-sm md:text-md lg:text-xl font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmedPassword"
                  name="confirmedPassword"
                  type="password"
                  value={confirmedPassword}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setConfirmedPassword(event.target.value);
                  }}
                  onBlur={handleConfirmedPasswordBlur}
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm md:text-md lg:text-lg sm:leading-6"
                />
                {confirmedPasswordInputError && (
                  <p className="text-[13px] md:text-[13px] text-red-500">
                    {confirmedPasswordInputError}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="flex w-full justify-center rounded-md bg-[#ff5100] px-3 py-1.5 text-sm md:text-md lg:text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm md:text-md lg:text-lg text-gray-500">
            Already a member?{" "}
            <button
              onClick={() => {
                navigate("/");
              }}
              className="font-semibold leading-6 text-[#ff5100] hover:text-indigo-500"
            >
              Log in here!
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
