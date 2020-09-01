import { storage } from '@/store/storage/sessionStorage'

const systemId = storage.getSystemId()
export const baseURL = `/api/module/systems/${systemId}`
