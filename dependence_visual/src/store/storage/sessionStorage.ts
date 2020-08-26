const PREFIX = 'ArchGrard_'
enum StorageKeys {
  PROJECT_ID = 'PROJECT_ID'
}

const getProjectId = () =>  {
  console.log(sessionStorage.getItem(PREFIX + StorageKeys.PROJECT_ID))
  return sessionStorage.getItem(PREFIX + StorageKeys.PROJECT_ID)
}

const setProjectId = (value: any) => {
  return sessionStorage.setItem(PREFIX + StorageKeys.PROJECT_ID, value)
}

export default {
  getProjectId,
  setProjectId,
}
