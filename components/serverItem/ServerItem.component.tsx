"use client";
import { Server } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdOutlineTrendingDown } from "react-icons/md";
import "./serverItem.css";
import { HiCalendarDateRange } from "react-icons/hi2";
import dynamic from "next/dynamic";

const StatusButton = dynamic(() => import("../statusButton/StatusButton"), {
  ssr: false,
});

interface ServerItemProps {
  server: Server;
}

interface StatusDetails {
  icon: JSX.Element;
  color: string;
}

const statusDetails: Record<string, StatusDetails> = {
  Up: {
    icon: <FaCaretUp size={20} color="#28a745" />,
    color: "#28a745",
  },
  Down: {
    icon: <FaCaretDown size={20} color="#ffc107" />,
    color: "#ffc107",
  },
  Degraded: {
    icon: <MdOutlineTrendingDown size={20} color="#dc3545" />,
    color: "#dc3545",
  },
};

const ServerItem: React.FC<ServerItemProps> = ({ server }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const { icon, color } = statusDetails[server.status];

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border border-gray-200 rounded-md shadow-lg shadow-slate-100 p-4 mb-4 last:mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-bold">{server.name}</h4>

        <div className="flex items-center gap-[1px]">
          {icon}
          <span
            className={`text-[12px]`}
            style={{
              color,
            }}
          >
            {server.status}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-[6px]">
        {server.statusHistory.map((status, index) => (
          <div
            key={index}
            ref={boxRef}
            className="relative"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <StatusButton status={status.status} isOpen={openIndex === index} />

            {openIndex === index && (
              <div className="info_box">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <HiCalendarDateRange size={16} />
                  {status.date}
                </span>

                <ul className="items">
                  <li>
                    name: <span>{server.name}</span>
                  </li>
                  <li>
                    Ip Address: <span>{server.ipAddress}</span>
                  </li>
                  <li>
                    Response Time: <span>{status.responseTime}</span>
                  </li>
                  <li>
                    Uptime: <span>{status.uptime}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerItem;
