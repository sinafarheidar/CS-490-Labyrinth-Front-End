import "./fileEditor.css";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Link,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../Components/Dropdown";
import { File } from "../../Types/FileEditor";
import { useEffect, useState } from "react";
import { AlertBar } from "../../Components/Alert";

type FileEditorProps = {
  fileOptions: File[];
  fileContent: string;
  isLoadingFileData?: boolean;
  handleSelectNewFile: (fileName: string) => void;
  handleEditFile: (newContent: string) => void;
  handleKeyValidation: () => void;
  updatePathKey: (updatedKey: string) => void;
  updatedFile: boolean;
};

export const FileEditor = ({
  fileOptions,
  fileContent,
  handleSelectNewFile,
  isLoadingFileData = false,
  handleEditFile,
  updatedFile,
}: FileEditorProps) => {
  const navigate = useNavigate();
  const [textFieldValue, setTextFieldValue] = useState(fileContent);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setTextFieldValue(fileContent);
  }, [fileContent]);

  const goToLogsPage = () => {
    navigate("/");
  };

  const dropdownFileOptions = fileOptions.map((fileOption) => ({
    displayTitle: fileOption.fileName,
    value: fileOption.id,
  }));

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextFieldValue(event.target.value);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
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
            <Link onClick={goToLogsPage} style={{ cursor: "pointer" }}>
              here
            </Link>
          </Typography>
        </div>

        <h2>File Editor</h2>

        <div style={{ width: "30%", marginBottom: "3%" }}>
          <Dropdown
            dropdownOptions={dropdownFileOptions}
            handleChange={handleSelectNewFile}
            title="Files"
          />
        </div>

        {isLoadingFileData ? (
          <Box sx={{ width: "100%" }}>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
          </Box>
        ) : (
          <TextField
            style={{ width: "100%", height: "250px", marginBottom: "2%" }}
            id="outlined-multiline-static"
            label="Edit .txt file"
            multiline
            value={textFieldValue}
            rows={10}
            onChange={handleTextFieldChange}
          />
        )}

        <Button
          variant="contained"
          size="large"
          style={{ marginTop: "5%", float: "right" }}
          endIcon={<SendIcon />}
          onClick={() => handleEditFile(textFieldValue)}
        >
          Submit Edits
        </Button>

        {showAlert ? (
          <AlertBar
            severity="success"
            message="Successfully Edited the file!"
            handleCloseAlert={handleCloseAlert}
          />
        ) : null}
        <div style={{ marginBottom: "100px" }} />
      </div>
    </>
  );
};
