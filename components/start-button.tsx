export const StartButton = ({ onClick }: { onClick: () => void }) => {
  // fixed centered start button
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white text-6xl font-bold py-4 px-8 rounded-full font-mono z-50"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      Start
    </button>
  );
};
