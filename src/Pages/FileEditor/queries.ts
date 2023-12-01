export const fetchAllFiles = async () => {
  const response = await fetch("http://localhost:3001/files");

  if (!response.ok) throw new Error("Network response was not ok");

  return response.json();
};

export const fetchFileById = async (fileId: string): Promise<string> => {
  if (fileId === "") return "";
  const numberFileId = parseInt(fileId);
  const response = await fetch(`http://localhost:3001/file/${numberFileId}`);

  if (!response.ok) throw new Error("Network response was not ok");

  return response.text();
};

export const updateFileContent = async (
  fileId: string,
  fileContent: string
) => {
  const response = await fetch("http://localhost:3001/update-file", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ fileId: fileId, fileContent: fileContent }),
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

export const addLog = async () => {
  const response = await fetch("http://localhost:3001/log", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};

export const validateKey = async (pathKey: string): Promise<boolean> => {
  const response = await fetch(`http://localhost:3001/keys/${pathKey}`);

  if (!response.ok) throw new Error("Network response was not ok");

  return await response.json();
};
