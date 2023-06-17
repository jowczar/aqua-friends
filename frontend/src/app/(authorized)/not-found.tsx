import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center gap-2 flex-col h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold">Not found – 404!</h1>
      <div className="underline text-sm hover:text-primary">
        <Link href="/">Go back to Home</Link>
      </div>
    </div>
  );
}
