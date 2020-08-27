import storage from '@/store/storage/sessionStorage'

const projectId = storage.getProjectId()
export const baseURL = `/api/module/projects/${projectId}`
