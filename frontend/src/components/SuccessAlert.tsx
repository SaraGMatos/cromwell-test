export default function SuccessAlert({
  message,
}: {
  message: string;
}): JSX.Element {
  return (
    <section className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="ml-3">
          <div className="mt-2 text-sm text-green-700">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
