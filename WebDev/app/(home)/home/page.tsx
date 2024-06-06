"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function hello(){
    //const { data: session } = useSession();
    //console.log(session?.user?.name)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [csrfToken, setCsrfToken] = useState<string>('');
  
    useEffect(() => {
      const fetchCsrfToken = async () => {
        try {
          const response = await axios.get('http://localhost:8000/csrf/');
          setCsrfToken(response.data.csrfToken);
        } catch (error) {
          console.error('Error fetching CSRF token:', error);
        }
      };
  
      fetchCsrfToken();
    }, []);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      }
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (!selectedFile) {
        setUploadStatus('No file selected.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await axios.post('http://localhost:8000/upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        });
        setUploadStatus('File uploaded successfully!');
      } catch (error) {
        setUploadStatus('Error uploading file.');
        console.error(error);
      }
    };
  
    return (
        <>
        <div>
          <h1>Upload a File</h1>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit" className="bg-white text-black border border-gray-300 px-4 py-2 text-lg cursor-pointer">Upload</button>
          </form>
          {uploadStatus && <p className="bg-white text-black border border-gray-300 px-4 py-2 text-lg cursor-pointer">{uploadStatus}</p>}
        </div>
        </>
    )
}
