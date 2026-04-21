import { useState, useCallback } from 'react'
import { Upload, File, X, CheckCircle } from 'lucide-react'

export default function KnexaUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState<string[]>([])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles])
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (files.length === 0) return
    
    setUploading(true)
    
    for (const file of files) {
      const reader = new FileReader()
      
      await new Promise((resolve) => {
        reader.onload = async () => {
          const base64 = reader.result as string
          const base64Content = base64.split(',')[1]
          
          try {
            const response = await fetch('https://newbotic.app.n8n.cloud/webhook/knexa-upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                filename: file.name,
                content: base64Content,
                businessId: 'test-business',
                mimeType: file.type
              })
            })
            
            if (response.ok) {
              setUploaded(prev => [...prev, file.name])
            }
          } catch (error) {
            console.error('Upload failed:', file.name, error)
          }
          
          resolve(null)
        }
        
        reader.readAsDataURL(file)
      })
    }
    
    setUploading(false)
    setFiles([])
  }

  return (
    <div className="glass-effect rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Upload size={20} className="text-primary-400" />
        Încarcă documente pentru KNEXA
      </h2>
      
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-primary-500 transition-colors cursor-pointer"
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <Upload size={40} className="mx-auto text-gray-400 mb-3" />
        <p className="text-gray-300 mb-1">
          Trage fișierele aici sau click pentru a selecta
        </p>
        <p className="text-gray-500 text-sm">
          PDF, Word, TXT (max 10MB)
        </p>
        <input
          id="file-input"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
      
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-400">Fișiere selectate:</p>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <File size={18} className="text-gray-400" />
                <span className="text-white">{file.name}</span>
                <span className="text-gray-500 text-sm">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-400">
                <X size={18} />
              </button>
            </div>
          ))}
          
          <button
            onClick={uploadFiles}
            disabled={uploading}
            className="w-full mt-4 bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {uploading ? 'Se procesează...' : `Încarcă ${files.length} fișiere`}
          </button>
        </div>
      )}
      
      {uploaded.length > 0 && (
        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <p className="text-green-400 flex items-center gap-2">
            <CheckCircle size={18} />
            {uploaded.length} fișiere încărcate cu succes!
          </p>
          <p className="text-gray-400 text-sm mt-1">
            KNEXA va procesa documentele în 1-2 minute.
          </p>
        </div>
      )}
    </div>
  )
}
