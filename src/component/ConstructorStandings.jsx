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
        console.log(xmlDocument);
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
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-center items-center font-bold text-2xl">
          Loading...
        </p>
      </div>
    );
  }
  return (
    <div className="w-full ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-10 flex flex-wrap justify-center ">
        <h1 className="font-bold text-center text-2xl pb-10 w-full">
          {season} Formula 1 Constructor Standings
        </h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-xl">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 dark:text-white">
                Pos
              </th>
              <th scope="col" className="px-6 py-3 dark:text-white">
                Name
              </th>
              <th scope="col" className="px-6 py-3 dark:text-white">
                Wins
              </th>
              <th scope="col" className="px-6 py-3 dark:text-white">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {constructorStandings.map((constructor, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={index}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {constructor.position}
                </td>
                <td className="px-6 py-4 dark:text-white">
                  {constructor.constructorName}
                </td>
                <td className="px-6 py-4 dark:text-white">
                  {constructor.wins}
                </td>
                <td className="px-6 py-4 dark:text-white">
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
