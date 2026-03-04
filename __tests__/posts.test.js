import { getSortedPostsData, getAllPostIds, getPostData } from '../lib/posts'
import path from 'path'
import fs from 'fs'

// Mock fs and path modules
jest.mock('fs')
jest.mock('path')

describe('posts lib', () => {
  const mockPostsDir = '/mock/posts'
  
  beforeEach(() => {
    jest.clearAllMocks()
    path.join = jest.fn((...args) => args.join('/'))
    process.cwd = jest.fn(() => '/mock')
  })

  describe('getSortedPostsData', () => {
    it('should return empty array when posts directory does not exist', () => {
      fs.existsSync.mockReturnValue(false)
      const result = getSortedPostsData()
      expect(result).toEqual([])
    })

    it('should return empty array when no markdown files exist', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readdirSync.mockReturnValue([])
      const result = getSortedPostsData()
      expect(result).toEqual([])
    })

    it('should return sorted posts by date', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readdirSync.mockReturnValue(['post1.md', 'post2.md'])
      fs.readFileSync.mockImplementation((path) => {
        if (path.includes('post1.md')) {
          return '---\ntitle: Post 1\ndate: "2025-01-01"\n---\nContent 1'
        }
        return '---\ntitle: Post 2\ndate: "2025-01-02"\n---\nContent 2'
      })
      
      const result = getSortedPostsData()
      expect(result).toHaveLength(2)
      expect(result[0].date).toBe('2025-01-02') // newer first
    })
  })

  describe('getAllPostIds', () => {
    it('should return empty array when no posts', () => {
      fs.existsSync.mockReturnValue(false)
      const result = getAllPostIds()
      expect(result).toEqual([])
    })

    it('should return array of post ids', () => {
      fs.existsSync.mockReturnValue(true)
      fs.readdirSync.mockReturnValue(['post1.md', 'post2.md'])
      
      const result = getAllPostIds()
      expect(result).toHaveLength(2)
      expect(result[0].params.id).toBe('post1')
    })
  })

  describe('getPostData', () => {
    it('should return error data when file does not exist', () => {
      fs.existsSync.mockReturnValue(false)
      
      const result = getPostData('nonexistent')
      expect(result.title).toBe('Post Not Found')
    })

    it('should return post data with parsed markdown', async () => {
      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue('---\ntitle: Test\ndate: "2025-01-01"\ntags: ["test"]\n---\n# Content')
      
      const remarkMock = jest.fn().mockImplementation(() => ({
        use: jest.fn().mockReturnThis(),
        process: jest.fn().mockResolvedValue({ toString: () => '<h1>Content</h1>' })
      }))
      
      jest.doMock('remark', () => remarkMock)
      
      const result = await getPostData('test')
      expect(result.title).toBe('Test')
    })
  })
})
