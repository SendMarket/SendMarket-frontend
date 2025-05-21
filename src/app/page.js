"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ExternalLink, Check, Menu, TrendingUp, Clock, DollarSign, Award } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Currency data
const sourceCurrencies = [
  { code: "USD", name: "US Dollar", flag: "us-flag" },
  { code: "EUR", name: "Euro", flag: "eu-flag" },
  { code: "GBP", name: "British Pound", flag: "gb-flag" },
  { code: "CAD", name: "Canadian Dollar", flag: "ca-flag" },
]

const destinationCurrencies = [
  { code: "NGN", name: "Nigerian Naira", flag: "ng-flag" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "gh-flag" },
  { code: "XOF", name: "West African CFA", flag: "cfa-flag" },
  { code: "KES", name: "Kenyan Shilling", flag: "ke-flag" },
]

// Provider data for different currency pairs
const providerData = {
  USD: {
    NGN: [
      { name: "PayPal", rate: "466.24", fee: "$2.99", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "466.10", fee: "$2.50", time: "Instant", color: "cyan" },
      { name: "Chipper", rate: "471.37", fee: "No fee", time: "Instant", color: "blue", best: true },
    ],
    GHS: [
      { name: "PayPal", rate: "13.25", fee: "$3.99", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "13.42", fee: "$2.75", time: "Instant", color: "cyan", best: true },
      { name: "WorldRemit", rate: "13.10", fee: "$1.99", time: "Same day", color: "indigo" },
    ],
    XOF: [
      { name: "Western Union", rate: "602.45", fee: "$3.50", time: "Same day", color: "yellow" },
      { name: "MoneyGram", rate: "604.20", fee: "$2.99", time: "1-2 hours", color: "red" },
      { name: "Wave", rate: "605.75", fee: "$1.50", time: "Instant", color: "blue", best: true },
    ],
    KES: [
      { name: "PayPal", rate: "129.85", fee: "$3.99", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "130.42", fee: "$2.50", time: "Instant", color: "cyan", best: true },
      { name: "Sendwave", rate: "128.95", fee: "$1.99", time: "Instant", color: "purple" },
    ],
  },
  EUR: {
    NGN: [
      { name: "PayPal", rate: "505.32", fee: "€2.99", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "507.45", fee: "€2.40", time: "Instant", color: "cyan", best: true },
      { name: "Chipper", rate: "503.18", fee: "€1.00", time: "Instant", color: "blue" },
    ],
    GHS: [
      { name: "PayPal", rate: "14.35", fee: "€3.50", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "14.52", fee: "€2.60", time: "Instant", color: "cyan", best: true },
      { name: "WorldRemit", rate: "14.20", fee: "€1.99", time: "Same day", color: "indigo" },
    ],
    XOF: [
      { name: "Western Union", rate: "655.95", fee: "€3.00", time: "Same day", color: "yellow" },
      { name: "MoneyGram", rate: "655.96", fee: "€2.80", time: "1-2 hours", color: "red" },
      { name: "Wave", rate: "655.97", fee: "€1.20", time: "Instant", color: "blue", best: true },
    ],
    KES: [
      { name: "PayPal", rate: "140.75", fee: "€3.50", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "141.30", fee: "€2.40", time: "Instant", color: "cyan", best: true },
      { name: "Sendwave", rate: "139.85", fee: "€1.80", time: "Instant", color: "purple" },
    ],
  },
  GBP: {
    NGN: [
      { name: "PayPal", rate: "592.45", fee: "£2.50", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "594.30", fee: "£2.00", time: "Instant", color: "cyan" },
      { name: "Chipper", rate: "595.12", fee: "£0.80", time: "Instant", color: "blue", best: true },
    ],
    GHS: [
      { name: "PayPal", rate: "16.85", fee: "£3.00", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "17.02", fee: "£2.20", time: "Instant", color: "cyan", best: true },
      { name: "WorldRemit", rate: "16.70", fee: "£1.50", time: "Same day", color: "indigo" },
    ],
    XOF: [
      { name: "Western Union", rate: "768.35", fee: "£2.80", time: "Same day", color: "yellow" },
      { name: "MoneyGram", rate: "769.20", fee: "£2.50", time: "1-2 hours", color: "red" },
      { name: "Wave", rate: "770.15", fee: "£1.00", time: "Instant", color: "blue", best: true },
    ],
    KES: [
      { name: "PayPal", rate: "165.25", fee: "£3.00", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "166.40", fee: "£2.20", time: "Instant", color: "cyan", best: true },
      { name: "Sendwave", rate: "164.75", fee: "£1.60", time: "Instant", color: "purple" },
    ],
  },
  CAD: {
    NGN: [
      { name: "PayPal", rate: "342.15", fee: "C$3.50", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "343.25", fee: "C$2.80", time: "Instant", color: "cyan", best: true },
      { name: "Chipper", rate: "341.50", fee: "C$1.20", time: "Instant", color: "blue" },
    ],
    GHS: [
      { name: "PayPal", rate: "9.75", fee: "C$3.80", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "9.92", fee: "C$2.90", time: "Instant", color: "cyan", best: true },
      { name: "WorldRemit", rate: "9.65", fee: "C$2.10", time: "Same day", color: "indigo" },
    ],
    XOF: [
      { name: "Western Union", rate: "445.30", fee: "C$3.20", time: "Same day", color: "yellow" },
      { name: "MoneyGram", rate: "446.15", fee: "C$2.90", time: "1-2 hours", color: "red" },
      { name: "Wave", rate: "447.25", fee: "C$1.40", time: "Instant", color: "blue", best: true },
    ],
    KES: [
      { name: "PayPal", rate: "95.65", fee: "C$3.70", time: "1-3 hours", color: "blue" },
      { name: "Wise", rate: "96.30", fee: "C$2.80", time: "Instant", color: "cyan", best: true },
      { name: "Sendwave", rate: "95.10", fee: "C$2.00", time: "Instant", color: "purple" },
    ],
  },
}

