import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>大白博客 | 技术分享与生活记录</title>
        <meta name="description" content="记录学习笔记、技术分享和生活随笔" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 英雄区域 */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg">
              🚀 欢迎访问
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in-up delay-100">
            <span className="text-gradient">大白</span> 的博客
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            记录学习笔记 · 分享技术心得 · 珍藏生活瞬间
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
            <a href="#posts" className="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              浏览文章
            </a>
            <Link href="/about" className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all">
              关于我
            </Link>
          </div>
        </div>
      </section>

      {/* 统计区域 */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl font-bold text-gradient">{allPostsData.length}</div>
              <div className="text-gray-500 dark:text-gray-400 mt-2">文章</div>
            </div>
            <div className="animate-fade-in-up delay-100">
              <div className="text-4xl font-bold text-gradient">
                {[...new Set(allPostsData.flatMap(p => p.tags || []))].length}
              </div>
              <div className="text-gray-500 dark:text-gray-400 mt-2">标签</div>
            </div>
            <div className="animate-fade-in-up delay-200">
              <div className="text-4xl font-bold text-gradient">1</div>
              <div className="text-gray-500 dark:text-gray-400 mt-2">年份</div>
            </div>
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <section id="posts" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              最新文章
            </h2>
          </div>
          
          <div className="grid gap-6">
            {allPostsData.map((post, index) => (
              <article 
                key={post.id} 
                className={`post-card card-hover glass dark:glass-dark rounded-2xl p-6 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link href={`/posts/${post.id}`} className="block">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {post.description || '点击查看全文...'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags?.map(tag => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm whitespace-nowrap">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
          {allPostsData.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500">暂无文章，敬请期待！</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
