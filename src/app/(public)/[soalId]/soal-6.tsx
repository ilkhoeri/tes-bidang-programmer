import Link from 'next/link';

export function Field6() {
  return (
    <div className="font-mono flex flex-col [&_span]:mt-4">
      <span className="">Field A:</span>
      <div>
        Pembuatan akun, dapat anda temukan di halaman
        <DirectTo href="/auth/sign-up" />
      </div>

      <span className="">Field B:</span>
      <div>
        Login, dapat anda temukan di halaman <DirectTo href="/auth/sign-in" />
      </div>
    </div>
  );
}
function DirectTo(props: { href: string }) {
  return (
    <Link
      className="ml-2 text-blue-500 hover:text-underline hover:underline underline-offset-2"
      href={props.href}
    >
      {props.href}
    </Link>
  );
}
