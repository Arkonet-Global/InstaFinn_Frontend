'use client';

import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/component/Layout/layout";
import LoanApplications from "@/component/Applications/LoanApplications";
import UserApplicant from "@/component/Applications/UserApplicant";
import BankApplicant from "@/component/Applications/BankApplicant";
import SubUserApplicant from "@/component/Applications/SubUserApplicant";
import { useRouter } from "next/navigation";
import useGetQueryParam from "@/component/utils/commonFunctions";
import { getId, getRole } from "@/lib/commonFunctions";
import { getAllUsers } from "@/lib";
import { showToast } from "@/utils/toastUtils";

const UsersClient = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState([]);
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const router = useRouter();
  const type = useGetQueryParam("type");

  // Load client-only values after mount
  useEffect(() => {
    const localRole = getRole();
    const localId = getId();
    setRole(localRole);
    setId(localId);
  }, []);

  // Show toast from localStorage
  useEffect(() => {
    const message = localStorage.getItem("toastMessage");
    if (message) {
      showToast("success", message);
      localStorage.removeItem("toastMessage");
    }
  }, []);

  // Fetch user data when type or id changes
  useEffect(() => {
    if (id) fetchUserData();
  }, [type, id]);

  const fetchUserData = async () => {
    try {
      const response = await getAllUsers(id);
      if (response.status === 200) {
        setUserData(response.data);
        showToast("success", response.message || "Applications Fetched");
      } else {
        showToast("error", response.message || "Failed to fetch users");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong while fetching users.");
    }
  };

  const userList = useMemo(() => {
    if (!role) return null; // Wait until role is loaded

    if (["masterAdmin", "admin", "agent"].includes(role)) {
      return <SubUserApplicant data={userData} role={role} />;
    } else if (["agent", "subAgent"].includes(role)) {
      return <LoanApplications />;
    } else if (["masterAdmin", "admin"].includes(role)) {
      return <UserApplicant />;
    } else if (["masterAdmin", "admin", "bankOperator"].includes(role)) {
      return <BankApplicant />;
    }

    return null;
  }, [role, userData]);

  return (
    <Layout setSidebarCollapsed={setCollapsed}>
      {userList}
    </Layout>
  );
};

export default UsersClient;
