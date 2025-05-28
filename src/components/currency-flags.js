"use client"

import Flag from "react-world-flags"

export default function CurrencyFlag({ currency, small }) {
  const countryMap = {
    USD: "US",
    EUR: "EU",
    GBP: "GB",
    CAD: "CA",
    NGN: "NG",
    GHS: "GH",
    XOF: "CI",
    KES: "KE",
  }

  const code = countryMap[currency] || "UN"

  return (
    <Flag
      code={code}
      style={{
        width: small ? "20px" : "30px",
        height: small ? "14px" : "20px",
        borderRadius: "2px",
        objectFit: "cover",
        boxShadow: "0 0 1px rgba(0,0,0,0.08)",
      }}
    />
  )
}
