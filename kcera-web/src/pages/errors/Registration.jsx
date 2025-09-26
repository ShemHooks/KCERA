const Registration = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex items-center justify-center w-screen min-h-screen overflow-hidden text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {" "}
        {/*bg-white md:bg-gray-300 */}
        <div className="relative w-full max-w-md p-10 mx-4 rounded-md shadow-2xl bg-black/30 backdrop-blur-sm shadow-black/50">
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 hover:text-red-500"
          >
            <p>🡸</p>
          </button>

          <div className="flex justify-center mt-4">
            <img
              src="/images/KCERA.png"
              alt="KCERA Logo"
              className="mx-auto min-h-15 max-h-20"
            />
          </div>

          <div className="w-full mt-6 text-center">
            <h2 className="mb-2 text-xl font-semibold">Dear Kabankalanon,</h2>
            <p className="mb-3">
              All registrations must be completed through the mobile version of
              the KCERA app. Please download and install the app from the Google
              Play Store or Apple App Store.
            </p>
            <p className="mb-3">
              We apologize for any inconvenience this may cause and appreciate
              your understanding.
            </p>
            <p className="mt-6 font-semibold">The KCERA Development Team</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
