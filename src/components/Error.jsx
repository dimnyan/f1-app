function Error() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <p className="text-center text-red-500 items-center font-bold text-2xl md:text-4xl">
        Error fetch Data, Server might be Down <br />
        Please Try Again Later...
      </p>
    </div>
  );
}

export default Error;
