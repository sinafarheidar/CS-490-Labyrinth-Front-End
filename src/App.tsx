import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { NavBar } from "./Components/Nav";
import { LogsPageContainer } from "./Pages/LogPage";
import { FileEditorPageContainer } from "./Pages/FileEditor";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" Component={LogsPageContainer} />
          <Route path="/editor" Component={FileEditorPageContainer} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
