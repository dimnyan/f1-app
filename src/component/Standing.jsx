import { useEffect, useState } from "react";

function Standing() {
  const [dataStandings, setDataStandings] = useState([]);

  useEffect(() => {
    fetch("http://ergast.com/api/f1/current/driverStandings", {
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

        const driverData = driverStandingsArray.map((standings) => {
          const driver = standings.querySelector("Driver");
          const position = standings.getAttribute("position");
          const points = standings.getAttribute("points");
          const givenName = driver.querySelector("GivenName").textContent;
          const familyName = driver.querySelector("FamilyName").textContent;

          return { position, givenName, familyName, points };
        });
        // console.log(driverData);

        setDataStandings(driverData);
      });
  }, []);

  // console.log(dataStandings);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Pos
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
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
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                key={index}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {driver.position}
                </td>
                <td className="px-6 py-4">
                  {driver.givenName} {driver.familyName}
                </td>
                <td className="px-6 py-4">{driver.points}</td>
                {/* <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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

export default Standing;
