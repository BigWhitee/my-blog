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
        <title>我的博客</title>
      </Head>
      <section>
        <h1 className="text-4xl font-bold mb-8">欢迎来到我的博客</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          这里记录我的学习笔记、技术分享和生活随笔。
        </p>
      </section>
      
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">最新文章</h2>
        <div className="space-y-6">
          {allPostsData.map(({ id, date, title, tags }) => (
            <article key={id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <Link href={`/posts/${id}`} className="block">
                <h3 className="text-xl font-semibold hover:text-blue-500">{title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <time className="text-gray-500 dark:text-gray-400">{date}</time>
                  <div className="flex gap-2">
                    {tags?.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
