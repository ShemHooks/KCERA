const Registration = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="bg-white md:bg-gray-300 min-h-screen w-screen flex items-center justify-center overflow-hidden">
        <div className="p-10 rounded-md md:bg-white max-w-md w-full mx-4 md:mx-auto shadow-2xl shadow-black/50 relative">
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-gray-600 hover:text-black"
          >
            <p>🡸</p>
          </button>

          <div className="flex justify-center mt-4">
            <img
              src="/images/KCERA.png"
              alt="KCERA Logo"
              className="min-h-15 max-h-20 mx-auto"
            />
          </div>

          <div className="w-full text-center mt-6">
            <h2 className="text-xl font-semibold mb-2">Dear Kabankalanon,</h2>
            <p className="mb-3">
              All registrations must be completed through the mobile version of
              the KCERA app. Please download and install the app from the Google
              Play Store or Apple App Store.
            </p>
            <p className="mb-3">
              We apologize for any inconvenience this may cause and appreciate
              your understanding.
            </p>
            <p className="font-semibold mt-6">The KCERA Development Team</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
