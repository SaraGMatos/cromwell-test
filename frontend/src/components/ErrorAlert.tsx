export function ErrorAlert({ message }: { message: string }): JSX.Element {
  return (
    <section className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm md:text-md lg:text-lg font-medium text-red-800">
            {message}
          </h3>
        </div>
      </div>
    </section>
  );
}
