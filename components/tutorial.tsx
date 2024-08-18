export function Tutorial({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black p-8 rounded-lg w-96">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-xl font-bold">Welcome to BeyondSight</h1>
          <p className="text-sm text-gray-500 mt-4">
            Welcome to the VisionaryPath. This is a tutorial to help you get
            started with the app.
          </p>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-col items-start justify-center w-full">
              <h2 className="text-lg font-bold mt-5">Start the app</h2>
              <p className="text-sm text-gray-500">
                Press "Start" to start the model. If the model stops working,
                you many need to restart the app.
              </p>
            </div>
            <div className="flex flex-col items-start w-full justify-center">
              <h2 className="text-lg font-bold">Describe the world</h2>
              <p className="text-sm text-gray-500">
                The model will automatically describe the world around you when
                there's something relevant. To trigger the model manually, swipe
                up.
              </p>
            </div>
            <div className="flex flex-col items-start w-full justify-center">
              <h2 className="text-lg font-bold">Mute the noise</h2>
              <p className="text-sm text-gray-500">
                If a particular phrase is not relevant, swipe down to mute it.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <button
            onClick={() => onClose()}
            className="bg-white text-black p-2 rounded-lg mt-4 font-mono"
          >
            Start seeing
          </button>
        </div>
      </div>
    </div>
  );
}
