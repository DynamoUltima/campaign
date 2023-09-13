import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import Tabbar from '@/components/tabbar'
import { Tab } from '@headlessui/react'
import { Fragment } from 'react'
import { categories } from '@/data/data'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <div className='relative h-full  w-4/5 max-w-screen-xl p-10'>
      <Tab.Group defaultIndex={1} as="div" className="mt-2 flex  flex-col h-full space-y-4   ">
        <div className='flex flex-row'>

          <div className='flex flex-col space-y-4'>
            <div className="text-gray-900  text-lg font-semibold">
              Customers
            </div>
            <div className='text-xs  text-gray-400'>
              See all your customers at one place
            </div>

          </div>

        </div>
        

          <Tabbar />

          {/* Tabs */}

          <div className='  '>
          <Tab.Panels as={Fragment}>
              {categories.map((category,index) => (
                <div key={category.name}>{category.page}</div>
              ))}
            </Tab.Panels>

          </div>
         

            

      

        </Tab.Group>







      </div>

    </Layout>
  )
}
