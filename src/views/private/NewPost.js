import React, { useRef, useState, useEffect, Suspense, useContext } from 'react'
import styles from './NewPost.module.scss'
import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import '../../sass/_myIcon.scss'
import Header from '../../components/main-layout/nav/Header'
import '../../sass/_markdownEditor.scss'
import ContentEditable from '../../components/utils/content-editable/ContentEditable'
import Modal from '../../components/new-post/Modal'
import { useLocation } from 'react-router-dom'
import { apiURL } from '../../context/constants'
import { BlogContext } from '../../context/BlogContext'
import Cookies from 'js-cookie'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer'),
)

const NewPost = () => {
  const mdEditor = useRef(null)
  const titleRef = useRef(null)

  const location = useLocation()

  const { showModal, setIsValid } = useContext(BlogContext)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [blogDraftId, setBlogDraftId] = useState('')
  const [numberTimeOfRecordings, setNumberTimeOfRecordings] = useState(1)

  // maxLengthContentEditable library require maxLength is string
  const LIMIT_TITLE_LENGTH = '190'

  useEffect(() => {
    document.title = title ? title : 'Viết blog | F8'

    // User has to enter title and content then the 'POST' button is active
    title && content ? setIsValid(true) : setIsValid(false)
  }, [title, content, setIsValid])

  // useEffect(() => {
  //   const getDraftData = async () => {
  //     console.log('getDraftData')
  //     try {
  //       const token = Cookies.get('token')
  //       if (!token) return

  //       const res = await fetch(`${apiURL}/blog/draft`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })

  //       const data = await res.json()
  //       console.log(data)
  //       titleRef.current.innerText = data[0].title
  //       setTitle(data[0].title)
  //       setContent(data[0].content)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   location.pathname.split('/new-post/').length === 2 && getDraftData()
  // }, [location.pathname])

  const blogDataHandler = () => {
    if (
      mdEditor.current &&
      title.length > 0 &&
      title.length <= LIMIT_TITLE_LENGTH
    ) {
      const data = {
        title: titleRef.current.innerText,
        content: mdEditor.current.getMdValue(),
      }
      console.log('blogDataHandler')

      titleRef.current.innerText = data.title

      setTitle(data.title)
      setContent(data.content)
    }
  }

  const readingTimeHandler = (content) => {
    const WORDS_PER_MINUTE = 200 // People read 200 words/min https://infusion.media/content-marketing/how-to-calculate-reading-time/
    const SMALLEST_READING_TIME = 1

    const wordCount = content.split(' ').length
    const minute = Math.floor(wordCount / WORDS_PER_MINUTE)

    console.log('readingTimeHandler')

    return minute <= SMALLEST_READING_TIME ? SMALLEST_READING_TIME : minute
  }

  // useEffect(() => {
  //   const addDraft = async () => {
  //     try {
  //       const token = Cookies.get('token')
  //       if (!token) return

  // if (
  //   (numberTimeOfRecordings === 1 && title.length !== 0) ||
  //   content.length !== 0
  // ) {
  //   console.log('create draft')

  //   const res = await fetch(`${apiURL}/blog/add-draft`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       title,
  //       content,
  //       readingTime: readingTimeHandler(content),
  //       numberTimeOfRecordings,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   const data = await res.json()
  //   console.log(data)
  //   setBlogDraftId(data._id)
  //   setNumberTimeOfRecordings((prev) => prev + 1)
  // } else if (
  //   (title && title.length !== 0) ||
  //   (content && content.length !== 0)
  // ) {
  //   console.log('update draft')
  //   await fetch(`${apiURL}/blog/add-draft`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       title,
  //       content,
  //       readingTime: readingTimeHandler(content),
  //       blogId: blogDraftId,
  //       numberTimeOfRecordings,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  // }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   addDraft()
  // }, [title, content, blogDraftId, numberTimeOfRecordings])

  let timer // Count time when user has stopped typing
  const finishedTypingTimeout = 4000 // Then 4 seconds if user doesn't type anymore title and content would save on db

  // const onTypingBlogHandler = (e) => {
  //   clearTimeout(timer)
  //   const title = e && setTitle(e.target.innerText)

  //   timer = setTimeout(async () => {
  //     console.log('SENT TO DB!')
  //     try {
  //       const token = Cookies.get('token')
  //       if (!token) return

  //       const res = await fetch(`${apiURL}/blog/add-draft`, {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           title,
  //           content,
  //           readingTime: readingTimeHandler(content),
  //           blogId: blogDraftId,
  //           numberTimeOfRecordings,
  //         }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })

  //       const data = await res.json()

  //       setBlogDraftId(data._id)
  //       setNumberTimeOfRecordings((prev) => prev + 1)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }, finishedTypingTimeout)
  // }

  // console.log(numberTimeOfRecordings)

  const editorChangeHandler = ({ text }) => {
    setContent(text)
    // onTypingBlogHandler()
  }
  return (
    <>
      {!showModal && (
        <>
          <Header blogDataHandler={blogDataHandler} />
          <div className={styles.wrapper}>
            <ContentEditable
              text={'Tiêu đề'}
              className={styles.contentEditable}
              onInput={(e) => setTitle(e.target.innerText)}
              maxLength={LIMIT_TITLE_LENGTH}
              ref={titleRef}
            />
            <Editor
              ref={mdEditor}
              value={content}
              onChange={editorChangeHandler}
              renderHTML={(text) => <ReactMarkdown children={text} />}
            />
          </div>
        </>
      )}
      {showModal && <Modal blogContent={{ title, content }} />}
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default NewPost
