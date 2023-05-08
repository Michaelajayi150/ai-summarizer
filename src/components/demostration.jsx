import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

function Demostration() {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState(false);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles"));

    if (storedArticles) {
      setAllArticles(storedArticles);
    }
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();
    let checked = allArticles.some((summary) => summary.url === article.url);
    if (!checked) {
      const { data } = await getSummary({ articleUrl: article.url });

      if (data?.summary) {
        const newArticle = { ...article, summary: data.summary };

        setArticle(newArticle);
        setAllArticles((prev) => [...prev, newArticle]);
        localStorage.setItem(
          "articles",
          JSON.stringify([newArticle, ...allArticles])
        );
      }
    }
  };

  const handleCopy = (url) => {
    setCopied(true);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <section className="mt-4 w-full max-w-xl mx-auto">
      <div className="relative w-full z-10">
        <form onSubmit={handleSumbit} className="relative w-full z-10">
          <img
            src={linkIcon}
            alt="Paste a link"
            className="absolute w-5 top-1/2 -translate-y-1/2 left-3"
          />
          <input
            type="text"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0 peer"
            required
          />
          <button
            type="submit"
            className="hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center font-sans text-sm font-medium text-gray-400"
          >
            ↵
          </button>
        </form>
        {/* Browsers History */}
        <div className="flex flex-col max-h-60 overflow-y-auto gap-1 mt-4">
          {allArticles.map((article, index) => (
            <div
              key={index}
              className="p-3 flex items-center bg-white border border-gray-200 gap-2 rounded-lg cursor-pointer"
            >
              <div
                className={`w-7 h-7 rounded-full flex justify-center items-center cursor-pointer hover:bg-slate-300 ${
                  copied && "bg-slate-300"
                }`}
                onClick={() => handleCopy(article.url)}
              >
                <img
                  src={copied ? tick : copy}
                  alt={article.url.split(" ")[0]}
                />
              </div>
              <div className="link-url" onClick={() => setArticle(article)}>
                {article.url}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Result */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img
            src={loader}
            alt="summarizing articles..."
            className="w-20 h-20 object-contain"
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that was not supposed to happen... <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article{" "}
                <font className="font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Summary
                </font>
              </h2>
              <div className="rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default Demostration;
