"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: "class" | "data-theme"
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

const STORAGE_KEY = "theme"

function applyTheme(theme: Theme, attribute: "class" | "data-theme", enableSystem: boolean) {
  const root = document.documentElement
  const resolvedTheme =
    theme === "system" && enableSystem
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme

  if (attribute === "class") {
    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
  } else {
    root.setAttribute("data-theme", resolvedTheme)
  }
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  React.useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    const theme = savedTheme ?? defaultTheme
    applyTheme(theme, attribute, enableSystem)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const syncTheme = () => {
      const activeTheme = (window.localStorage.getItem(STORAGE_KEY) ?? defaultTheme) as Theme
      applyTheme(activeTheme, attribute, enableSystem)
    }

    mediaQuery.addEventListener("change", syncTheme)
    return () => mediaQuery.removeEventListener("change", syncTheme)
  }, [attribute, defaultTheme, enableSystem])

  return <>{children}</>
}