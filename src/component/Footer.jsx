function Footer() {
  return (
    <footer className="text-white py-6 bg-gray-900  top-0 left-0 border-b border-gray-900 ">
      <div className="px-7 pt-2 pb-10 lg:w-2/3 mx-auto">
        <h2 className="font-bold md:mx-auto text-lg w-min pb-3">Socials</h2>
        <ul className="w-min md:flex md:gap-10 md:mx-auto md:pt-5">
          <li className="w-min pb-1">
            <a
              className="font-bold underline w-max"
              href="https://www.github.com/dimnyan"
            >
              Github
            </a>
          </li>
          <li className="w-min pb-1">
            <a
              className="font-bold underline w-max"
              href="https://www.linkedin.com/in/nyomanlanang"
            >
              LinkedIn
            </a>
          </li>
          <li className="w-min pb-1">
            <a
              className="font-bold underline w-max"
              href="https://www.instagram.com/dimnyan"
            >
              Instagram
            </a>
          </li>
          <li className="w-min pb-1">
            <a
              className="font-bold underline w-max"
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
  );
}

export default Footer;
