// Header.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let left = (
    <div className="left">
      <Link
        href="/"
        className={`inline-block font-bold no-underline ${
          isActive("/") ? "text-gray-600" : "text-black"
        }`}
      >
        Feed
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div>
        <Link
          href="/"
          className={`inline-block font-bold no-underline ${
            isActive("/") ? "text-blue-600" : "text-black"
          }`}
        >
          Feed
        </Link>
      </div>
    );
    right = (
      <div className="ml-auto">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="ml-auto">
        <Link
          href="/api/auth/signin"
          className={`ml-4 inline-block rounded border border-solid border-black px-4 py-2 no-underline ${
            isActive("/signup") ? "text-gray-600" : "text-black"
          }}`}
        >
          Log in
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="space-x-4">
        <Link
          href="/"
          className={`inline-block font-bold no-underline ${
            isActive("/") ? "text-gray-600" : "text-black"
          }`}
        >
          Feed
        </Link>
        <Link
          href="/drafts"
          className={`inline-block font-bold no-underline ${
            isActive("/drafts") ? "text-gray-600" : "text-black"
          }`}
        >
          My drafts
        </Link>
      </div>
    );
    right = (
      <div className="ml-auto">
        <p className="inline-block pr-4 text-black">
          {session.user.name} ({session.user.email})
        </p>
        <Link
          href="/create"
          className="inline-block rounded border border-solid border-black px-4 py-2 text-black no-underline"
        >
          <button>New post</button>
        </Link>
        <button
          className="ml-4 inline-block rounded border border-solid border-black px-4 py-2"
          onClick={() => signOut()}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <nav className="flex items-center p-8">
      {left}
      {right}
    </nav>
  );
};

export default Header;
