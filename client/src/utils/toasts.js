import { toast } from 'react-toastify';

export const toastSuccess = (msg) => toast.success(`${msg}`)
export const toastError = (msg) => toast.error(`${msg}`)