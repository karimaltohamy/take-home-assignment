const generateDailyStatusForDateRange = (
  startDate: string,
  endDate: string
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const statuses = ["Up", "Down", "Degraded"];
  const statusHistory: any[] = [];

  for (
    let currentDate = start;
    currentDate <= end;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const date = currentDate.toISOString().split("T")[0];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const uptime = `${(80 + Math.random() * 20).toFixed(1)}%`;
    const responseTime = `${Math.floor(50 + Math.random() * 450)}ms`;

    statusHistory.push({
      date,
      status,
      uptime,
      responseTime,
    });
  }

  return statusHistory;
};

export const servers = [
  {
    id: 1,
    name: "Server 1",
    ipAddress: "192.168.1.1",
    status: "Up",
    responseTime: "120ms",
    uptime: "80.9%",
    statusHistory: generateDailyStatusForDateRange("2024-09-01", "2024-12-01"),
  },
  {
    id: 2,
    name: "Server 2",
    ipAddress: "192.168.1.2",
    status: "Down",
    responseTime: "N/A",
    uptime: "95.2%",
    statusHistory: generateDailyStatusForDateRange("2024-09-01", "2024-12-01"),
  },
  {
    id: 3,
    name: "Server 3",
    ipAddress: "192.168.1.3",
    status: "Degraded",
    responseTime: "98ms",
    uptime: "99.5%",
    statusHistory: generateDailyStatusForDateRange("2024-09-01", "2024-12-01"),
  },
  {
    id: 4,
    name: "server 4",
    ipAddress: "192.168.1.4",
    status: "Down",
    responseTime: "N/A",
    uptime: "90.0%",
    statusHistory: generateDailyStatusForDateRange("2024-09-01", "2024-12-01"),
  },
];
