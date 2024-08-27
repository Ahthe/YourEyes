import Yolo from "@/components/models/yolo";
import dynamic from "next/dynamic";
import "@/controllers/init";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const LazyYolo = dynamic(() => import("@/components/models/yolo"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

export default function Home() {
  return <LazyYolo />;
}
