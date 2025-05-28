"use client"

import { Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-10 sm:mb-16">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl p-1.5 sm:p-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md shadow-blue-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </div>
        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          SendMarket
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
          Fintechs
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
          Rates
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
          Support
        </a>
      </div>

      <button className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 transition-colors md:border md:border-gray-200 md:rounded-full md:hover:border-blue-200 md:hover:bg-blue-50">
        <Menu className="w-5 h-5" />
      </button>
    </header>
  )
}
