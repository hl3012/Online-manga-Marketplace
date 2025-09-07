import { Link } from 'react-router-dom'

const CategoryItem = ({category}) => {
  return (
    <div className='relative overflow-hidden h-[90vh] md:h-[90vh] lg:h-[90vh] w-full group'>
        <Link to={"/category" + category.href}>
            <div className='w-full h-full cursor-pointer'>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent to-gray-900 opacity-50 z-10' />
                <div className='absolute inset-0 bg-gradient-to-b from-white via-white/0 to-transparent opacity-20 z-10' />
                <img 
                src={category.imageUrl} 
                alt={category.name} 
                className='w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110'
                loading='lazy'
                />
                <div className='absolute top-1/2 transform -translate-y-1/2 right-20 p-4 z-20'>
                    <h3 className='text-white text-2xl font-bold mb-2'>{category.name}</h3>
                    <p className='text-gray-200 text-sm'>Explore {category.name} Manga</p>
                </div>
                {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div> */}

            </div>
        </Link>

    </div>

  )
}

export default CategoryItem