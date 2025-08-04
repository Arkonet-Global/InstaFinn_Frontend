"use client";

import React, { useEffect, useState, Suspense } from "react";
import PageHeader from "@/component/Header/PageHeader";
import Layout from "@/component/Layout/layout";
import LoanCard from "@/component/ui/LoanCard";
import { getId, getRole } from "@/lib/commonFunctions";
import { getBankById, getBanks, getBanksByUserId } from "@/lib";


const Banks = () => {
  //Set page title
  useEffect(() => {
    document.title = "Applications";
  }, []);

  const role = getRole();
  const user_id = getId();

  const [collapsed, setCollapsed] = useState(false);
  const [bankId, setBankId] = useState(null);
  const [branchId,setBranchId]=useState(null)
  const [settingBranch, setSettingBranch] = useState(null);
  const [bankData, setBankData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      role?.toLowerCase() == "admin" ||
      role?.toLowerCase() == "masteradmin" ||
      role?.toLowerCase() == "bankoperator"
    ) {
      getAllBanks();
    }
  }, [role]);

  const getAllBanks = async () => {
  try {
    setLoading(true);
    let response;

    if (["admin", "masteradmin"].includes(role?.toLowerCase())) {
      response = await getBanks(); // returns array
    } else if (role?.toLowerCase() === "bankoperator") {
      response = await getBankById(user_id); // might return single bank object
    }

    if (response?.status === 200) {
      const data = response.data.data;
      setBankData(Array.isArray(data) ? data : [data]); // ensures array
    }
  } catch (error) {
    console.error("Error fetching banks:", error);
  } finally {
    setLoading(false);
  }
};


  // const getAllBanks = async () => {
  //   try {
  //     setLoading(true);
  //     const response =
  //       ( role?.toLowerCase() == "admin" ||
  //         role?.toLowerCase() == "masteradmin")
  //         ? await getBanks()
  //         :  await getBankById(user_id);
  //     if (response.status == 200) {
  //       setBankData(response.data.data);
  //     }
  //    }  catch (error) {
  //     console.error("Error fetching banks:", error);
  //   } finally {
  //     setLoading(false);
  //   } 
  // };

  // return (
  //   <>
  //     <Layout setSidebarCollapsed={setCollapsed}>
  //       <PageHeader
  //         collapsed={collapsed}
  //         title="Banks"
  //         // subTitle="(bank/nbfc)"
  //         // showAddLender
  //         showFilter
  //       />
  //       <div className="flex-1 flex flex-col items-center">
  //         <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
  //           {Array.isArray(bankData) &&
  //             bankData.map((bank, index) => (
  //               <LoanCard
  //                 key={index}
  //                 data={bank}
  //                 showBranch
  //                 setSettingBranch={setSettingBranch}
  //                 settingBranch={settingBranch}
  //                 bankId={bankId}
  //                 setBankId={setBankId}
  //                 branchId={branchId}
  //                 setBranchId={setBranchId}
  //               />
  //             ))}
  //             {role?.toLowerCase() == "bankoperator" && <LoanCard data={bankData} />}
  //         </div>
  //       </div>
  //     </Layout>
  //   </>
  // );

 return (
  <Layout setSidebarCollapsed={setCollapsed}>
      <Suspense fallback={<div>Loading header...</div>}>
        <PageHeader collapsed={collapsed} title="Banks" showFilter />
      </Suspense>    
    
    <div className="flex-1 flex flex-col items-center">
      <div className="container-lg m-4 mt-4 w-full max-w-7xl mx-auto grid grid-rows-1">
        {loading ? (
          <div className="text-center text-blue-600 font-medium">Loading banks...</div>
        ) : bankData.length === 0 ? (
          <div className="text-center text-gray-500">No bank data available.</div>
        ) : (
          bankData.map((bank, index) => (
            <LoanCard
              key={index}
              data={bank}
              showBranch
              setSettingBranch={setSettingBranch}
              settingBranch={settingBranch}
              bankId={bankId}
              setBankId={setBankId}
              branchId={branchId}
              setBranchId={setBranchId}
            />
          ))
        )}
      </div>
    </div>
  </Layout>
);

};

export default Banks;
