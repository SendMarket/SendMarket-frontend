"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  ExternalLink,
  Check,
  Menu,
  TrendingUp,
  Clock,
  DollarSign,
  Award,
  ArrowLeftRight,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import HeroSection from "@/components/Home/HeroSection"
import Header from "@/components/header.js"
import CurrencySelector from "@/components/home/CurrencySelector"
import CurrencyFlag from "@/components/currency-flags"
import providerData from "@/data/provider-data"
import { sourceCurrencies, destinationCurrencies } from "@/data/currencies"
import { parseFee, parseRate, formatCurrency } from "@/utils/currency"


export default function Home() {
  const [activeTab, setActiveTab] = useState("NGN")
  const [isReversed, setIsReversed] = useState(false)
  const [sourceCurrency, setSourceCurrency] = useState(sourceCurrencies[0])
  const [amount, setAmount] = useState(1)
  const [calculatedAmounts, setCalculatedAmounts] = useState({})

  // Reset direction when tab changes
  useEffect(() => {
    setIsReversed(false)
    setSourceCurrency(sourceCurrencies[0])
  }, [activeTab])

  // Calculate expected amounts when amount, currency, or rates change
  useEffect(() => {
    const newCalculatedAmounts = {}

    const fromCurrency = isReversed ? activeTab : sourceCurrency.code
    const toCurrency = isReversed ? sourceCurrency.code : activeTab

    if (providerData[fromCurrency] && providerData[fromCurrency][toCurrency]) {
      providerData[fromCurrency][toCurrency].forEach((provider) => {
        const rate = parseRate(provider.rate)
        const fee = parseFee(provider.fee)
        const amountAfterFee = amount - fee
        const convertedAmount = amountAfterFee * rate

        newCalculatedAmounts[provider.name] = convertedAmount > 0 ? convertedAmount : 0
      })
    }

    setCalculatedAmounts(newCalculatedAmounts)
  }, [amount, sourceCurrency.code, activeTab, isReversed])

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, "")
    if (!isNaN(value) && value !== "") {
      setAmount(Number.parseFloat(value))
    } else if (value === "") {
      setAmount(0)
    }
  }

  const handleCurrencySwitch = () => {
    setIsReversed(!isReversed)
  }

  // Get available currencies for the dropdown based on active tab
  const getAvailableCurrencies = () => {
    if (isReversed) {
      // When reversed, only show source currencies
      return sourceCurrencies
    } else {
      // When not reversed, only show the active tab currency
      return [
        {
          code: activeTab,
          name: destinationCurrencies.find((c) => c.code === activeTab)?.name || activeTab,
          flag: `${activeTab.toLowerCase()}-flag`,
        },
      ]
    }
  }

  // Sort providers by rate (highest first)
  const getSortedProviders = (providers) => {
    return [...providers].sort((a, b) => {
      // Always put the "best deal" provider first
      if (a.best) return -1
      if (b.best) return 1
      // Then sort by rate
      return parseRate(b.rate) - parseRate(a.rate)
    })
  }

  // Get the from and to currencies based on the current state
  const fromCurrency = isReversed ? activeTab : sourceCurrency.code
  const toCurrency = isReversed ? sourceCurrency.code : activeTab

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-teal-50/40 z-0"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-blue-100/20 to-transparent rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-teal-100/20 to-transparent rounded-full blur-3xl z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-100/10 to-transparent rounded-full blur-3xl z-0"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-[0.015] z-0"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-24 h-24 border border-blue-200/20 rounded-full z-0"></div>
      <div className="absolute bottom-40 left-1/4 w-16 h-16 border border-teal-200/20 rounded-full z-0"></div>
      <div className="absolute top-1/3 left-10 w-12 h-12 border border-purple-200/20 rounded-full z-0"></div>

      {/* Subtle Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f620_1px,transparent_1px)] bg-[length:20px_20px] z-0 opacity-20"></div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <Header/>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto">
          
          <HeroSection/>
          {/* Destination Currency Selection */}
         <CurrencySelector
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  destinationCurrencies={destinationCurrencies}
/>

          {/* Exchange Rates Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100 mb-6 sm:mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-teal-400 rounded-full p-1 sm:p-1.5 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shadow-md shadow-blue-100">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Exchange Rates</h2>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-gray-600">From</span>
                  {isReversed ? (
                    <div className="flex items-center gap-1 sm:gap-1.5 bg-gray-100 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
                      <CurrencyFlag currency={activeTab} small />
                      <span className="font-medium text-gray-800">{activeTab}</span>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 hover:bg-gray-200 transition-colors">
                          <CurrencyFlag currency={sourceCurrency.code} small />
                          <span className="font-medium text-gray-800">{sourceCurrency.code}</span>
                          <ChevronDown className="text-gray-500 w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                        {sourceCurrencies.map((currency) => (
                          <DropdownMenuItem
                            key={currency.code}
                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => setSourceCurrency(currency)}
                          >
                            <CurrencyFlag currency={currency.code} small />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{currency.code}</p>
                              <p className="text-xs text-gray-500">{currency.name}</p>
                            </div>
                            {currency.code === sourceCurrency.code && <Check className="h-4 w-4 text-blue-600" />}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                <button
                  onClick={handleCurrencySwitch}
                  className="flex items-center justify-center p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 transition-colors group"
                  title="Switch currencies"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 group-hover:text-blue-600" />
                </button>

                {isReversed ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1 sm:gap-2 bg-gray-100 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 hover:bg-gray-200 transition-colors">
                        <CurrencyFlag currency={sourceCurrency.code} small />
                        <span className="font-medium text-gray-800">{sourceCurrency.code}</span>
                        <ChevronDown className="text-gray-500 w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg">
                      {sourceCurrencies.map((currency) => (
                        <DropdownMenuItem
                          key={currency.code}
                          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => setSourceCurrency(currency)}
                        >
                          <CurrencyFlag currency={currency.code} small />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{currency.code}</p>
                            <p className="text-xs text-gray-500">{currency.name}</p>
                          </div>
                          {currency.code === sourceCurrency.code && <Check className="h-4 w-4 text-blue-600" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-1 sm:gap-1.5 bg-gray-100 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
                    <CurrencyFlag currency={activeTab} small />
                    <span className="font-medium text-gray-800">{activeTab}</span>
                  </div>
                )}

                <div className="w-px h-5 sm:h-6 bg-gray-200 mx-1"></div>

                <div className="relative">
                  <span className="text-gray-600 mr-1 sm:mr-2">Amount:</span>
                  <input
                    type="text"
                    value={amount.toLocaleString()}
                    onChange={handleAmountChange}
                    className="w-20 sm:w-24 bg-white border border-gray-200 rounded-lg px-2 py-1 sm:py-1.5 text-gray-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
                  />
                  <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs sm:text-sm">
                    {fromCurrency}
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 sm:py-4 px-2 sm:px-3 text-left font-semibold text-gray-600 text-xs sm:text-sm">
                        Provider
                      </th>
                      <th className="py-3 sm:py-4 px-2 sm:px-3 text-left font-semibold text-gray-600 text-xs sm:text-sm">
                        Rate
                      </th>
                      <th className="py-3 sm:py-4 px-2 sm:px-3 text-left font-semibold text-gray-600 text-xs sm:text-sm">
                        You'll Receive
                      </th>
                      <th className="py-3 sm:py-4 px-2 sm:px-3 text-left font-semibold text-gray-600 text-xs sm:text-sm">
                        Fee
                      </th>
                      <th className="py-3 sm:py-4 px-2 sm:px-3 text-left font-semibold text-gray-600 text-xs sm:text-sm">
                        Time
                      </th>
                      <th className="py-3 sm:py-4 px-2 sm:px-3 text-right font-semibold text-gray-600 text-xs sm:text-sm"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {providerData[fromCurrency] && providerData[fromCurrency][toCurrency] ? (
                      getSortedProviders(providerData[fromCurrency][toCurrency]).map((provider, index) => (
                        <tr
                          key={index}
                          className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            provider.best ? "bg-blue-50/50" : ""
                          }`}
                        >
                          <td className="py-3 sm:py-5 px-2 sm:px-3">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-gray-500 font-medium text-xs sm:text-sm">{index + 1}.</span>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                  <div
                                    className={`w-6 h-6 sm:w-7 sm:h-7 ${
                                      provider.best
                                        ? "bg-gradient-to-br from-blue-500 to-teal-400"
                                        : "bg-gradient-to-br from-gray-500 to-gray-600"
                                    } rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm ${
                                      provider.best ? "shadow-blue-100" : "shadow-gray-200"
                                    }`}
                                  >
                                    {provider.name.charAt(0)}
                                  </div>
                                  <span className="font-medium text-gray-800 text-xs sm:text-sm">{provider.name}</span>
                                </div>
                                {provider.best && (
                                  <div className="flex items-center gap-0.5 ml-7 mt-0.5">
                                    <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-500" />
                                    <span className="text-[10px] sm:text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                      Best Deal
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 sm:py-5 px-2 sm:px-3">
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800 text-xs sm:text-sm">{provider.rate}</span>
                              <span className="text-[10px] sm:text-xs text-gray-500">per {fromCurrency}</span>
                            </div>
                          </td>
                          <td className="py-3 sm:py-5 px-2 sm:px-3">
                            <div className="font-medium text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                              {formatCurrency(calculatedAmounts[provider.name] || 0, toCurrency)}
                            </div>
                          </td>
                          <td className="py-3 sm:py-5 px-2 sm:px-3">
                            {provider.fee === "No fee" ? (
                              <span className="text-green-600 font-semibold text-xs sm:text-sm">{provider.fee}</span>
                            ) : (
                              <div className="flex items-center gap-0.5 sm:gap-1">
                                <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                                <span className="text-gray-800 text-xs sm:text-sm">{provider.fee}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3 sm:py-5 px-2 sm:px-3">
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                              <span className="text-gray-800 text-xs sm:text-sm">{provider.time}</span>
                            </div>
                          </td>
                          <td className="py-3 sm:py-5 px-2 sm:px-3 text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className={`text-xs px-2 py-1 h-auto sm:h-8 sm:px-3 sm:py-1 ${
                                provider.best
                                  ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 border-0 shadow-md shadow-blue-100"
                                  : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                              }`}
                            >
                              Sign Up
                              <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1 sm:ml-1.5" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-4 text-center text-gray-500">
                          No exchange rates available for the selected currencies.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Best Deal Highlight */}
          {providerData[fromCurrency] && providerData[fromCurrency][toCurrency] && (
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl shadow-md p-4 sm:p-6 border border-blue-100 mb-8 sm:mb-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  {(() => {
                    const bestProvider =
                      providerData[fromCurrency][toCurrency].find((p) => p.best) ||
                      providerData[fromCurrency][toCurrency][0]
                    return (
                      <>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-base sm:text-lg font-bold shadow-lg shadow-blue-100">
                          {bestProvider.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{bestProvider.name}</h3>
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium text-white">
                              Best Deal
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                            {bestProvider.fee === "No fee" ? "No fees" : "Low fees"} • {bestProvider.time.toLowerCase()}{" "}
                            transfers
                          </p>
                          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                            <p className="text-xs sm:text-sm text-gray-600">
                              Send <span className="font-medium">{formatCurrency(amount, fromCurrency)}</span>
                            </p>
                            <span className="text-gray-400">→</span>
                            <p className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                              Receive {formatCurrency(calculatedAmounts[bestProvider.name] || 0, toCurrency)}
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
                <Button className="text-xs sm:text-sm px-3 py-1.5 h-auto sm:h-9 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white border-0 shadow-md shadow-blue-100">
                  Get Started
                </Button>
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-md flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800">Best Rates</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                We compare rates across all major providers to find you the best deal
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-md flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800">Low Fees</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Find providers with the lowest fees to maximize your transfer value
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-md flex flex-col items-center text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-gray-800">Fast Transfers</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Send money quickly with providers offering instant or same-day transfers
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Helper component for currency flags


function getProviderColor(color) {
  switch (color) {
    case "blue":
      return "from-blue-500 to-blue-600"
    case "cyan":
      return "from-cyan-500 to-cyan-600"
    case "indigo":
      return "from-indigo-500 to-indigo-600"
    case "purple":
      return "from-purple-500 to-purple-600"
    case "red":
      return "from-red-500 to-red-600"
    case "yellow":
      return "from-yellow-500 to-yellow-600"
    default:
      return "from-blue-500 to-blue-600"
  }
}
