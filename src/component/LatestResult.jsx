import { useEffect, useState } from "react";

function LatestResult() {
  const [resultData, setResultData] = useState();

  useEffect(() => {
    fetch("http://ergast.com/api/f1/current/last/results")
      .then((response) => response.text())
      .then((data) => {
        const xmlDocument = new DOMParser().parseFromString(
          data,
          "application/xml"
        );
        const resultDataArray = Array.from(
          xmlDocument.querySelectorAll("Result")
        );
        console.log(resultDataArray);

        const resultLatestData = resultDataArray.map((result) => {
            const driver
        })
      });
  });
  return (
    <div className="w-full bg-image bg-fixed bg-center bg-cover">
      <div className="flex flex-wrap justify-center">
        <h1 className="font-bold text-black md:text-center text-2xl px-2 sm:px-14 py-14 w-full tracking-tight">
          Header
        </h1>
        <table className=" rounded-xl md:text-lg text-left text-gray-400 w-full m-2 md:w-4/5 ">
          <thead className="text-xs md:text-lg uppercase tracking-widest bg-gray-900/90 text-gray-400">
            <tr>
              <th
                scope="col"
                className="py-2 pl-2 md:px-6 md:py-3 text-white  text-center"
              >
                Pos
              </th>
              <th scope="col" className="py-2 pl-2 md:px-6 md:py-3 text-white">
                Name
              </th>
              <th scope="col" className="py-2 pl-2 md:px-6 md:py-3 text-white">
                Constructor
              </th>
              <th
                scope="col"
                className="py-2 px-2 md:px-6 md:py-3 text-white  text-center"
              >
                Points
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Profile
              </th> */}
            </tr>
          </thead>
          <tbody>
            <tr
              className="text-xs md:text-base border-t bg-gray-900/80 border-gray-700"
              //   key={index}
            >
              <td className="py-2 pl-2 md:px-6 md:py-3 text-center font-medium  whitespace-nowrap text-white">
                pos
              </td>
              <td className="py-2 pl-2 md:px-6 md:py-3 text-white">
                nama driver
              </td>
              <td className="py-2 pl-2 md:px-6 md:py-3 text-gray-300">
                nama const
              </td>
              <td className="py-2 px-2 md:px-6 md:py-3 text-center text-white">
                poin
              </td>
              {/* <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 text-blue-500 hover:underline"
                >
                  View
                </a>
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LatestResult;
