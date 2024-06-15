"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import MapOne from "../Maps/MapOne";
import { useAppSelector } from "@/lib/hooks";
import AdminDashboard from "./AdminDashboard";
import CompanyDashboard from "./CompanyDashboard";

const ECommerce: React.FC = () => {
  const user = useAppSelector((state) => state.auth.currentUser);
  console.log("user: ", user);
  return (
    <>{user?.role == "admin" ? <AdminDashboard /> : <CompanyDashboard />}</>
  );
};

export default ECommerce;
