import { useEffect, useState } from "react";

function Loading() {
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoadingTime(loadingTime + 1);
    }, 1000);
    // console.log(loadingTime);
  }, [loadingTime]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p className="text-center text-red-500 items-center font-bold text-2xl md:text-4xl">
        Loading...
      </p>
      {loadingTime > 4 && (
        <p className="text-center text-red-500 items-center font-bold text-2xl md:text-4xl">
          Hold on, Server might be busy...
        </p>
      )}
    </div>
  );
}

export default Loading;
