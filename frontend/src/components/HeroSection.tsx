import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api";

export default function HeroSection(): JSX.Element {
  const [user, setUser] = useState({ username: "", email: "" });
  const { id } = useParams();

  useEffect(() => {
    getUser(id).then((result) => {
      setUser({
        username: result.data.user.username,
        email: result.data.user.email,
      });
    });
  }, []);

  const fields = [
    {
      fieldName: "Username",
      description: user.username,
    },
    {
      fieldName: "Email address",
      description: user.email,
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to Cromwell
          </p>
          <p className="mt-6 text-lg lg:text-2xl leading-8 text-gray-600">
            We are very excited to welcome you. Please check that your details
            are correct.
            <br />
            If there is anything that does not look right, please get in touch.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <dl className="flex justify-around max-w-none gap-x-8 gap-y-16">
            {fields.map((field) => (
              <div key={field.fieldName} className="flex flex-col items-center">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 lg:text-2xl">
                  {field.fieldName}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 lg:text-xl">
                  <p className="flex-auto">{field.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
