import { ChangeEvent, FormEvent, useState } from "react";
import { createUser } from "../api";

export function RegisterPage(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameInputError, setUsernameInputError] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");

  function handleSubmit(event: FormEvent): void {
    event?.preventDefault();
    createUser(username, email, password);
  }

  function handleUsernameBlur(): void {
    if (username.length < 7) {
      setUsernameInputError(
        "Please make sure your username matches the requirements."
      );
    } else {
      setUsernameInputError("");
    }
  }

  function handleEmailBlur(): void {
    const emailRegexPattern = /^[\w-\.]+@([\w-]+\.)+[\w]{2,4}$/g;
    if (!emailRegexPattern.test(email)) {
      setEmailInputError("Please make sure you are entering a valid email.");
    } else {
      setEmailInputError("");
    }
  }

  function handlePasswordBlur(): void {
    const passwordRegexPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/g;

    if (!passwordRegexPattern.test(password)) {
      setPasswordInputError(
        "Please make sure your password matches the requirements."
      );
    } else {
      setPasswordInputError("");
    }
  }

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
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
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
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {usernameInputError && (
                  <p className="text-[13px] text-red-500">
                    {usernameInputError}
                  </p>
                )}
                <label
                  htmlFor="username"
                  className="block text-[12px] font-medium leading-6 text-gray-600"
                >
                  Please ensure your username is at least 7 characters long
                </label>
              </div>
            </div>

            <div>
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
                  type="email"
                  value={email}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value);
                  }}
                  onBlur={handleEmailBlur}
                  required
                  className="block w-full rounded-md border-0 py-1.5 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {emailInputError && (
                  <p className="text-[13px] text-red-500">{emailInputError}</p>
                )}
              </div>
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
                <label
                  htmlFor="email"
                  className="block text-[12px] font-medium leading-6 text-gray-600"
                >
                  Please ensure your password is minimum 10 characters long and
                  contains at least a number and a capitalised letter
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in here!
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
