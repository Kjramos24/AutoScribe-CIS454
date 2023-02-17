import React from 'react'
import {HiArrowNarrowRight} from 'react-icons/hi'

const Home = () => {
  return (
    <div name='home' className="w-full h-screen bg-[#F0F0F0]">
        {/*Container*/}
        <div name= "hero" className="w-full h-[600px] bg-[#E3343B] mx-auto flex flex-col justify-center text-center text-[#FFFFFF] content-center">
            <h2 className="text-2xl pb-10">Lightning Fast Research at your fingertips</h2>
            <h4 className="pb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. 
Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</h4>
            <button className="rounded-full bg-[#F0F0F0] px-3 py-1 text-[#000000] w-32">Start Now</button>
        </div>
         
        </div> 
  )
}

export default Home