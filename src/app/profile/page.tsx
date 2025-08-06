"use client"
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const [file,setFile] = useState<File|null>(null);
  const [fileName,setFileName] = useState<string|null>(null);
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const selectedFile = e.target.files?.[0];
    if(selectedFile){
      if(selectedFile.type === "application/pdf"){
        setFile(selectedFile);
        setFileName(selectedFile.name);
      }else{
        console.log("selected file is not an pdf file")
      }
    }else{
      console.log("Failed to get the file")
    }
  }
  const sendToImageKit = async(e:React.FormEvent)=>{
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("file",file!);
      formdata.append("filename",fileName!);

      const response = await axios.post('/api/resumehandler', formdata, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        console.log(response.data.message);
        toast.success(response.data.message);
      }
      // console.log("")
    } catch (error) {
      console.log("Failed to send the file to backend!!"+error)
    }
  }

  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      Get Started with Profile Page for now!!--demo
      <section className='flex justify-center items-center w-screen flex-col'>
        <label className='font-bold text-2xl'>Upload the Resume</label>
        <input type="file"
        onChange={handleChange}
        accept='.pdf'
        className='flex justify-center items-center p-2 border-2 border-amber-600 rounded-md hover:bg-zinc-50'
        />
        <button className='p-2 bg-red-300' onClick={sendToImageKit}>Upload</button>
      </section>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, nam.
      </div>
    </div>
  )
}

export default ProfilePage