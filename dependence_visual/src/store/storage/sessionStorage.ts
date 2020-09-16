import { hotFile } from "@/api/scanner/hotFile";

const PREFIX = "ArchGrard_";
enum StorageKeys {
  SYSTEM_ID = "SYSTEM_ID",
  HOT_FILE = "HOT_FILE",
}

const getSystemId = () => {
  return sessionStorage.getItem(PREFIX + StorageKeys.SYSTEM_ID);
};

const setSystemId = (value: any) => {
  return sessionStorage.setItem(PREFIX + StorageKeys.SYSTEM_ID, value);
};

const getHotFiles = () => {
  const hotFiles: hotFile[] = JSON.parse(
    sessionStorage.getItem(PREFIX + StorageKeys.HOT_FILE) || "[]",
  );
  return hotFiles.map((file) => file.jclassId);
};

const setHotFiles = (hotFiles: hotFile[]) => {
  return sessionStorage.setItem(PREFIX + StorageKeys.HOT_FILE, JSON.stringify(hotFiles));
};

const clear = () => {
  return sessionStorage.clear();
};

export const storage = {
  getSystemId,
  setSystemId,
  getHotFiles,
  setHotFiles,
  clear,
};
