import { useState, useCallback } from 'react'
import { apiDarna } from '../api/client'
import axios from 'axios'

interface UploadProgress {
    loaded: number
    total: number
    percentage: number
}

interface UseUploadResult {
    upload: (file: File, onProgress?: (progress: UploadProgress) => void) => Promise<string>
    isUploading: boolean
    progress: UploadProgress | null
    error: Error | null
}

export const useUpload = (): UseUploadResult => {
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState<UploadProgress | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const upload = useCallback(async (
        file: File,
        onProgress?: (progress: UploadProgress) => void
    ): Promise<string> => {
        setIsUploading(true)
        setError(null)
        setProgress(null)

        try {
            // Step 1: Request presigned URL from backend
            const { data } = await apiDarna.post('/media/presigned-url', {
                filename: file.name,
                contentType: file.type,
            })

            const { url, key } = data.data

            // Step 2: Upload directly to MinIO using presigned URL
            await axios.put(url, file, {
                headers: {
                    'Content-Type': file.type,
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progressData: UploadProgress = {
                            loaded: progressEvent.loaded,
                            total: progressEvent.total,
                            percentage: Math.round((progressEvent.loaded / progressEvent.total) * 100),
                        }
                        setProgress(progressData)
                        if (onProgress) {
                            onProgress(progressData)
                        }
                    }
                },
            })

            setIsUploading(false)
            return key // Return the file key/URL
        } catch (err) {
            const uploadError = err as Error
            setError(uploadError)
            setIsUploading(false)
            throw uploadError
        }
    }, [])

    return {
        upload,
        isUploading,
        progress,
        error,
    }
}
