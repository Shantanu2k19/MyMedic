"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function hello(){
    const { data: session } = useSession();
    // console.log("user name")
    // console.log(session?.user?.name)
    // console.log("user email")
    // console.log(session?.user?.email)

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [csrfToken, setCsrfToken] = useState<string>('');
  
    useEffect(() => {
      const fetchCsrfToken = async () => {
        console.log("fetching csrf token");
        try {
          const response = await axios.get('http://localhost:8000/csrf/',{
            withCredentials: true,
            params: {
              username: 'your_username_here',
            },
          });
          console.log("got token");
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
            'X-APIKEY': 'api_key',
            'X-username': 'user123'
          },
          withCredentials: true,
        });
        console.log('Response:', response.data);
        setUploadStatus('File uploaded successfully!');
      } catch (error: any) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request data:', error.request);
        } 
        console.error('Error message:', error.message);
        
        setUploadStatus('Error uploading file.');
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
