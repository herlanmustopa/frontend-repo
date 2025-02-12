"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { RootState } from "@/store/store";

export default function ProtectedDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return <DashboardLayout>{children}</DashboardLayout>;
}
