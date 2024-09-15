/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DashBoardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    if (!isLoggedIn()) {
        return router.push("/login");
    }
    //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return <div>{children}</div>;
}
