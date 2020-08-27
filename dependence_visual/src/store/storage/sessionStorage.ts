const PREFIX = 'ArchGrard_'
enum StorageKeys {
  PROJECT_ID = 'PROJECT_ID'
}

const getProjectId = () =>  {
  return sessionStorage.getItem(PREFIX + StorageKeys.PROJECT_ID)
}

const setProjectId = (value: any) => {
  return sessionStorage.setItem(PREFIX + StorageKeys.PROJECT_ID, value)
}

export const storage = {
  getProjectId,
  setProjectId,
}
