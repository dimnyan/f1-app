function Footer() {
  return (
    <>
      <footer className="text-white pb-6 pt-3 bg-gray-900  top-0 left-0 border-b border-gray-900 ">
        <div className="px-7 pt-2 pb-8 md:pb-6 lg:w-2/3 mx-auto">
          <h2 className="font-bold mx-auto text-lg w-max pb-3 uppercase">
            My Socials
          </h2>
          <ul className="w-min md:flex md:gap-10 mx-auto md:pt-5">
            <li className="w-min pb-4 pt-3 md:pt-0 mx-auto">
              <a
                className="font-bold underline w-max tracking-wider"
                href="https://www.github.com/dimnyan"
              >
                Github
              </a>
            </li>
            <li className="w-min pb-4 mx-auto">
              <a
                className="font-bold underline w-max tracking-wider"
                href="https://www.linkedin.com/in/nyomanlanang"
              >
                LinkedIn
              </a>
            </li>
            <li className="w-min pb-4 mx-auto">
              <a
                className="font-bold underline w-max tracking-wider"
                href="https://www.instagram.com/dimnyan"
              >
                Instagram
              </a>
            </li>
            <li className="w-min pb-4 mx-auto">
              <a
                className="font-bold underline w-max tracking-wider"
                href="https://www.twitter.com/dimnyomm"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center">
          &copy; 2023&#160;
          <a
            href="https://dimnyan.tech"
            rel="noopener noreferrer"
            target="_blank"
            className=" underline"
          >
            dimnyan
          </a>
          . All rights reserved.
        </div>
      </footer>
      <div className="text-center w-full">
        Powered by{" "}
        <a
          href="http://ergast.com/mrd/"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          Ergast API
        </a>
      </div>
    </>
  );
}

export default Footer;
