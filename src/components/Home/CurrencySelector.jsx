"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CurrencyFlag from "../currency-flags"


export default function CurrencySelector({ activeTab, setActiveTab, destinationCurrencies }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100 mb-6 sm:mb-10">
      <div className="mb-2 sm:mb-3">
        <p className="font-medium text-gray-700 text-sm sm:text-base">Send To</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-gray-100 p-1 rounded-xl">
          {destinationCurrencies.map((currency) => (
            <TabsTrigger
              key={currency.code}
              value={currency.code}
              className="rounded-lg text-xs sm:text-sm text-gray-600 transition-all hover:bg-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <div className="flex items-center gap-1 sm:gap-1.5">
                <CurrencyFlag currency={currency.code} small />
                <span>{currency.code}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
