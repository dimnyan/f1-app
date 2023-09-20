import { useEffect, useState } from "react";
import xml2js from "xml2js";

function Standing() {
  const [dataStanding, setDataStanding] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://ergast.com/api/f1/current/driverStandings")
      .then((response) => {
        response.text();
      })
      .then((data) => {
        console.log(data);
        try {
          xml2js.parseString(data, (err, result) => {
            if (err) {
              setError(err);
            } else {
              const driverStanding1 =
                result.MRData.StandingsTable[0].StandingsList[0].DriverStanding.find(
                  (driver) => driver.$.position === "1"
                );
              setDataStanding(driverStanding1);
            }
          });
        } catch (error) {
          setError(error);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  return (
    <div>
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
      {error ? (
        <div>
          <p>An error occurred: {error.message}</p>
        </div>
      ) : dataStanding ? (
        <div>
          <h2>Driver Standing - Position 1</h2>
          <p>Position: {dataStanding.$.position}</p>
          <p>
            Driver Name: {dataStanding.Driver[0].GivenName}{" "}
            {dataStanding.Driver[0].FamilyName}
          </p>
          <p>Points: {dataStanding.$.points}</p>
          <p>Wins: {dataStanding.$.wins}</p>
          {/* You can display more information here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Standing;
