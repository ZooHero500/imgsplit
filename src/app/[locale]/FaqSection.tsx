"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

export function FaqItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-ink">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
      >
        <h3
          className={`text-sm font-medium transition-colors duration-500 ${
            isOpen ? "text-signal" : "text-foreground group-hover:text-signal"
          }`}
        >
          {question}
        </h3>
        <div
          className={`shrink-0 w-6 h-6 border flex items-center justify-center transition-all duration-500 ${
            isOpen
              ? "border-signal rotate-45"
              : "border-ink rotate-0 group-hover:border-signal"
          }`}
        >
          <Plus className="h-3 w-3 text-foreground" strokeWidth={1.5} />
        </div>
      </button>
      <div className="accordion-body" data-open={isOpen}>
        <div>
          <div className={`pb-6 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <p className="text-sm text-ink-soft leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
