"use client";

import ServerItem from "@/components/serverItem/ServerItem.component";
import { servers } from "@/constants/servers";
import { Server } from "@/types";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

const page = () => {
  const [serversData, setServersData] = useState<Server[]>(servers);
  const [selectStatus, setSelectStatus] = useState<string>("all");
  const [sortCriteria, setSortCriteria] = useState("name-asc");

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria);
    const sorted = [...servers].sort((a, b) => {
      const [key, order] = criteria.split("-");

      switch (key) {
        case "name":
          return order === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "uptime":
          const uptimeA = parseFloat(a.uptime);
          const uptimeB = parseFloat(b.uptime);
          return order === "asc" ? uptimeA - uptimeB : uptimeB - uptimeA;
        case "responseTime":
          const responseTimeA =
            a.responseTime === "N/A" ? Infinity : parseInt(a.responseTime);
          const responseTimeB =
            b.responseTime === "N/A" ? Infinity : parseInt(b.responseTime);
          return order === "asc"
            ? responseTimeA - responseTimeB
            : responseTimeB - responseTimeA;
        default:
          return 0;
      }
    });
    setServersData(sorted);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg shadow-slate-100">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold flex items-center gap-4">
          <FaCircleCheck size={20} className="text-green-500" />
          All Servers
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <h6 className="text-[15px] text-gray-600">Status:</h6>
            <select
              className="border border-gray-300 rounded-md p-1 px-3"
              value={selectStatus}
              onChange={(e) => setSelectStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Up">Up</option>
              <option value="Down">Down</option>
              <option value="Degraded">Degraded</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <h6 className="text-[15px] text-gray-600">Sort:</h6>
            <select
              className="border border-gray-300 rounded-md p-1 px-3"
              value={sortCriteria}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="uptime-asc">Uptime (Lowest First)</option>
              <option value="uptime-desc">Uptime (Highest First)</option>
              <option value="responseTime-asc">
                Response Time (Fastest First)
              </option>
              <option value="responseTime-desc">
                Response Time (Slowest First)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* all servers */}
      <div className="">
        {serversData.length > 0
          ? serversData
              .filter((server: Server) => {
                if (selectStatus === "all") {
                  return true;
                }
                return server.status === selectStatus;
              })

              .map((server: Server, index: number) => {
                return <ServerItem key={index} server={server} />;
              })
          : ""}
      </div>
    </div>
  );
};

export default page;
