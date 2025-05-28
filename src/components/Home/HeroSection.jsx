"use client"

import { ArrowLeftRight } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative mb-16 sm:mb-20">
      {/* Large 3D Currency Symbol */}
      <div className="absolute -top-10 -left-20 sm:-left-32 lg:-left-40 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 opacity-20 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full transform rotate-12 scale-75">
            <div className="absolute inset-8 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 rounded-full transform -rotate-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white opacity-80">$</span>
              </div>
            </div>
          </div>
          {/* Floating Elements */}
          <div className="absolute top-4 right-8 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-60 animate-bounce"></div>
          <div className="absolute bottom-8 left-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-70 animate-pulse"></div>
        </div>
      </div>

      {/* Right Side Floating Elements */}
      <div className="absolute top-20 right-0 sm:right-10 lg:right-20 w-32 h-32 sm:w-40 sm:h-40 opacity-15 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl transform rotate-45">
            <div className="absolute inset-4 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl transform -rotate-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <ArrowLeftRight className="w-8 h-8 sm:w-10 sm:h-10 text-white transform -rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Currency Icons */}
      <div className="absolute top-32 left-1/4 w-16 h-16 opacity-20 animate-float">
        <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-white">€</span>
        </div>
      </div>

      <div className="absolute bottom-20 right-1/3 w-12 h-12 opacity-25 animate-float-delayed">
        <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
          <span className="text-lg font-bold text-white">£</span>
        </div>
      </div>

      {/* Hero Text Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight text-gray-800">
          Find the Best Way
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent animate-gradient">
            to Send Money
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Compare exchange rates and fees from trusted providers to get the best deal on your international
          transfers.
        </p>
      </div>
    </div>
  )
}
