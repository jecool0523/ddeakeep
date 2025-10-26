"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const languages = [
  { code: "ko", name: "한국어" },
  { code: "en", name: "English" },
]

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState("ko")

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code)
    // In a real app, this would trigger language change throughout the app
  }

  const getCurrentLanguageName = () => {
    return languages.find((lang) => lang.code === currentLanguage)?.name || "English"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-purple-700">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{getCurrentLanguageName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={currentLanguage === language.code ? "bg-purple-50 font-medium text-purple-700" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
