import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <h1 className="font-serif text-4xl font-light tracking-tight">Account</h1>
      <p className="mt-4 text-sm leading-relaxed text-taupe">
        Accounts and sign-in are not connected yet in this prototype. Wire this page up to your
        authentication provider (e.g. your commerce backend&rsquo;s customer accounts, or a
        service like Clerk/Auth.js) to enable order history, saved addresses and sign-in.
      </p>
    </div>
  );
}
