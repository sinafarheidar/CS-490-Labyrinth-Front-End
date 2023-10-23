import { Action, Log, OperatingSystem } from "../Types/Logs/logTypes";

const createIP = (): string => {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(
    Math.random() * 256
  )}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
};

const createNewLog = (): Log => {
  const date_created = "";
  const ipAddress = createIP();

  const systems: OperatingSystem[] = ["Mac OS", "Windows"];
  const operatingSystem = systems[Math.floor(Math.random() * systems.length)];

  const actions: Action[] = ["Viewed", "Edited", "Deleted"];
  const action = actions[Math.floor(Math.random() * actions.length)];

  return {
    date_created,
    IPAddress: ipAddress,
    OS: operatingSystem,
    Action: action,
  };
};

export const logs: Log[] = Array(15)
  .fill(null)
  .map(() => createNewLog());
