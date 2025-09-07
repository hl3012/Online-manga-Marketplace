import toast from "react-hot-toast"
import { ShoppingCart } from "lucide-react"
import { useUserStore } from "../stores/useUserStore"
import { useCartStore } from "../stores/useCartStore"


const ProductCard = ({product}) => {
    const {user} = useUserStore();
    const {addToCart} = useCartStore();

    const handleAddToCart = () => {
        if(!user){
            toast.error("Please log in to add a product to cart", {id: "login"});
            return;
        } else{
            addToCart(product);
        }
    }

  return (
    <div className='flex w-full relative flex-col overflow-hidden border  shadow-lg'>

        <div className='relative mx-3 mt-3 flex h-80 overflow-hidden'>
            <img className='object-cover w-full' src={product.image} alt='product image' />
            <div className='absolute inset-0 bg-black bg-opacity-20' />
        </div>

        <div className='mt-2 px-4 pb-0'>
            <h5 className='text-lg font-semibold mb-1 text-gray-900 uppercase tracking-wide'>{product.name}</h5>
            <div className='mt-2 mb-5 flex items-center justify-between'>
                <p>
                    <span className='text-gray-500 font-medium mb-0'>${product.price}</span>
                </p>
            </div>
        </div>
            <button
                className='w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-1 px-0 transition-colors duration-300 
                flex items-center justify-center'
                onClick={handleAddToCart}
            >
                <ShoppingCart size={22} className='mr-2' />
                Add to cart
            </button>

    </div>
  )
}

export default ProductCard