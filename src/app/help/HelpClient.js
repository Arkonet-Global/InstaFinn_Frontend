"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/component/Layout/layout";
import useGetQueryParam from "@/component/utils/commonFunctions";

const HelpClient = () => {
  const [collapsed, setCollapsed] = useState(false);
  const type = useGetQueryParam("type");

  useEffect(() => {
    console.log("Type parameter:", type);
  }, [type]);

  return (
    <Layout setSidebarCollapsed={setCollapsed}>
      <div className="p-4">
        <h1 className="text-xl font-bold">Help Page</h1>
        <p>Type: {type || "Not specified"}</p>
      </div>
    </Layout>
  );
};

export default HelpClient;
