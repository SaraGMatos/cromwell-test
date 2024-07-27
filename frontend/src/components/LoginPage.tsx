import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "./ErrorAlert";

export function LoginPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event: FormEvent): void {
    event?.preventDefault();
    loginUser(email, password)
      .then(() => {
        setIsLoginError(false);
      })
      .catch((error) => {
        setIsLoginError(true);

        error.response.status === 404
          ? setErrorMessage("User not found, please sign up instead.")
          : setErrorMessage("Invalid email or password.");
      });
  }

  function handleEmailBlur(): void {
    const emailRegexPattern = /^[\w-\.]+@([\w-]+\.)+[\w]{2,4}$/g;

    if (!emailRegexPattern.test(email)) {
      setIsButtonDisabled(true);
      setEmailInputError("Invalid email.");
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
      setPasswordInputError("Invalid password.");
    } else {
      setIsButtonDisabled(false);
      setPasswordInputError("");
    }
  }

  useEffect(() => {
    if (emailInputError || passwordInputError) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [isButtonDisabled]);

  return (
    <section className="h-full bg-white">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="object-contain"
            src="https://i.postimg.cc/t4P6fw7X/Cromwell-Logo.png"
            alt="Cromwell Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              {isLoginError && <ErrorAlert message={errorMessage} />}
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value);
                  }}
                  onBlur={handleEmailBlur}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {emailInputError && (
                <p className="text-[13px] text-red-500">{emailInputError}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {passwordInputError && (
                  <p className="text-[13px] text-red-500">
                    {passwordInputError}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up here!
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
