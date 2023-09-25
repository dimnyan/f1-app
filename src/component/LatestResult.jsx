import { useEffect, useState } from "react";
import Loading from "./Loading";

function LatestResult() {
  const [circuitData, setCircuitData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    fetch("https://ergast.com/api/f1/current/last/results")
      .then((response) => response.text())
      .then((data) => {
        const xmlDocument = new DOMParser().parseFromString(
          data,
          "application/xml"
        );
        // console.log(xmlDocument);

        const resultDataArray = Array.from(
          xmlDocument.querySelectorAll("Result")
        );
        // console.log(resultDataArray);

        const raceQuery = xmlDocument.querySelector("Race");

        const resultCircuitData = () => {
          // const race = raceQuery.querySelector("Race");
          const round = raceQuery.getAttribute("round");
          const season = raceQuery.getAttribute("season");
          const raceName = raceQuery.querySelector("RaceName").textContent;
          const circuitName = raceQuery
            .querySelector("Circuit")
            .querySelector("CircuitName").textContent;
          const raceDate = new Date(
            raceQuery.querySelector("Date").textContent
          );
          const raceHari = days[raceDate.getDay()];
          const raceTanggal = raceDate.getDate();
          const raceBulan = months[raceDate.getMonth()];
          const raceTahun = raceDate.getFullYear();
          const raceDateFormat =
            raceHari + ", " + raceTanggal + " " + raceBulan + " " + raceTahun;

          //sun, 02 juni 2000

          return { raceName, circuitName, round, season, raceDateFormat };
        };

        const resultLatestData = resultDataArray.map((result) => {
          const driver = result.querySelector("Driver");
          const grid = result.querySelector("Grid").textContent;
          const position = result.getAttribute("position");
          const points = result.getAttribute("points");
          const givenName = driver.querySelector("GivenName").textContent;
          const familyName = driver.querySelector("FamilyName").textContent;
          const constructor = result.querySelector("Constructor");
          const constructorName = constructor.querySelector("Name").textContent;
          const status = result.querySelector("Status").textContent;
          // const time = driver.querySelector("Time").textContent;

          return {
            position,
            givenName,
            familyName,
            constructorName,
            grid,
            status,
            points,
          };
        });

        setResultData(resultLatestData);
        setCircuitData(resultCircuitData);
        setIsLoading(false);
      });
  }, []);
  // console.log(circuitData);
  // console.log(resultData);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full bg-image bg-fixed bg-center bg-cover">
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-black  text-2xl px-2 sm:px-14 py-14 text-center tracking-tight">
          Latest Race Result
        </h1>
        <div className=" mx-auto">
          <div className="flex flex-col p-2 mx-2 w-auto rounded-md sm:flex gap-2 bg-gray-900/90 text-white">
            <p className="w-max font-bold text-lg pb-5">
              {circuitData.raceName}
            </p>
            <table className="w-max sm:text-base mb-4">
              <tbody>
                <tr>
                  <td>Circuit</td>
                  <td className="px-2">:</td>
                  <td>{circuitData.circuitName}</td>
                </tr>
                <tr>
                  <td>Season</td>
                  <td className="px-2">:</td>
                  <td>{circuitData.season}</td>
                </tr>
                <tr>
                  <td>Round</td>
                  <td className="px-2">:</td>
                  <td>{circuitData.round}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td className="px-2">:</td>
                  <td>{circuitData.raceDateFormat}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <table className="rounded-xl w-min sm:w-max md:w-max sm:text-lg text-left text-gray-400 mx-2 my-7 ">
            <thead className="text-xs sm:text-lg uppercase tracking-widest bg-gray-900/90 text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="py-2 pl-2 sm:px-6 sm:py-3 text-white  text-center"
                >
                  Pos
                </th>
                <th
                  scope="col"
                  className="py-2 pl-2 sm:px-6 sm:py-3 text-white"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-2 pl-2 sm:px-6 sm:py-3 text-white"
                >
                  Constructor
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 hidden sm:block sm:px-6 sm:py-3 text-white  text-center"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="py-2 px-2 sm:px-6 sm:py-3 text-white  text-center"
                >
                  Points
                </th>
                {/* <th scope="col" className="px-6 py-3">
                Profile
              </th> */}
              </tr>
            </thead>
            <tbody>
              {resultData.map((driver, index) => (
                <tr
                  className="text-xs sm:text-base border-t bg-gray-900/80 border-gray-700 sm:tracking-wider"
                  key={index}
                >
                  <td className=" py-2 pl-2 sm:px-6 sm:py-3 text-center font-medium  whitespace-nowrap text-white">
                    {driver.position}
                  </td>
                  <td className=" py-2 pl-2 sm:px-6 sm:py-3 text-white">
                    {driver.givenName} {driver.familyName}
                  </td>
                  <td className=" py-2 pl-2 sm:px-6 sm:py-3 text-gray-300">
                    {driver.constructorName}
                  </td>
                  <td className="hidden sm:flex items-center justify-center sm:px-6 sm:pt-3  text-white">
                    {driver.status}
                  </td>
                  <td className=" py-2 px-2 sm:px-6 sm:py-3 text-center text-white font-bold">
                    {driver.points}
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

export default LatestResult;
