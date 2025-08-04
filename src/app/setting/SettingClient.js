'use client';

import React, { useEffect, useState } from "react";
import Layout from "@/component/Layout/layout";
import { useRouter } from "next/navigation";
import useGetQueryParam from "@/component/utils/commonFunctions";

const SettingClient = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const type = useGetQueryParam("type");

  useEffect(() => {
    console.log("Router object:", router);
    console.log("Type parameter:", type);
  }, [type]);

  return <Layout setSidebarCollapsed={setCollapsed}>Setting</Layout>;
};

export default SettingClient;
