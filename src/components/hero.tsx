"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl  md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finance <br />
          with Intelligence
        </h1>
        <p>
          An AI-powered financial managment platform that helps you track
          ,analyze and optimize your spending with real-time insights
        </p>
        <div className="flex justify-center gap-10">
          <Link href={"/dashboard"}>
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button size="lg" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div>
          <div>
            <Image
              className="rounded-lg shadow-2xl border mx-auto"
              src="/banner.webp"
              alt="dashboard"
              width={1280}
             height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
