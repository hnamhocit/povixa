import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Đăng ký tài khoản povixa mới để trải nghiệm hệ sinh thái của chúng tôi.",
};

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
