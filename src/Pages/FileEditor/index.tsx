import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { FileEditor } from "./FileEditor";

export const FileEditorPageContainer = () => {
  //   const fetchMyData = async () => {
  //     const response = await fetch("http://localhost:3001/data");
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   };

  //   const { data, isLoading } = useQuery("getLogs", fetchMyData);

  //   if (isLoading)
  //     return (
  //       <QueryClientProvider client={queryClient}>
  //         <CircularProgress />
  //       </QueryClientProvider>
  //     );

  return (
    <>
      <FileEditor />
    </>
  );
};
