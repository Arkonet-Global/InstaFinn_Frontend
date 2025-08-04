// "use client";

// import React, { useEffect, useState } from "react";
// import Layout from "@/component/Layout/layout";
// import { useRouter } from "next/navigation";
// import useGetQueryParam from "@/component/utils/commonFunctions";


// const Help = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const type = useGetQueryParam("type");

//   useEffect(() => {
//     console.log("Type parameter:", type);
//   }, [type]);

//   return (
//     <Layout setSidebarCollapsed={setCollapsed}>
//       <div className="p-4">
//         <h1 className="text-xl font-bold">Help Page</h1>
//         <p>Type: {type || "Not specified"}</p>
//       </div>
//     </Layout>
//   );
// };

// export default Help;


import React, { Suspense } from "react";
import HelpClient from "./HelpClient";

const Help = () => {
  return (
    <Suspense fallback={<div>Loading help page...</div>}>
      <HelpClient />
    </Suspense>
  );
};

export default Help;

