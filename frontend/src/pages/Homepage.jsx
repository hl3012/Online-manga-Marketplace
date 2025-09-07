import CategoryItem from '../components/CategoryItem'
import { useProductStore } from '../stores/useProductStore';
import FeaturedProducts from '../components/FeaturedProducts';
import { useState, useEffect } from 'react';

const categories = [
    { href: "/romance", name: "ROMANCE", imageUrl: "/romance.jpg" },
    { href: "/school", name: "SCHOOL", imageUrl: "/school.jpg" },
    { href: "/horror", name: "HORROR", imageUrl: "/horror.jpg" },
    { href: "/mecha", name: "MECHA", imageUrl: "/mecha.jpg" },
    { href: "/sci-fi", name: "SCIENCE FICTION", imageUrl: "/scifi.jpg" },
    { href: "/detective", name: "DETECTIVE", imageUrl: "/detective.jpg" },
];

const HomePage = () => {
    const {fetchFeaturedProducts, products, loading} = useProductStore();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchFeaturedProducts();
        console.log("products: ", products)
    }, [fetchFeaturedProducts]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex == categories.length - 1) {
                return 0; 
            }
            return prevIndex + 1;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex == 0) {
                return categories.length - 1;
            }
            return prevIndex - 1;
        });
    };

  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
      <div className='relative z-10 w-full px-0'>
        <div className='relative'>
          <button
            onClick={prevSlide}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 text-8xl text-white p-2 z-20 hover:scale-110'>
            &#8249;
          </button>
          
          <button
            onClick={nextSlide}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 text-8xl text-white p-4 z-20 hover:scale-110'>
            &#8250;
          </button>
          
          <div className='relative h-[90vh] md:h-[90vh] lg:h-[90vh]'>
            <CategoryItem category={categories[currentIndex]} />
          </div>
        </div>

        {!loading && products?.length > 0 && <FeaturedProducts featuredProducts={products} />}
      </div>
    </div>
  )
}

export default HomePage