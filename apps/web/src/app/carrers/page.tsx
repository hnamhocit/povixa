import type { Metadata } from "next";
import { CareersStage } from "@/components/careers-stage";

export const metadata: Metadata = {
  title: "Tuyển dụng · povixa studio",
  description:
    "Vị trí mở tại povixa: frontend, design, backend, platform. Khung lương minh bạch, remote thật, không hustle culture.",
};

export default function CareersPage() {
  return <CareersStage />;
}
