import "./logsPage.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { LogsPage } from "./LogPage";
import { CircularProgress } from "@mui/material";

const queryClient = new QueryClient();

export const LogsPageContainer = () => {
  const fetchMyData = async () => {
    const response = await fetch("http://localhost:3001/logs");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading } = useQuery("getLogs", fetchMyData);

  if (isLoading)
    return (
      <QueryClientProvider client={queryClient}>
        <CircularProgress />
      </QueryClientProvider>
    );

  return (
    <>
      <LogsPage logs={data} />
    </>
  );
};
