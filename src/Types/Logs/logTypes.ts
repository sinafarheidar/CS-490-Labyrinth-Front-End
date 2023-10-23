export type OperatingSystem = "Mac OS" | "Windows";
export type Action = "Viewed" | "Edited" | "Deleted";

export type Log = {
  date_created: string;
  IPAddress: string;
  OS: OperatingSystem;
  Action: Action;
};
