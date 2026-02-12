"use client";

import { useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut } from "@/actions/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserProfileProps {
  user: {
    email?: string;
    avatar_url?: string;
    full_name?: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center space-y-4 pb-2">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={user.full_name || "User Avatar"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary text-3xl font-bold text-primary-foreground">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <CardTitle className="text-xl font-bold">
            {user.full_name || "Welcome Back!"}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-4">
          <Button
            onClick={handleSignOut}
            disabled={isPending}
            variant="destructive"
            className="w-full"
          >
            {isPending ? "Signing out..." : "Sign Out"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
