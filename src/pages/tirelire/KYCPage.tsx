import React from 'react'
import { useKYCStatus, useUploadKYC } from '../../hooks/useTirelire'
import { toast } from 'react-toastify'

const KYCPage: React.FC = () => {
    const { data: kyc } = useKYCStatus()
    const uploadKYC = useUploadKYC()

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('idImage', file)
        formData.append('idNumber', 'ID123456')

        try {
            await uploadKYC.mutateAsync(formData)
            toast.success('KYC documents uploaded')
        } catch (error) {
            toast.error('Failed to upload KYC')
        }
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">KYC Verification</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="font-semibold mb-4">Current Status</h3>
                <p className="text-lg capitalize">{kyc?.status || 'Not submitted'}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Upload Documents</h3>
                <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white"
                />
            </div>
        </div>
    )
}

export default KYCPage
