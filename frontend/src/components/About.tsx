import Header from "./Header";

export default function About(): JSX.Element {
  return (
    <>
      <Header />
      <section className="bg-white py-10">
        <div className="w-full">
          <p className="text-center mt-2 text-3xl font-bold tracking-tight text-[#ff5100] sm:text-4xl">
            Keeping industry working and people safe
          </p>
          <div className="flex flex-col items-center">
            <dl className="mt-10 w-10/12 md:w-7/12 space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              <div className="relative pl-9">
                <dl className="font-semibold text-center text-gray-900">
                  A world-wide network
                </dl>{" "}
                <dd className="inline">
                  With a network of branches and offices in the UK and across
                  the globe, we help keep the vital cogs of industry turning.
                </dd>
              </div>
            </dl>
            <dl className="mt-10 w-10/12 md:w-7/12 space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              <div className="relative pl-9">
                <dl className="text-center font-semibold text-gray-900">
                  An extensive range of products
                </dl>{" "}
                <dd className="inline">
                  We support those who make and manufacture the world around us.
                  We do this by providing easy access to an extensive range of
                  great value, high quality supplies.
                </dd>
              </div>
            </dl>
            <dl className="mt-10 w-10/12 md:w-7/12 space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              <div className="relative pl-9">
                <dt className="text-center font-semibold text-gray-900">
                  Proud to support you
                </dt>{" "}
                <dd className="inline">
                  Always ready to serve. Always committed to supporting our
                  customers as they rise to new challenges – today, tomorrow and
                  beyond.
                </dd>
              </div>
            </dl>
            <dl className="mt-10 w-10/12 md:w-7/12 space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              <div className="relative pl-9">
                <dt className="text-center font-semibold text-gray-900">
                  The Cromwell Difference
                </dt>{" "}
                <dd className="inline">
                  From preventative maintenance to emergency purchases, you can
                  trust us to help keep the wheels of your business turning with
                  minimum fuss.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
