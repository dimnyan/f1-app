import { useState } from "react";

function ConstructorStandings() {
  const [constructorData, setConstructorData] = useState([]);

  useState(() => {
    fetch("http://ergast.com/api/f1/2008/5/constructorStandings", {
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
        console.log(constructorStandingsArrays);
        const constructorData = constructorStandingsArrays.map((standings) => {
          const position = standings.getAttribute("position");
          const constructor = standings.querySelectorAll("constructor");
          const name = constructor.querySelectorAll("name").textContent;
          console.log(position);
          return { position, name };
        });

        setConstructorData(constructorData);
      });
    // console.log(constructorData);
    return (
      <div>
        {constructorData.map((data, index) => (
          <div key={index}>
            <p>{data.name}</p>
          </div>
        ))}
      </div>
    );
  });
}

export default ConstructorStandings;
