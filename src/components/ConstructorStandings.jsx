import { useEffect, useState } from "react";
import Loading from "./Loading";

function ConstructorStandings() {
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [season, setSeason] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/constructorStandings", {
      method: "GET",
      headers: {
        Accept: "text/plain;charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        const xmlDocument = new DOMParser().parseFromString(
          data,
          "application/xml"
        );
        // console.log(xmlDocument);
        const constructorStandingsArrays = Array.from(
          xmlDocument.querySelectorAll("ConstructorStanding")
        );
        const season = xmlDocument
          .querySelector("StandingsTable")
          .getAttribute("season");
        // console.log(constructorStandingsArrays);
        const constructorData = constructorStandingsArrays.map((standings) => {
          const constructor = standings.querySelector("Constructor");
          const wins = standings.getAttribute("wins");
          const points = standings.getAttribute("points");
          const position = standings.getAttribute("position");
          const constructorName = constructor.querySelector("Name").textContent;
          const url = constructor.getAttribute("url");
          // console.log(constructorName);
          return { position, constructorName, wins, points, url };
        });
        // console.log(xmlDocument);
        setConstructorStandings(constructorData);
        setSeason(season);
        setIsLoading(false);
      });
  }, []);
  console.log(constructorStandings);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center ">
        <h1 className="font-bold md:text-center text-2xl px-2 sm:px-14 py-14 w-full tracking-tight mt-8 text-red-500 2xl:text-4xl">
          {season} Formula 1 Constructor Standings
        </h1>
        <div className="rounded-xl mx-2 my-10 border-red-500 border-2">
          <table className=" table-width sm:text-lg text-left">
            <thead className="text-xs md:text-base uppercase tracking-widest text-red-600 2xl:text-2xl">
              <tr>
                <th
                  scope="col"
                  className="py-2 pl-2 md:px-6 md:py-3 text-center"
                >
                  Pos
                </th>
                <th scope="col" className="py-2 pl-2 md:px-6 md:py-3">
                  Name
                </th>
                <th
                  scope="col"
                  className="py-2 pl-2 md:px-6 md:py-3 text-center"
                >
                  Wins
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 md:px-6 md:py-3 text-center"
                >
                  Points
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 md:px-6 md:py-3 text-center"
                >
                  URL
                </th>
              </tr>
            </thead>
            <tbody>
              {constructorStandings.map((constructor, index) => (
                <tr
                  className={`text-xs md:text-base border-t border-red-600 hover:bg-red-500 hover:text-white  xl:text-xl 2xl:text-2xl ${
                    index === 0 ? "font-bold" : ""
                  }`}
                  key={index}
                >
                  <td className="py-2 pl-2 md:px-6 md:py-3 text-center font-medium  whitespace-nowrap">
                    {constructor.position}
                  </td>
                  <td className="py-2 pl-2 md:px-6 md:py-3 xl:pr-20">
                    {constructor.constructorName}
                  </td>
                  <td className="py-2 pl-2 md:px-6 md:py-3 xl:px-20 text-center">
                    {constructor.wins}
                  </td>
                  <td className="py-2 px-2 md:px-6 md:py-3 xl:px-20 text-center">
                    {constructor.points}
                  </td>
                  <td className="py-2 px-2 md:px-6 md:py-3 xl:px-12 text-center underline">
                    <a target="_blank" rel="noreferrer" href={constructor.url}>
                      Visit Wiki
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ConstructorStandings;
