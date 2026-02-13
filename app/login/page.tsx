import LoginButton from "@/components/login-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-stretch bg-white">
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 z-10 bg-linear-to-br from-indigo-600/90 to-cyan-500/90 mix-blend-multiply" />
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="SmartMarks Visual"
          fill
          priority
        />
        <div className="relative z-20 flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">SmartMarks</span>
          </div>

          <div className="max-w-md">
            <h2 className="mb-4 text-4xl font-extrabold leading-tight">
              Your Digital Brain, <br />
              <span className="text-indigo-200">Perfectly Organized.</span>
            </h2>
            <p className="text-lg text-indigo-50/80">
              Join thousands of users who trust SmartMarks to capture, organize,
              and sync their most important links in real-time.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-slate-50/50">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="lg:hidden mb-8 flex justify-center">
            <div className="rounded-xl bg-indigo-600 p-3 text-white shadow-lg shadow-indigo-600/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </div>
          </div>

          <Card className="border-none shadow-2xl shadow-indigo-100/50 bg-white">
            <CardHeader className="space-y-1 text-center lg:text-left">
              <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
                Welcome back
              </CardTitle>
              <CardDescription className="text-base text-gray-500">
                Sign in to your private dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <LoginButton />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-400">
                    Secure Access
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Real-time cloud synchronization</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span>Enterprise-grade encryption</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-sm text-gray-400">
            By signing in, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
