"use client";

import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/component/Layout/layout";
import LoanApplications from "@/component/Applications/LoanApplications";
import SubUserApplicant from "@/component/Applications/SubUserApplicant";
import { useRouter } from "next/navigation";
import useGetQueryParam from "@/component/utils/commonFunctions";
import { getRole, getUser } from "@/lib/commonFunctions";
import { getVisibleLoanApplications } from "@/lib";

const ApplicationsClient = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [applications, setApplication] = useState([]);
  const router = useRouter();
  const type = useGetQueryParam("type");
  const role = getRole();
  const user = getUser();

  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const response = await getVisibleLoanApplications();
        if (response.status === 200) {
          setApplication(response.data.data);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Failed to fetch visible loan applications:", error);
      }
    };

    fetchAllApplications();
  }, [type]);

  const applicationList = useMemo(() => {
    const lowerRole = role?.toLowerCase();
    let filteredApplications = applications;

    if (lowerRole === "bankoperator") {
      const operatorBranchIds = user?.branches || [];

      filteredApplications = applications.filter((app) => {
        const bankEntries = app?.bankData || [];
        return bankEntries.some((bank) =>
          bank?.branches?.some((branch) =>
            operatorBranchIds.includes(branch.branchId?._id)
          )
        );
      });
    }

    if (["agent", "subagent", "masteradmin", "admin", "bankoperator"].includes(lowerRole)) {
      return <LoanApplications applications={filteredApplications} role={role} />;
    }

    return (
      <div className="text-center text-red-500 text-2xl font-bold mt-10">
        <h1>Invalid User</h1>
      </div>
    );
  }, [role, applications]);

  return <Layout setSidebarCollapsed={setCollapsed}>{applicationList}</Layout>;
};

export default ApplicationsClient;
