"use client";

import React, { Suspense, useState } from "react";
import Layout from "@/component/Layout/layout";
import Accept_Reject from "@/component/Accept_Reject/Accept_Reject";

const AcceptReject = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout setSidebarCollapsed={setCollapsed}>
      <Suspense fallback={<div className="p-4">Loading Accept/Reject...</div>}>
        <Accept_Reject isBank />
      </Suspense>
    </Layout>
  );
};

export default AcceptReject;