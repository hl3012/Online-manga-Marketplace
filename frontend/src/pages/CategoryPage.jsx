import { useEffect } from 'react'
import { useProductStore } from '../stores/useProductStore';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const {fetchProductsByCategory, products} = useProductStore();
  const {category} = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory])


  console.log("products: ", products)
  
  return (
    <div className='min-h-screen'>
      <div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>

        <motion.h1
          className='text-center text-4xl sm:text-4xl font-bold text-gray-600 mb-8'
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)} 
        </motion.h1>


        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay:0.2}}
        >
          {products?.length === 0 && (
            <h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
              No products found
            </h2>
          )}

          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>


      </div>
      {/* <div className='absolute inset-0 h-[10vw] bg-gradient-to-b from-black to-transparent opacity-30 z-[-1]' /> */}
    </div>
  )
}

export default CategoryPage