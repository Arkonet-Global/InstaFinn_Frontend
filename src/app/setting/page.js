// "use client";

// import React, { useEffect, useState } from "react";
// import Layout from "@/component/Layout/layout";
// import { useRouter } from "next/navigation";
// import useGetQueryParam from "@/component/utils/commonFunctions";

// const Setting = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const router = useRouter();
//   console.log(router);
//   const type = useGetQueryParam("type");

//   useEffect(() => {
//     console.log("Type parameter:", type);
//   }, [type]);

//   return <Layout setSidebarCollapsed={setCollapsed}>Setting</Layout>;
// };

// export default Setting;


import React, { Suspense } from "react";
import SettingClient from "./SettingClient";

export default function Setting() {
  return (
    <Suspense fallback={<div>Loading Settings...</div>}>
      <SettingClient />
    </Suspense>
  );
}

