// export function Tutorial({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-black p-8 rounded-lg w-96">
//         <div className="flex flex-col items-center justify-center h-full">
//           <h1 className="text-xl font-bold">Welcome to Your Eyez</h1>
//           <p className="text-sm text-gray-500 mt-4">
//             Welcome to the YourEyez. This is a tutorial to help you get
//             started with the app.
//           </p>

//           <div className="flex flex-col items-center justify-center gap-2">
//             <div className="flex flex-col items-start justify-center w-full">
//               <h2 className="text-lg font-bold mt-5">Start the app</h2>
//               <p className="text-sm text-gray-500">
//                 Press "Start" to start the model. If the model stops working,
//                 you many need to restart the app.
//               </p>
//             </div>
//             <div className="flex flex-col items-start w-full justify-center">
//               <h2 className="text-lg font-bold">Describe the world</h2>
//               <p className="text-sm text-gray-500">
//                 The model will automatically describe the world around you when
//                 there's something relevant. To trigger the model manually, swipe
//                 up.
//               </p>
//             </div>
//             <div className="flex flex-col items-start w-full justify-center">
//               <h2 className="text-lg font-bold">Mute the noise</h2>
//               <p className="text-sm text-gray-500">
//                 If a particular phrase is not relevant, swipe down to mute it.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center justify-center w-full mt-8">
//           <button
//             onClick={() => onClose()}
//             className="bg-white text-black p-2 rounded-lg mt-4 font-mono"
//           >
//             Start seeing
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
export function Tutorial({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="bg-gray-900 p-10 rounded-2xl w-[28rem] shadow-2xl border border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-6">Welcome to Your Eyez</h1>
        <p className="text-gray-400 mb-8">
          This tutorial will help you get started with the app.
        </p>

        <div className="space-y-6">
          {[
            { title: "Start the app", description: "Press \"Start\" to begin. Restart if needed." },
            { title: "Describe the world", description: "Auto-describes surroundings. Swipe up to trigger manually." },
            { title: "Mute the noise", description: "Swipe down to mute irrelevant phrases." }
          ].map((item, index) => (
            <div key={index} className="border-l-2 border-blue-500 pl-4">
              <h2 className="text-lg font-semibold text-white mb-2">{item.title}</h2>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-10 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Start Seeing
        </button>
      </div>
    </div>
  );
}