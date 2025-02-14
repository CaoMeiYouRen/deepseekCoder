import Link from "next/link";
import GithubIcon from "./github-icon";

export default function Header() {
  return (
    <header className="relative mx-auto mt-5 flex w-full items-center justify-between px-2 pb-7 sm:px-4" role="banner">
      <nav aria-label="main navigation">
        <ul className="flex gap-8">
          <li>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-xl tracking-tight">
                DeepSeek R1 Code Generator
              </span>
            </Link>
          </li>
          <li>
            <Link 
              href="/deepseek-image-generator" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-xl tracking-tight">
                DeepSeek Image Generator
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <a
        href="https://github.com/sing1ee/deepseekCoder"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden items-center gap-3 rounded-2xl bg-white px-6 py-2 sm:flex"
        aria-label="访问 GitHub 仓库"
      >
        <GithubIcon className="h-4 w-4" aria-hidden="true" />
        <span>GitHub Repo</span>
      </a>
    </header>
  );
}
