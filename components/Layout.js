/**
 * Layout 组件
 * 提供页面布局结构
 */
import { useState, useEffect } from 'react'
import Link from 'next/link'

/**
 * 博客布局组件
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子组件
 */
export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      setDarkMode(saved === 'true')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header darkMode={darkMode} onToggle={toggleDarkMode} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

/**
 * 页头组件
 */
function Header({ darkMode, onToggle }) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-blue-500 transition-colors">
          我的博客
        </Link>
        <button
          onClick={onToggle}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label={darkMode ? '切换到亮色模式' : '切换到暗色模式'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

/**
 * 页脚组件
 */
function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
        © {currentYear} 我的博客. All rights reserved.
      </div>
    </footer>
  )
}
