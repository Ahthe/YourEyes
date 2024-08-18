import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Save() {
  useEffect(() => {
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore
      window.navigator?.standalone ||
      // @ts-ignore
      window.clientInformation.standalone
    ) {
      window.location.href = "/app";
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="h-screen w-screen flex items-center justify-center flex-col"
    >
      <img
        src="/icon512_maskable.png"
        className="h-32 w-32 rounded-lg border-white border-4"
      />
      <h1 className="text-white text-4xl mt-4">visionarypath</h1>
      <p className="text-white text-lg mt-4 text-center">
        Real-time audio descriptions for the visually impaired, fostering
        independence and safety.
      </p>

      <div className="flex flex-col items-center justify-center">
        <div className="mt-4 text-sm text-center p-4">
          We recommend saving this app to your home screen for the best
          experience. Saved apps will launch visionarypath automatically.
          Alternatively, you can use the app in your browser by clicking the
          button below.
        </div>
        <a
          href="/app"
          className="bg-white text-black p-2 rounded-lg mt-4 font-mono"
        >
          Start seeing
        </a>
      </div>
    </motion.div>
  );
}

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { FiEye, FiHeadphones, FiSmartphone, FiHelpCircle } from "react-icons/fi";

// export default function Save() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
//       <header className={`fixed w-full transition-all duration-300 ${isScrolled ? "bg-gray-900 shadow-lg" : ""}`}>
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center">
//             <img src="/icon512_maskable.png" alt="VisionaryPath Logo" className="h-10 w-10 rounded-lg" />
//             <h1 className="ml-3 text-2xl font-bold">VisionaryPath</h1>
//           </div>
//           <nav className="hidden md:block">
//             <ul className="flex space-x-6">
//               <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
//               <li><a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a></li>
//               <li><a href="#get-started" className="hover:text-blue-400 transition-colors">Get Started</a></li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       <main className="pt-20">
//         <section className="hero container mx-auto px-4 py-20 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl md:text-6xl font-bold mb-6"
//           >
//             See the World Through Sound
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-xl mb-8"
//           >
//             Real-time audio descriptions empowering the visually impaired
//           </motion.p>
//           <motion.a
//             href="/app"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
//           >
//             Start Your Journey
//           </motion.a>
//         </section>

//         <section id="features" className="container mx-auto px-4 py-20">
//           <h3 className="text-3xl font-bold mb-10 text-center">Key Features</h3>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               { icon: <FiEye className="text-4xl mb-4" />, title: "Object Recognition", description: "Identify objects in real-time" },
//               { icon: <FiHeadphones className="text-4xl mb-4" />, title: "Audio Descriptions", description: "Hear detailed scene descriptions" },
//               { icon: <FiSmartphone className="text-4xl mb-4" />, title: "Mobile Friendly", description: "Use on any smartphone" },
//               { icon: <FiHelpCircle className="text-4xl mb-4" />, title: "Voice Commands", description: "Easy voice-controlled navigation" },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: index * 0.2 }}
//                 className="bg-gray-800 p-6 rounded-lg text-center"
//               >
//                 {feature.icon}
//                 <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
//                 <p>{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         <section id="how-it-works" className="bg-gray-900 py-20">
//           <div className="container mx-auto px-4">
//             <h3 className="text-3xl font-bold mb-10 text-center">How It Works</h3>
//             {/* Add step-by-step guide or infographic here */}
//           </div>
//         </section>

//         <section id="get-started" className="container mx-auto px-4 py-20 text-center">
//           <h3 className="text-3xl font-bold mb-6">Ready to Experience the World Anew?</h3>
//           <p className="text-xl mb-8">Join VisionaryPath and transform the way you perceive your surroundings.</p>
//           <a
//             href="/app"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
//           >
//             Get Started Now
//           </a>
//         </section>
//       </main>

//       <footer className="bg-gray-900 py-8">
//         <div className="container mx-auto px-4 text-center">
//           <p>&copy; 2023 VisionaryPath. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }