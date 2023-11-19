import Link from "next/link";

export const Header = () => (
  <div className="navbar bg-base-100">
    <div className="flex-1">
      <Link href="/explore" className="btn btn-ghost text-xl">
        Explore
      </Link>

      <Link href="/create" className="btn btn-ghost text-xl">
        Create
      </Link>
    </div>
    <div className="flex-none gap-2">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
      </div>
    </div>
  </div>
);
