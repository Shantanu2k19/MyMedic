//import Image from "next/image";
import Link from "next/link";
import '../globals.css'

export default function Root() {
  console.log("root-page.tsx")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link className="text-sm mt-3 text-right" href={'/home'}>
        MyMedic 
        <span className="underline">
            [ Login ]
        </span>
      </Link>
    </main>
  );
}
