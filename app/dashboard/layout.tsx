"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import DashboardLayout from "@/components/templates/DashboardLayout";

export default function ProtectedDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return <DashboardLayout>{children}</DashboardLayout>;
}
