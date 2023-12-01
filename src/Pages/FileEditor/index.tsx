import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "react-query";

import {
  fetchAllFiles,
  fetchFileById,
  updateFileContent,
  validateKey,
} from "./queries";
import { CircularProgress } from "@mui/material";
import { queryKeys } from "../../queryKeys";
import { useState } from "react";
import { ProtectedFileEditorPage } from "./ProtectedFileEditor";

type UpdateFileParams = {
  fileId: string;
  fileContent: string;
};

type CheckValidKeyParams = {
  pathKey: string;
};

export const FileEditorPageContainer = () => {
  const [editedFileId, setEditedFileId] = useState("");
  const [pathKey, setPathKey] = useState("");
  const [isKeyValid, setIsKeyValid] = useState<boolean>(false);
  const [updatedFile, setUpdatedFile] = useState(false);

  const queryClient = new QueryClient();

  const handleSelectNewFileName = (fileId: string) => {
    setEditedFileId(fileId);
  };

  const updatePathKey = (updatedKey: string) => setPathKey(updatedKey);

  const { data: allFiles, isLoading: isLoadingAllFiles } = useQuery(
    queryKeys.getAllFiles,
    fetchAllFiles
  );

  const { data: fileContent = "", isLoading: isLoadingFileData } = useQuery(
    [queryKeys.getFileByName, editedFileId],
    () => fetchFileById(editedFileId)
  );

  const updateFileMutation = useMutation(
    ({ fileId, fileContent }: UpdateFileParams) =>
      updateFileContent(fileId, fileContent),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.getAllFiles);
        setUpdatedFile(true);
      },
      onError: (error) => {
        console.log("Failed to update the file: ", error);
      },
    }
  );

  const checkValidKeyMutation = useMutation(
    ({ pathKey }: CheckValidKeyParams) => {
      return validateKey(pathKey);
    },
    {
      onSuccess: (data) => {
        setIsKeyValid(data);
      },
      onError: (error) => {
        console.log("Failed to validate key: ", error);
      },
    }
  );

  const handleEditFile = (newContent: string) => {
    updateFileMutation.mutate({
      fileId: editedFileId,
      fileContent: newContent,
    });
  };

  const handleKeyValidation = (): any => {
    return new Promise<boolean>((resolve, reject) => {
      checkValidKeyMutation.mutate(
        { pathKey },
        {
          onSuccess: (data) => {
            setIsKeyValid(data); // Update the state
            resolve(data); // Resolve the promise with the result
          },
          onError: (error) => {
            console.error("Error validating key:", error);
            reject(error); // Reject the promise on error
          },
        }
      );
    });
  };

  if (isLoadingAllFiles) return <CircularProgress />;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProtectedFileEditorPage
          isLoadingFileData={isLoadingFileData}
          fileOptions={allFiles}
          updatedFile={updatedFile}
          fileContent={fileContent}
          handleSelectNewFile={handleSelectNewFileName}
          handleEditFile={handleEditFile}
          handleKeyValidation={handleKeyValidation}
          updatePathKey={updatePathKey}
          isKeyValid={isKeyValid}
        />
      </QueryClientProvider>
    </>
  );
};
