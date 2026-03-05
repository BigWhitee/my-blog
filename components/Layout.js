/**
 * Layout 组件
 * 提供页面布局结构
 */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * 博客布局组件
 */
export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

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

  const navLinks = [
    { href: '/', label: '首页', icon: '🏠' },
    { href: '/posts', label: '文章', icon: '📝' },
    { href: '/about', label: '关于', icon: '👤' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                B
              </div>
              <span className="font-bold text-xl text-gray-800 dark:text-white hidden sm:block">
                大白博客
              </span>
            </Link>

            {/* 桌面导航 */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    router.pathname === link.href
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  <span className="mr-1">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              
              {/* 主题切换 */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                aria-label="切换主题"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg"
            >
              <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {menuOpen && (
          <div className="md:hidden glass dark:glass-dark border-t border-white/10">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-gray-600 dark:text-gray-300"
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleDarkMode}
                className="w-full py-2 text-left text-gray-600 dark:text-gray-300"
              >
                {darkMode ? '☀️ 切换亮色' : '🌙 切换暗色'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 主内容 */}
      <main className="pt-16">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* 关于 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">
                  B
                </div>
                <span className="font-bold text-xl">大白博客</span>
              </div>
              <p className="text-white/70 text-sm">
                记录学习笔记，分享技术心得，珍藏生活瞬间。
              </p>
            </div>

            {/* 链接 */}
            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="footer-link">首页</Link></li>
                <li><Link href="/posts" className="footer-link">文章</Link></li>
                <li><Link href="/about" className="footer-link">关于</Link></li>
              </ul>
            </div>

            {/* 社交 */}
            <div>
              <h4 className="font-semibold mb-4">关注我</h4>
              <div className="flex gap-4">
                <a href="https://github.com/BigWhitee" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .267.18.578.688.48C19.138 20.194 22 16.418 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50 text-sm">
            © {new Date().getFullYear()} 大白博客. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
