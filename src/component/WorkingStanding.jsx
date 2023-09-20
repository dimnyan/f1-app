import { useEffect, useState } from "react";

function WorkingStanding() {
  const [dataStanding, setDataStanding] = useState(null);

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

        // Now you can access and manipulate the XML data as needed.
        const driverPosition1 = xmlDocument.querySelector(
          "DriverStanding[position='1']"
        );
        if (driverPosition1) {
          const driverName = driverPosition1.querySelector("Driver");
          const position = driverPosition1.getAttribute("position");
          const points = driverPosition1.getAttribute("points");
          const wins = driverPosition1.getAttribute("wins");

          setDataStanding({
            position,
            driverName: `${driverName.querySelector("GivenName").textContent} ${
              driverName.querySelector("FamilyName").textContent
            }`,
            points,
            wins,
          });
        }
      });
  }, []);

  return (
    <div>
      {dataStanding ? (
        <div>
          <h2>Driver Standing - Position {dataStanding.position}</h2>
          <p>Driver Name: {dataStanding.driverName}</p>
          <p>Points: {dataStanding.points}</p>
          <p>Wins: {dataStanding.wins}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WorkingStanding;
