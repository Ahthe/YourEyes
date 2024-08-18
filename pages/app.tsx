import Yolo from "@/components/models/yolo";
import "@/controllers/init";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Yolo />;
}
