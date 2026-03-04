import Head from 'next/head'
import Link from 'next/link'
import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
          ← 返回首页
        </Link>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
          <div className="flex gap-2 mb-4">
            {postData.tags?.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
          <time className="text-gray-500 dark:text-gray-400">{postData.date}</time>
        </header>
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </>
  )
}
