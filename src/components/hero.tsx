"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {

  const imageRef=useRef<HTMLInputElement>(null)

  useEffect(()=>{
    const imageElement= imageRef.current;
    const handleScroll=()=>{
      const scrolledPosition=window.scrollY;
      const scrolledThreshold=100;
      
      if(scrolledPosition > scrolledThreshold){
        imageElement?.classList.add("scrolled")
      }else{
        imageElement?.classList.remove("scrolled")
      }
    }
    window.addEventListener('scroll',handleScroll)
    
    return ()=>window.removeEventListener("scroll",handleScroll)
  })

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl  md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finance <br />
          with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial managment platform that helps you track
          ,analyze and optimize your spending with real-time insights
        </p>
        <div className="flex justify-center space-x-4">
          <Link href={"/dashboard"}>
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button size="lg" className="px-8 bg-transparent text-black">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <div className="hero-image" ref={imageRef}>
            <Image 
              className="rounded-lg shadow-2xl border mx-auto"
              src="/banner.jpg"
              alt="dashboard"
              width={800}
             height={10}
             priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
