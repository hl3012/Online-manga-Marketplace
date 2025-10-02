import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LogIn, Mail, Lock, ArrowRight, Loader } from 'lucide-react'

import { useUserStore } from '../stores/useUserStore'


const LoginPage = () => {
  
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  
  const {login, loading} = useUserStore();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  }
  


  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>

      <motion.div
      className='sm:mx-auto sm:w-full sm:max-w-md'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8}}
      >
        <h2 className='mt-20 text-center text-3xl font-extrabold text-gray-900'>Login your account</h2>

      </motion.div>

      <motion.div
      className='mt-5 sm:mx-auto sm:w-full sm:max-w-md'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      >

        <div className='bg-gray-100 py-8 px-4 shadow sm:px-10'>

          <form onSubmit={handleSubmit} className='space-y-6'>

            <div>
              <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email address</label>
              <div className='mt-1 relative shadow-sm'>
                <div className='absolute inset-y-0 left-2 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input 
                id='email'
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='block w-full px-3 py-2 pl-10 bg-white border border-gray-300 
                 shadow-sm placeholder-gray-400 
                focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                placeholder='you@example.com'
                 />
              </div>
            </div>

            <div>
              <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
              <div className='mt-1 relative shadow-sm'>
                <div className='absolute inset-y-0 left-2 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
                <input 
                id='password'
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='block w-full px-3 py-2 pl-10 bg-white border border-gray-300 
                shadow-sm placeholder-gray-400 
                focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                placeholder='**********'
                 />
              </div>
            </div>

            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent 
              shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none 
              focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-50'
              disabled={loading}
            >
              {loading ? (
                <>
                <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' /> 
                Loading...
                </>
              ) : (
                <>
                  <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
                  Log In
                </>
              )}

            </button>

            <p className='mt-8 text-center text-sm text-gray-500'>
              Not a member?
              <Link to='/signup' className='font-semibold text-gray-800 hover:text-gray-600 ml-1'>
                Signup now 
                <ArrowRight className='inline h-4 w-4' />
              </Link>
            </p>

          </form>
        </div>

      </motion.div>
      <div className='absolute inset-0 h-[10vw] bg-gradient-to-b from-black to-transparent opacity-30 z-[-1]' />
    </div>    
  )
}

export default LoginPage