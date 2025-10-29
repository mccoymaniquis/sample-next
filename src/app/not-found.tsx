// app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page
    router.replace("/");
  }, [router]);

  return null; // or a loading spinner if you prefer
}

export default NotFoundPage;
