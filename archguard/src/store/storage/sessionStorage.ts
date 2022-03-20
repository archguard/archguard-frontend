import {GitChange, gitFile} from "@/api/module/gitFile";

const PREFIX = "ArchGrard_";
enum StorageKeys {
  SYSTEM_ID = "SYSTEM_ID",
  SYSTEM_LANG = "SYSTEM_LANG",
  HOT_FILE = "HOT_FILE",
  GIT_CHANGE = "GIT_CHANGE",
}

const getSystemId = () => {
  return sessionStorage.getItem(PREFIX + StorageKeys.SYSTEM_ID) || "";
};

const setSystemId = (value: any) => {
  return sessionStorage.setItem(PREFIX + StorageKeys.SYSTEM_ID, value);
};

const getSystemLanguage = () => {
  return sessionStorage.getItem(PREFIX + StorageKeys.SYSTEM_LANG) || "jvm";
};

const setSystemLanguage = (value: any) => {
  return sessionStorage.setItem(PREFIX + StorageKeys.SYSTEM_LANG, value);
};

const getHotFiles = () => {
  const hotFiles: gitFile[] = JSON.parse(
    sessionStorage.getItem(PREFIX + StorageKeys.HOT_FILE) || "[]",
  );
  return hotFiles.map((file) => file.jclassId);
};

const setHotFiles = (hotFiles: gitFile[]) => {
  return sessionStorage.setItem(PREFIX + StorageKeys.HOT_FILE, JSON.stringify(hotFiles));
};

const setGitChanges = (hotFiles: gitFile[]) => {
  return sessionStorage.setItem(PREFIX + StorageKeys.GIT_CHANGE, JSON.stringify(hotFiles));
};

const getGitChanges = () => {
  return JSON.parse(
    sessionStorage.getItem(PREFIX + StorageKeys.GIT_CHANGE) || "[]",
  );
};

const clear = () => {
  return sessionStorage.clear();
};

export const storage = {
  getSystemId,
  setSystemId,
  getHotFiles,
  setHotFiles,
  setGitChanges,
  getGitChanges,
  getSystemLanguage,
  setSystemLanguage,
  clear,
};
