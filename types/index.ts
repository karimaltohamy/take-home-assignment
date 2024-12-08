type ServerStatusHistory = {
  date: string;
  status: string;
  responseTime: string;
  uptime: string;
};

export type Server = {
  id: number;
  name: string;
  ipAddress: string;
  status: string;
  responseTime: string;
  uptime: string;
  statusHistory: ServerStatusHistory[];
};
