import { useEffect, useState } from "react";
import Loading from "./Loading";
import Error from "./Error";

function LatestResult() {
  const [circuitData, setCircuitData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
    const fetchLastestRace = async () => {
      const url = "https://ergast.com/api/f1/current/last/results.json";
      try {
        const response = await fetch(url);
        const data = await response.json();
        const result = data.MRData.RaceTable.Races[0];
        setResultData(result.Results);
        setCircuitData(result);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
        console.error(e);
      }
    };

    fetchLastestRace();
  }, []);

  const dateFunc = (date) => {
    const dateArray = date.split("-");
    const raceYear = dateArray[0];
    const raceMonth = parseInt(dateArray[1]);
    const raceDate = dateArray[2];

    const month = months[raceMonth];
    return raceDate + " " + month + " " + raceYear;
  };

  // console.log(circuitData);

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    <Error />;
  }

  return (
    // <div className="w-full bg-image bg-fixed bg-center bg-cover">
    <div className="w-full bg-white">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center">
          <div className="text-black text-xl px-2 sm:px-14 py-14 text-center tracking-tight 2xl:text-3xl">
            Latest Race Result
            <h1 className="font-bold text-2xl pt-8 text-red-500 2xl:text-4xl">
              {circuitData.raceName} {circuitData.season}
            </h1>
          </div>
          <div className="mx-auto">
            <div className="flex flex-col py-2 px-3 mx-2 w-auto rounded-xl sm:flex gap-2 bg-red-600 text-white">
              {/* <p className="w-max font-bold text-lg pb-5 ">
              {circuitData.raceName}
            </p> */}
              <table className="w-max sm:text-base my-4 2xl:text-2xl">
                <tbody>
                  <tr>
                    <td>Circuit</td>
                    <td className="px-2">:</td>
                    <td>{circuitData.Circuit.circuitName}</td>
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
                    <td>{dateFunc(circuitData.date)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="rounded-xl border-red-500 border-2 mx-2 my-10">
              {/* <table className="table-width sm:text-lg text-left"> */}
              <table className="sm:text-lg text-left">
                <thead className="text-xs sm:text-lg uppercase tracking-widest text-red-600 2xl:text-2xl">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-2 sm:px-6 sm:py-3 text-center"
                    >
                      Pos
                    </th>
                    <th scope="col" className="py-2 pl-2 sm:px-6 sm:py-3">
                      Name
                    </th>
                    <th scope="col" className="py-2 pl-2 sm:px-6 sm:py-3">
                      Constructor
                    </th>
                    <th scope="col" className="py-2 sm:px-6 text-center">
                      Time
                    </th>
                    <th
                      scope="col"
                      className="hide-column py-2 px-2 sm:px-6 sm:py-3 text-center"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="py-2 px-2 sm:px-6 sm:py-3 text-center"
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
                      className={`text-xs sm:text-base border-t border-red-600 sm:tracking-wider hover:bg-red-500 hover:text-white xl:text-xl 2xl:text-2xl ${
                        driver.FastestLap.rank == "1" ? "text-purple-500" : ""
                      } ${index < 3 ? "font-bold" : ""}`}
                      key={index}
                    >
                      <td className="py-2 pl-2 sm:px-6 sm:py-3 text-center whitespace-nowrap">
                        {driver.position}
                      </td>
                      <td className="py-2 pl-2 sm:px-6 sm:py-3 ">
                        {driver.Driver.givenName} {driver.Driver.familyName}
                      </td>
                      <td className="py-2 pl-2 sm:px-6 sm:py-3">
                        {driver.Constructor.name}
                      </td>
                      <td className="items-center justify-center sm:px-6">
                        {driver?.Time?.time ?? "-"}
                      </td>
                      <td className="hide-column items-center justify-center sm:px-6">
                        {driver.status}
                      </td>
                      <td className="py-2 px-2 sm:px-6 sm:py-3 text-center font-bold">
                        {driver.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LatestResult;
