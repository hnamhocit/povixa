import { buttonVariants } from '@povixa/ui/components/button'
import { cn } from '@povixa/ui/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@povixa/ui/components/card'
import { ShieldCheck, Fingerprint, Lock, ArrowRight, UserPlus, LogIn, Key, Blocks, Zap } from 'lucide-react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground selection:bg-primary/20">
      {/* Navbar */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center pt-24 pb-32">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0 pointer-events-none"></div>
          <div className="absolute left-1/2 top-[10%] -translate-x-1/2 h-[500px] w-[800px] opacity-40 blur-[120px] pointer-events-none z-0">
            <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-primary/70 animate-pulse duration-1000"></div>
            <div className="absolute right-0 top-10 h-[400px] w-[400px] rounded-full bg-orange-500/50"></div>
            <div className="absolute left-1/4 top-20 h-[400px] w-[400px] rounded-full bg-rose-600/40"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border/50 text-sm font-medium mb-8">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Secure & Centralized Access</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto">
              One account for <br className="hidden md:block" />
              the entire <span className="text-primary">Povixa Ecosystem</span>.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Manage your identity, security preferences, and seamless access across all Povixa services from one central, lightning-fast hub.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto group")}>
                Create an account
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/sign-in" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
                Sign In to Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30 border-y border-border/40">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl font-bold mb-4">Why use Povixa Auth?</h2>
              <p className="text-muted-foreground">We provide a seamless and secure authentication experience so you can focus on what matters most.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-background/50 border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Key className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Single Sign-On (SSO)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Log in once and access all connected applications within the Povixa ecosystem without needing to authenticate again.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Built on modern infrastructure to ensure your authentication requests are processed with minimal latency.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Blocks className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Seamless Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Connect third-party accounts easily and manage OAuth applications directly from your security dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Fingerprint className="w-4 h-4" />
                  <span>Bank-grade Security</span>
                </div>
                <h2 className="font-display text-4xl font-bold">Your data is encrypted and protected.</h2>
                <p className="text-lg text-muted-foreground">
                  We employ state-of-the-art security measures including end-to-end encryption, multi-factor authentication (MFA), and anomaly detection to keep your account safe from unauthorized access.
                </p>
                <ul className="space-y-4">
                  {[
                    "Two-Factor Authentication (2FA) support",
                    "Suspicious activity alerts & monitoring",
                    "Advanced session management",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full max-w-md lg:max-w-none">
                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl border border-border/50 bg-muted/20 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  {/* Decorative UI element representing security dashboard */}
                  <div className="w-3/4 h-3/4 rounded-xl border border-border bg-background shadow-2xl p-6 flex flex-col">
                    <div className="h-6 w-1/3 bg-muted rounded mb-6" />
                    <div className="space-y-4 flex-1">
                      <div className="h-12 w-full border border-border rounded-lg flex items-center px-4 gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-1/2 bg-muted rounded mb-1" />
                          <div className="h-2 w-1/3 bg-muted/50 rounded" />
                        </div>
                      </div>
                      <div className="h-12 w-full border border-border rounded-lg flex items-center px-4 gap-4 opacity-50">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-1/2 bg-muted rounded mb-1" />
                          <div className="h-2 w-1/3 bg-muted/50 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
    </div>
  )
}
