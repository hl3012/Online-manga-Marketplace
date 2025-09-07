import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useState, useEffect } from "react";

const Navbar = () => {

  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
          setIsScrolled(window.scrollY > 10); 
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (

    // <header className='fixed top-0 left-0 w-full bg-white00 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
            ? 'bg-gray-600 bg-opacity-50 border-gray-200' 
            : 'bg-transparent border-transparent' 
    }`}>
      
      <div className ='container mx-auto px-4 py-3'>
        <div className='flex flex-wrap items-center justify-between'>
          <Link to='/' className='text-4xl font-black uppercase tracking-widest text-gray-900 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] 
          [text-shadow:_1px_1px_0_#fff,_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff] hover:scale-105 transition-transform items-center space-x-2 flex'>
             Manga World
          </Link>


          <nav className='flex flex-wrap items-center gap-4'>
            <Link to='/' className='text-white hover:scale-110 transition duration-300 ease-in-out'>
              Home
            </Link>
            
            {user && (
              <Link to='/cart' className='relative group text-white hover:scale-110 transition duration-300 ease-in-out'>
                <ShoppingCart className='inline-block mr-1 group-hover:scale-110' size={20}/>
                <span className='hidden sm:inline group-hover:scale-110'>Cart</span>
                {cart.length > 0 && <span className='absolute -top-2 -left-2 bg-black text-white rounded-full px-2 py-0.5 text-xs group-hover:scale-110 transition duration-300 ease-in-out'>{cart.length}</span>}
              </Link>
            )}

            {isAdmin && (
              <Link className='bg-white hover:bg-gray-200 text-gray-900 py-1 px-2  flex items-center transition duration-300 ease-in-out'
              to={"/secret-dashboard"}>
                <Lock className='inline-block mr-1' size={18}/> 
                <span className='hidden sm:inline'>Dashboard</span>
              </Link>
            )}


            {user ? (
                <button className='bg-white hover:bg-gray-200 text-gray-900 py-1 px-2  flex items-center transition duration-300 ease-in-out'
                        onClick={logout}>
                  <LogOut size={18}/>
                  <span className='hidden sm:inline ml-2'>Log Out</span>
                </button>
              ) : (
                <>
                  <Link to={"/signup"} className='bg-white hover:bg-gray-200 text-gray-900 py-1 px-2  flex items-center transition duration-300 ease-in-out'>
                    <UserPlus className='mr-2' size={18}/>
                    Sign Up
                  </Link>

                  <Link to={"/login"} className='bg-white hover:bg-gray-200 text-gray-900 py-1 px-2  flex items-center transition duration-300 ease-in-out'>
                    <LogIn className='mr-2' size={18}/>
                    Log In
                  </Link>
                </>
            )}

          </nav>


        </div>

      </div>

    </header>
  )
}

export default Navbar