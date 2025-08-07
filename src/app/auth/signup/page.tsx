'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


interface SignupDataFormat{
  fullName:string;
  email:string;
  password:string;
  phoneNumber:string;
}

const SignupPage = () => {
  const [data,setdata] = useState<SignupDataFormat>({
    fullName:"",
    email:"",
    password:"12345",
    phoneNumber:"12"
  });
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/signup', data , { withCredentials: true })
      if (response.status === 200) {
        //console.log("cuid => "+response.data.uid); //this is present on client side only ..hence will be using redis..
        toast.success("Successfully account created");
        router.push("/auth/login");
      }
    } catch (error:any) {
      // if(error.status === 404){
      //   toast.error("Account Already exists..");
      // }
      console.error('Signup failed:', error.response.data.error);
      toast.error(error.response.data.error)
      // alert('Signup failed')
    }
  }


  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen '>
      <section className='p-6 bg-gradient-to-bl from-indigo-400-400 to-zinc-700 rounded-xl shadow-md w-96'>
        <h2 className='text-xl font-semibold text-center mb-4'>Signup Page</h2>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <input
            type="text"
            placeholder="Enter your FullName"
            value={data.fullName}
            onChange={(e)=>{setdata({...data,fullName:e.target.value})}}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setdata({...data,email:e.target.value})}
            className="p-2 border rounded"
            required
          />
          {/* <input
            type="text"
            placeholder="Enter your PhoneNumber"
            value={data.email}
            onChange={(e) => setdata({...data,email:e.target.value})}
            className="p-2 border rounded"
            required
          /> */} 
          {/* Phone Number Needs to be implemented alongside with the companycode-- for now on hold... */}
          <input
            type="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setdata({...data,password:e.target.value})}
            className="p-2 border rounded"
            title='for testing purpose its disabled(12345)'
            disabled
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            SignUp
          </button>
        </form>
      </section>
    </div>
  )
}

export default SignupPage;
