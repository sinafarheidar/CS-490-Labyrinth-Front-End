import "./logsPage.css";
import { Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { LogTable } from "../../Components/Table";
import { Log } from "../../Types/Logs/logTypes";

type LogsPageProps = {
  logs: Log[];
};

export const LogsPage = ({ logs }: LogsPageProps) => {
  const navigate = useNavigate();

  const goToEditPage = () => {
    navigate("/editor");
  };

  return (
    <>
      <div className="content-container">
        <div className="welcome-container">
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to the log viewer
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Here you can view logs of when a file was viewed, deleted, or
            edited. You can see their IP, Operating System accessed by, and the
            date the log was created. If you want to edit a file you can
            start&nbsp;
            <Link onClick={goToEditPage}>here</Link>
          </Typography>
        </div>

        <h2>Log Table</h2>
        <LogTable logs={logs} />

        <div style={{ marginBottom: "100px" }} />
      </div>
    </>
  );
};
