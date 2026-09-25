"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { FaGoogle, FaFacebook, FaApple, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@povixa/ui/components/button";
import { Input } from "@povixa/ui/components/input";
import { Label } from "@povixa/ui/components/label";

import { Checkbox } from "@povixa/ui/components/checkbox";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp() as any;
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNews, setSubscribeNews] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  
  const handleOAuth = (strategy: any) => {
    if (!isLoaded) return;
    return signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Đã xảy ra lỗi khi đăng ký.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      } else {
        console.log("Status:", completeSignUp.status);
        setError("Không thể hoàn tất xác thực.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Mã xác nhận không hợp lệ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-background">
      {/* Background Layer: Grid and Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0 pointer-events-none"></div>
      
      <div className="absolute left-1/2 top-[10%] -translate-x-1/2 h-[500px] w-[800px] opacity-40 blur-[120px] pointer-events-none z-0">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/70 animate-pulse duration-1000"></div>
        <div className="absolute right-0 top-10 h-[400px] w-[400px] rounded-full bg-orange-500/50"></div>
        <div className="absolute left-1/4 top-20 h-[400px] w-[400px] rounded-full bg-rose-600/40"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 pt-16 pb-12">
        <div className="w-full max-w-md bg-background/70 backdrop-blur-xl shadow-2xl border border-border/60 rounded-2xl p-8">
          <div className="mb-8 flex flex-col items-center text-center">
            <Link href="/" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 mb-6 hover:scale-110 transition-transform">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </Link>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl mb-2">
              Tham gia <span className="bg-gradient-to-br from-primary via-rose-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">povixa</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              {pendingVerification ? "Nhập mã xác nhận đã được gửi qua email" : "Tạo tài khoản mới để trải nghiệm sản phẩm"}
            </p>
          </div>

          
          {!pendingVerification && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button variant="outline" type="button" onClick={() => handleOAuth('oauth_google')} disabled={!isLoaded} className="h-11 bg-background/50 hover:bg-background/80">
                  <FaGoogle className="mr-2 h-4 w-4 text-red-500" /> Google
                </Button>
                <Button variant="outline" type="button" onClick={() => handleOAuth('oauth_facebook')} disabled={!isLoaded} className="h-11 bg-background/50 hover:bg-background/80">
                  <FaFacebook className="mr-2 h-4 w-4 text-blue-600" /> Facebook
                </Button>
                <Button variant="outline" type="button" onClick={() => handleOAuth('oauth_apple')} disabled={!isLoaded} className="h-11 bg-background/50 hover:bg-background/80">
                  <FaApple className="mr-2 h-4 w-4 text-foreground" /> Apple
                </Button>
                <Button variant="outline" type="button" onClick={() => handleOAuth('oauth_github')} disabled={!isLoaded} className="h-11 bg-background/50 hover:bg-background/80">
                  <FaGithub className="mr-2 h-4 w-4 text-foreground" /> Github
                </Button>
              </div>
              
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/60" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background/70 px-2 text-muted-foreground backdrop-blur-xl">
                    Hoặc đăng ký bằng email
                  </span>
                </div>
              </div>
            </>
          )}

          {!pendingVerification ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                  placeholder="hello@povixa.cloud"
                  className="h-12 border-2 bg-background/50 focus-visible:ring-primary focus-visible:border-transparent"
                />
              </div>
              
                            <div className="space-y-2">
                <Label htmlFor="password" className="font-semibold">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="h-12 border-2 bg-background/50 focus-visible:ring-primary focus-visible:border-transparent"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms} 
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                    className="mt-1" 
                  />
                  <label htmlFor="terms" className="text-sm leading-tight text-muted-foreground cursor-pointer">
                    Tôi đồng ý với <Link href="https://legal.povixa.cloud/terms" className="text-primary hover:underline">Điều khoản dịch vụ</Link> và <Link href="https://legal.povixa.cloud/privacy" className="text-primary hover:underline">Chính sách bảo mật</Link>
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="newsletter" 
                    checked={subscribeNews} 
                    onCheckedChange={(checked) => setSubscribeNews(checked as boolean)} 
                    className="mt-1" 
                  />
                  <label htmlFor="newsletter" className="text-sm leading-tight text-muted-foreground cursor-pointer">
                    Đăng ký nhận email thông báo và cập nhật mới nhất
                  </label>
                </div>
              </div>

              {error && (
                <div className="p-3 text-sm font-medium text-destructive-foreground bg-destructive/20 border border-destructive/50 rounded-md">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isLoading || !isLoaded || !agreeTerms}
                className="w-full h-12 font-bold shadow-xl shadow-primary/25 hover:scale-[1.02] transition-all"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý</>
                ) : (
                  "Đăng ký"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="font-semibold">Mã xác nhận</Label>
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="Nhập mã xác nhận..."
                  className="h-12 border-2 bg-background/50 focus-visible:ring-primary focus-visible:border-transparent text-center tracking-widest text-lg font-mono"
                />
              </div>

              {error && (
                <div className="p-3 text-sm font-medium text-destructive-foreground bg-destructive/20 border border-destructive/50 rounded-md">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isLoading || !isLoaded || !agreeTerms}
                className="w-full h-12 font-bold shadow-xl shadow-primary/25 hover:scale-[1.02] transition-all"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xác thực</>
                ) : (
                  "Xác thực Email"
                )}
              </Button>
            </form>
          )}

          <div className="mt-8 text-center text-sm font-medium text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