// Helper function to parse fee string to number
const parseFee = (feeStr) => {
  if (feeStr === "No fee") return 0
  return Number.parseFloat(feeStr.replace(/[^0-9.]/g, ""))
}

// Helper function to parse rate string to number
const parseRate = (rateStr) => {
  return Number.parseFloat(rateStr.replace(/,/g, ""))
}

// Helper function to format currency
const formatCurrency = (amount, currencyCode) => {
  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
    NGN: "₦",
    GHS: "₵",
    XOF: "CFA",
    KES: "KSh",
  }

  return `${symbols[currencyCode] || ""}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("NGN")
  const [sourceCurrency, setSourceCurrency] = useState(sourceCurrencies[0])
  const [amount, setAmount] = useState(1000)
  const [calculatedAmounts, setCalculatedAmounts] = useState({})

  // Calculate expected amounts when amount, currency, or rates change
  useEffect(() => {
    const newCalculatedAmounts = {}

    providerData[sourceCurrency.code][activeTab].forEach((provider) => {
      const rate = parseRate(provider.rate)
      const fee = parseFee(provider.fee)
      const amountAfterFee = amount - fee
      const convertedAmount = amountAfterFee * rate

      newCalculatedAmounts[provider.name] = convertedAmount > 0 ? convertedAmount : 0
    })

    setCalculatedAmounts(newCalculatedAmounts)
  }, [amount, sourceCurrency.code, activeTab])

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, "")
    if (!isNaN(value) && value !== "") {
      setAmount(Number.parseFloat(value))
    } else if (value === "") {
      setAmount(0)
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

        {/* Main Content */}
        <main className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-gray-800">
              Find the Best Way
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                to Send Money
              </span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 mb-8 sm:mb-10 max-w-md mx-auto">
              Compare exchange rates and fees from trusted providers to get the best deal on your international
              transfers.
            </p>
          </div>

          {/* Destination Currency Selection */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-4 sm:p-6 border border-gray-100 mb-6 sm:mb-10">
            <p className="mb-2 sm:mb-3 font-medium text-gray-700 text-sm sm:text-base">Send To</p>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mx-auto grid grid-cols-4 bg-gradient-to-r from-gray-100 to-gray-50 p-1 rounded-xl">
                {destinationCurrencies.map((currency) => (
                  <TabsTrigger
                    key={currency.code}
                    value={currency.code}
                    className="rounded-lg text-xs sm:text-sm text-gray-600 transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-gray-200/70 data-[state=active]:hover:from-blue-600 data-[state=active]:hover:to-blue-500"
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
                </div>

                <span className="text-gray-600">to</span>

                <div className="flex items-center gap-1 sm:gap-1.5 bg-gray-100 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
                  <CurrencyFlag currency={activeTab} small />
                  <span className="font-medium text-gray-800">{activeTab}</span>
                </div>

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
                    {sourceCurrency.code}
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
                      You&apos;ll Receive
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
                    {getSortedProviders(providerData[sourceCurrency.code][activeTab]).map((provider, index) => (
                      <tr
                        key={index}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          provider.best ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <td className="py-3 sm:py-5 px-2 sm:px-3">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <span className="text-gray-500 font-medium text-xs sm:text-sm mt-1">{index + 1}.</span>
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
                                <div className="flex items-center gap-0.5 mt-1 ml-7">
                                  <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-sm flex items-center">
                                    <Award className="w-2.5 h-2.5 mr-0.5" />
                                    Best Deal
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 sm:py-5 px-2 sm:px-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800 text-xs sm:text-sm">{provider.rate}</span>
                            <span className="text-[10px] sm:text-xs text-gray-500">per {sourceCurrency.code}</span>
                          </div>
                        </td>
                        <td className="py-3 sm:py-5 px-2 sm:px-3">
                          <div className="font-medium text-emerald-600 text-xs sm:text-sm">
                            {formatCurrency(calculatedAmounts[provider.name] || 0, activeTab)}
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Best Deal Highlight */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl shadow-md p-4 sm:p-6 border border-blue-100 mb-8 sm:mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-teal-200/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                {(() => {
                  const bestProvider =
                    providerData[sourceCurrency.code][activeTab].find((p) => p.best) ||
                    providerData[sourceCurrency.code][activeTab][0]
                  return (
                    <>
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-base sm:text-lg font-bold shadow-lg shadow-blue-100">
                        {bestProvider.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800">{bestProvider.name}</h3>
                          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-sm px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium flex items-center">
                            <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5" />
                            Best Deal
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                          {bestProvider.fee === "No fee" ? "No fees" : "Low fees"} • {bestProvider.time.toLowerCase()}{" "}
                          transfers
                        </p>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                          <p className="text-xs sm:text-sm text-gray-600">
                            Send <span className="font-medium">{formatCurrency(amount, sourceCurrency.code)}</span>
                          </p>
                          <span className="text-gray-400">→</span>
                          <p className="text-xs sm:text-sm font-medium text-emerald-600">
                            Receive {formatCurrency(calculatedAmounts[bestProvider.name] || 0, activeTab)}
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
function CurrencyFlag({ currency, small }) {
  const size = small ? "w-4 h-3 sm:w-5 sm:h-4" : "w-6 h-5 sm:w-8 sm:h-6"

  switch (currency) {
    case "USD":
      return (
        <div className={`${size} rounded-md overflow-hidden shadow-sm`}>
          <div className="h-full bg-gradient-to-b from-blue-700 via-white to-red-600 flex flex-col">
            <div className="h-1/3 bg-blue-700"></div>
            <div className="h-1/3 bg-white"></div>
            <div className="h-1/3 bg-red-600"></div>
          </div>
        </div>
      )
    case "EUR":
      return (
        <div className={`${size} rounded-md overflow-hidden shadow-sm`}>
          <div className="h-full bg-blue-600 flex items-center justify-center">
            <div className="flex flex-wrap w-3/4 h-3/4 justify-center">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1/4 h-1/3 flex items-center justify-center">
                  <div className="w-2/3 h-2/3 bg-yellow-400 transform rotate-45"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    case "GBP":
      return (
        <div className={`${size} rounded-md overflow-hidden shadow-sm`}>
          <div className="h-full bg-blue-600 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1/5 bg-white"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/5 h-full bg-white"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-2/5 bg-red-600 transform rotate-45 scale-50"></div>
            </div>
          </div>
        </div>
      )
    case "CAD":
      return (
        <div className={`${size} rounded-md overflow-hidden shadow-sm`}>
          <div className="h-full flex">
            <div className="w-1/4 bg-red-600"></div>
            <div className="w-2/4 bg-white flex items-center justify-center">
              <div className="w-3/4 h-3/4 text-red-600">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L9.5 9 2 9.5 7 14 5.5 22 12 18 18.5 22 17 14 22 9.5 14.5 9z" />
                </svg>
              </div>
            </div>
            <div className="w-1/4 bg-red-600"></div>
          </div>
        </div>
      )
    case "NGN":
      return (
        <div className={`${size} rounded-md overflow-hidden shadow-sm`}>
          <div className="h-full flex">
            <div className="w-1/3 bg-green-600"></div>
            <div className="w-1/3 bg-white"></div>
            <div className="w-1/3 bg-green-600"></div>
          </div>
        </div>
      )
    case "GHS":
      return (
        <div className={`${size} rounded-md overflow-hidden shadow-sm`}>
          <div className="h-full flex flex-col">
            <div className="h-1/3 bg-red-600"></div>
            <div className="h-1/3 bg-yellow-400"></div>
            <div className="h-1/3 bg-green-600"></div>
          </div>
        </div>
      )
    case "XOF":
      return (
        <div className={`${size} rounded-md overflow-hidden shadow-sm bg-green-600`}>
          <div className="h-full flex justify-center items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
      )
    case "KES":
      return (
        <div className={`${size} rounded-md overflow-hidden shadow-sm bg-black`}>
          <div className="h-full flex flex-col">
            <div className="h-1/3 bg-black"></div>
            <div className="h-1/3 bg-red-600"></div>
            <div className="h-1/3 bg-green-600"></div>
          </div>
        </div>
      )
    default:
      return <div className={`${size} rounded-md bg-gray-200`}></div>
  }
}

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
