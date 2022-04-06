import React, { useRef, useState, useEffect, Suspense } from 'react'
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

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer'),
)

const NewPost = () => {
  const mdEditor = useRef(null)
  const titleRef = useRef(null)

  const location = useLocation()

  const [isValid, setIsValid] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // maxLengthContentEditable library require maxLength is string
  const LIMIT_TITLE_LENGTH = '190'

  useEffect(() => {
    document.title = title ? title : 'Viết blog | F8'

    // User has to enter title and content then the 'POST' button is active
    title && content ? setIsValid(true) : setIsValid(false)
  }, [title, content])

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

      titleRef.current.innerText = data.title

      setTitle(data.title)
      setContent(data.content)
    }
  }

  const editorChangeHandler = ({ html, text }) => {
    const newContent = text.replace(/\d/g, '')
    setContent(newContent)
  }

  const draftBlogHandler = async () => {
    try {
      const res = await fetch(`${apiURL}/blog/draft`)

      const data = await res.json()

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!showModal && (
        <>
          <Header
            currentPage={'new-blog'}
            blogDataHandler={blogDataHandler}
            setShowModal={setShowModal}
            isValid={isValid}
          />
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
      {showModal && (
        <Modal blogContent={{ title, content }} setShowModal={setShowModal} />
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default NewPost
