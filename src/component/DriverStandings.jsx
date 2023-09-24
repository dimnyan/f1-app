import { useEffect, useState } from "react";

function DriverStandings() {
  const [dataStandings, setDataStandings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState();

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/driverStandings", {
      method: "GET",
      headers: {
        Accept: "text/plain;charset=UTF-8", // Add the headers here
      },
    })
      .then((response) => response.text())
      .then((data) => {
        const xmlDocument = new DOMParser().parseFromString(
          data,
          "application/xml"
        );
        // console.log(xmlDocument);
        const driverStandingsArray = Array.from(
          xmlDocument.querySelectorAll("DriverStanding")
        );

        const season = xmlDocument
          .querySelector("StandingsTable")
          .getAttribute("season");

        // console.log(driverStandingsArray);
        const driverData = driverStandingsArray.map((standings) => {
          const driver = standings.querySelector("Driver");
          const position = standings.getAttribute("position");
          const points = standings.getAttribute("points");
          const givenName = driver.querySelector("GivenName").textContent;
          const familyName = driver.querySelector("FamilyName").textContent;
          const constructor = standings.querySelector("Constructor");
          const constructorName = constructor.querySelector("Name").textContent;

          return { position, givenName, familyName, points, constructorName };
        });

        setDataStandings(driverData);
        setIsLoading(false);
        setSeason(season);
      });
  }, []);

  // console.log(dataStandings);

  if (isLoading) {
    return (
      <div className="w-full bg-slate-900 h-screen flex items-center justify-center">
        <p className="text-center text-white items-center font-bold text-2xl md:text-4xl">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-mobile md:bg-image bg-fixed bg-center bg-cover">
      <div className="bg-transparent flex flex-wrap justify-center">
        <h1 className="font-bold text-white md:text-center text-2xl p-14 w-full tracking-tight">
          {season} Formula 1 Driver Standing
        </h1>
        <table className=" rounded-xl md:text-lg text-left text-gray-400 w-full m-2 md:w-2/3 ">
          <thead className="text-xs md:text-lg uppercase tracking-widest bg-gray-700/70 text-gray-400">
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
            {dataStandings.map((driver, index) => (
              <tr
                className="text-xs md:text-base border-t bg-gray-900/70 border-gray-700"
                key={index}
              >
                <td className="py-2 pl-2 md:px-6 md:py-3 text-center font-medium  whitespace-nowrap text-white">
                  {driver.position}
                </td>
                <td className="py-2 pl-2 md:px-6 md:py-3 text-white">
                  {driver.givenName} {driver.familyName}
                </td>
                <td className="py-2 pl-2 md:px-6 md:py-3 text-gray-300">
                  {driver.constructorName}
                </td>
                <td className="py-2 px-2 md:px-6 md:py-3 text-center text-white">
                  {driver.points}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DriverStandings;
