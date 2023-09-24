import { useEffect, useState } from "react";

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
          // console.log(constructorName);
          return { position, constructorName, wins, points };
        });

        setConstructorStandings(constructorData);
        setSeason(season);
        setIsLoading(false);
      });
  }, []);
  // console.log(constructorData);
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
    <div className="w-full bg-image bg-fixed bg-center bg-cover min-h-screen">
      <div className="flex flex-wrap justify-center ">
        <h1 className="font-bold text-black md:text-center tracking-tight text-2xl p-14 w-full ">
          {season} Formula 1 Constructor Standings
        </h1>
        <table className=" rounded-xl md:text-lg text-left text-gray-400 w-full m-2 md:w-4/5  ">
          <thead className="text-xs md:text-base uppercase tracking-widest bg-gray-900/90 text-gray-400">
            <tr>
              <th
                scope="col"
                className="py-2 pl-2 md:px-6 md:py-3 text-white text-center"
              >
                Pos
              </th>
              <th scope="col" className="py-2 pl-2 md:px-6 md:py-3 text-white">
                Name
              </th>
              <th
                scope="col"
                className="py-2 pl-2 md:px-6 md:py-3 text-white text-center"
              >
                Wins
              </th>
              <th
                scope="col"
                className="py-2 px-2 md:px-6 md:py-3 text-white text-center"
              >
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {constructorStandings.map((constructor, index) => (
              <tr
                className="text-xs md:text-base border-t bg-gray-900/80 border-gray-700"
                key={index}
              >
                <td className="py-2 pl-2 md:px-6 md:py-3 text-center font-medium  whitespace-nowrap text-white">
                  {constructor.position}
                </td>
                <td className="py-2 pl-2 md:px-6 md:py-3 text-white">
                  {constructor.constructorName}
                </td>
                <td className="py-2 pl-2 md:px-6 md:py-3 text-white text-center">
                  {constructor.wins}
                </td>
                <td className="py-2 px-2 md:px-6 md:py-3 text-white text-center">
                  {constructor.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConstructorStandings;
