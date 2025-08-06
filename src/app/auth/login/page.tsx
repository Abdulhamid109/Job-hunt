'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/login', { email, password }, { withCredentials: true })

      if (response.status === 200) {
        router.push("/profile");
        toast.success("Successfully logged in")
      }
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen '>
      <section className='p-6 bg-gradient-to-bl from-indigo-400-400 to-zinc-700 rounded-xl shadow-md w-96'>
        <h2 className='text-xl font-semibold text-center mb-4'>Login Page</h2>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </section>
    </div>
  )
}

export default LoginPage;
