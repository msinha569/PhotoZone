import { Collection } from '@/components/shared/Collection'
import { navLinks } from '@/constants'
import { getAllImages, getOtherImages } from '@/lib/actions/image.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = async({ searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1
  const searchQuery = (searchParams?.query as string) || ''

  const images = await getAllImages({page, searchQuery})
  const cloudImages:any = await getOtherImages({searchQuery})
  
  return (
    <div>
      <section className='home'>
        <h1 className='home-heading'>
          Unleash Your creative vision with PhotoZone
        </h1>
        <ul className='flex-center w-full gap-20'>
          {navLinks.slice(1,5).map((link) => (
            <Link
            key={link.route}
            href={link.route}
            className='flex-center flex-col gap-2'>
              <li className='flex-center w-fit rounded-full bg-white p-4'>
              <Image
                src={link.icon}
                alt={link.label}
                width={24}
                height={24}/>
              </li>
              <p className='p-14-medium text-white'>
                {link.label}
              </p>
            </Link>
          ))}
        </ul>
      </section>

      <section className='sm:mt-12'>
        <Collection
        hasSearch={true}
        images={images?.data}
        totalPages={images?.totalPage}
        page={page}
        />
      </section>

      <section className='flex gap-5 flex-row flex-wrap rounded-lg mt-20'>
         { cloudImages && cloudImages.data.map((image:any,index:any) => (
            <div key={index} className='transition-transform duration-300 ease-in-out hover:scale-110'>
              <img
              className='rounded-lg'
              src={image}
              alt={image}
              width={200}
              height={200}/>
            </div>
         ))}
      </section>
     
    </div>
  )
}

export default Home
