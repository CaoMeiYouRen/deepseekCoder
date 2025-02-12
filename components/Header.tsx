import Image from "next/image";
import Link from "next/link";
import logo from "../public/favicon.ico";
import GithubIcon from "./github-icon";

export default function Header() {
  return (
    <header className="relative mx-auto mt-5 flex w-full items-center justify-center px-2 pb-7 sm:px-4">
      <Link href="/" className="absolute flex items-center gap-2">
        <Image alt="DeepSeek R1 Code Generator Logo" src={logo} className="h-5 w-5" />
        <h1 className="text-xl tracking-tight">
          <span className="text-blue-600">DeepSeek R1</span> Code Generator
        </h1>
      </Link>
      <a
        href="https://github.com/sing1ee/deepseekCoder"
        target="_blank"
        className="ml-auto hidden items-center gap-3 rounded-2xl bg-white px-6 py-2 sm:flex"
      >
        <GithubIcon className="h-4 w-4" />
        <span>GitHub Repo</span>
      </a>
    </header>
  );
}
