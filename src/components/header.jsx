import { logo } from "../assets";

function Header() {
  return (
    <>
      <header className="flex justify-between items-center py-3 mb-2">
        <img src={logo} alt="AI article summarizer" />
        <a
          className="px-4 py-1 text-xs rounded-md bg-black text-white"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/Michaelajayi150"
        >
          Github
        </a>
      </header>

      <section className="text-center text-sm">
        <h1 className="text-3xl font-extrabold">
          Summarize Articles with <br className="max-md:hidden" />
          <font className="orange-gradient">OpenAI GPT-4</font>
        </h1>
        <p className="max-w-lg mx-auto mt-1">
          Simplify your reading with Summize, an open source summarizer that
          transforms lengthy articles into clear and concise summaries
        </p>
      </section>
    </>
  );
}

export default Header;
