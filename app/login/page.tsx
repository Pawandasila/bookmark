import LoginButton from "@/components/login-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <Card className="w-full max-w-md border-none shadow-xl shadow-indigo-100/50">
        <CardHeader className="space-y-1 text-center">
          <div className="mb-4 flex justify-center">
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
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome back
          </CardTitle>
          <CardDescription className="text-gray-500">
            Sign in to access your smart bookmarks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <LoginButton />
          <p className="text-center text-xs text-gray-400">
            Secure authentication via Google OAuth
          </p>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} SmartMarks Inc. All rights reserved.
      </div>
    </div>
  );
}
