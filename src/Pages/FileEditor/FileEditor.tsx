import "./fileEditor.css";
import SendIcon from "@mui/icons-material/Send";
import { Button, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const FileEditor = ({}) => {
  const navigate = useNavigate();

  const goToLogsPage = () => {
    navigate("/");
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
            Welcome to the file editor
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Here you can edit your .txt file. After submit the file and it will
            be saved an re-encrypted. By editing the file, it will add a "Edit"
            log entry to the log page. If you want to view logs you can get
            started by clicking&nbsp;
            <Link onClick={goToLogsPage}>here</Link>
          </Typography>
        </div>

        <h2>File Editor</h2>
        <TextField
          style={{ width: "100%" }}
          id="outlined-multiline-static"
          label="Edit .txt file"
          multiline
          rows={10}
        />

        <Button
          variant="contained"
          size="large"
          style={{ marginTop: "2%", float: "right" }}
          endIcon={<SendIcon />}
        >
          Submit Edits
        </Button>
        <div style={{ marginBottom: "100px" }} />
      </div>
    </>
  );
};
