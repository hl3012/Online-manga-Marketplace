import { PlusCircle, ShoppingBasket, ChartBar } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useProductStore } from "../stores/useProductStore"


import CreateProductForm from "../components/CreateProductForm"
import ProductsList from "../components/ProductsList"
import AnalyticsTab from "../components/AnalyticsTab"



const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle},
  { id: "products", label: "Products", icon: ShoppingBasket},
  { id: "analytics", label: "Analytics", icon: ChartBar}
]

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");


  const {fetchAllProducts} = useProductStore();
  useEffect(()=>{
    fetchAllProducts();
  },[fetchAllProducts])

  

  return (
    <div className='min-h-screen relative overflow-hidden'>
      <div className='relative z-10 container mx-auto px-4 py-20'>

        <motion.h1
          className='text-4xl font bold mb-8 text-gray-900 text-center'
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
        >
          Admin Dashboard
        </motion.h1>


        <div className='flex justify-center mb-8'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
              >
                <tab.icon className='w-6 h-6 mr-2' />
                {tab.label} 
            </button>
             
          ))}

        </div>

        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}

      </div>
      
    </div>
  )
}

export default AdminPage