import { useEffect, useState } from "react";
import Loading from "./Loading";

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
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center">
        <h1 className="font-bold text-center text-2xl px-2 sm:px-14 py-14 w-full tracking-tight mt-8 text-red-500 2xl:text-4xl">
          {season} Driver Standings
        </h1>
        <div className="rounded-xl mx-2 my-10 border-red-500 border-2">
          <table className=" table-width sm:text-lg text-left ">
            <thead className="text-xs md:text-lg uppercase tracking-widest text-red-600 2xl:text-2xl">
              <tr>
                <th
                  scope="col"
                  className="py-2 pl-2 md:px-6 md:py-3  text-center"
                >
                  Pos
                </th>
                <th scope="col" className="py-2 pl-2 md:px-6 md:py-3">
                  Name
                </th>
                <th scope="col" className="py-2 pl-2 md:px-6 md:py-3 xl:pr-32">
                  Constructor
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 md:px-6 md:py-3 text-center"
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
                  className={`text-xs md:text-base border-t border-red-600 hover:bg-red-500 hover:text-white  xl:text-xl 2xl:text-2xl ${
                    index === 0 ? "font-bold" : ""
                  }`}
                  key={index}
                >
                  <td className="py-2 pl-2 md:px-6 md:py-3 text-center font-medium whitespace-nowrap">
                    {driver.position}
                  </td>
                  <td className="py-2 pl-2 md:px-6 md:py-3 xl:pr-20">
                    {driver.givenName} {driver.familyName}
                  </td>
                  <td className="py-2 pl-2 md:px-6 md:py-3">
                    {driver.constructorName}
                  </td>
                  <td className="py-2 px-2 md:px-6 md:py-3 text-center">
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
    </div>
  );
}

export default DriverStandings;
