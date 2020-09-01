const PREFIX = 'ArchGrard_'
enum StorageKeys {
  SYSTEM_ID = 'SYSTEM_ID'
}

const getSystemId = () =>  {
  return sessionStorage.getItem(PREFIX + StorageKeys.SYSTEM_ID)
}

const setSystemId = (value: any) => {
  return sessionStorage.setItem(PREFIX + StorageKeys.SYSTEM_ID, value)
}

export const storage = {
  getSystemId,
  setSystemId,
}
