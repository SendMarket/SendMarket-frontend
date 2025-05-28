
// Helper function to parse fee string to number
export const parseFee = (feeStr) => {
    if (feeStr === "No fee") return 0
    return Number.parseFloat(feeStr.replace(/[^0-9.]/g, ""))
  }
  
  // Helper function to parse rate string to number
  export const parseRate = (rateStr) => {
    return Number.parseFloat(rateStr.replace(/,/g, ""))
  }
  
  // Helper function to format currency
  export const formatCurrency = (amount, currencyCode) => {
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
  