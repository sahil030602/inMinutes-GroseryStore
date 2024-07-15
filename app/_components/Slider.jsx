import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
  

const Slider = async() => {
    const slidersList = await GlobalApi.getSlider()

  return (
    <div>
 <Carousel>
  <CarouselContent>
    {slidersList?.data.map((sliders,index)=>(

    <CarouselItem key={index}>
        <Image
         src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL
            +sliders?.attributes?.image?.data[0]?.attributes?.url}
         width={1000}
         height={400}
         alt='sliders'
         className=' w-full h-[200px] md:h-[400px]   object-cover rounded-2xl '
         unoptimized={true}/>
         </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

    </div>
  )
}

export default Slider
