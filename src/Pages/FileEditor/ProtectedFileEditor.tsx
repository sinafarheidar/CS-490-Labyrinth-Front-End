import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { FileEditor } from "./FileEditor";
import { File } from "../../Types/FileEditor";
import { AlertBar } from "../../Components/Alert";

type FileEditorProps = {
  fileOptions: File[];
  fileContent: string;
  isLoadingFileData?: boolean;
  handleSelectNewFile: (fileName: string) => void;
  handleEditFile: (newContent: string) => void;
  handleKeyValidation: () => boolean;
  updatePathKey: (updatedKey: string) => void;
  isKeyValid: any;
  updatedFile: boolean;
};

export const ProtectedFileEditorPage = ({
  fileOptions,
  fileContent,
  handleSelectNewFile,
  isLoadingFileData = false,
  handleEditFile,
  handleKeyValidation,
  updatePathKey,
  updatedFile,
}: FileEditorProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [key, setKey] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    updatePathKey(event.target.value);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const submitKey = async () => {
    try {
      const isValid = await handleKeyValidation();

      if (isValid) {
        setOpen(false);
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error validating key:", error);
    }
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        {showAlert ? (
          <AlertBar
            severity="error"
            message="The key you entered is not valid"
            handleCloseAlert={handleCloseAlert}
          />
        ) : null}

        <DialogTitle id="form-dialog-title">Enter Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To use the file editor, you will need to have your key validated.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="key"
            label="Key"
            type="text"
            fullWidth
            value={key}
            onChange={handleKeyChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitKey} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <>
        <FileEditor
          updatedFile={updatedFile}
          isLoadingFileData={isLoadingFileData}
          fileOptions={fileOptions}
          fileContent={fileContent}
          handleSelectNewFile={handleSelectNewFile}
          handleEditFile={handleEditFile}
          handleKeyValidation={handleKeyValidation}
          updatePathKey={updatePathKey}
        />
      </>
    </div>
  );
};
