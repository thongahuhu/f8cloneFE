import React, { useState, useEffect, Suspense } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from './BlogTag.module.scss'
import '../../sass/_withSidebarContent.scss'
import NewBlogs from '../../components/blog/NewBlogs'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import { apiURL } from '../../context/constants'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const BlogTag = () => {
  const location = useLocation()

  const [blogs, setBlogs] = useState(null)

  useEffect(
    () =>
      (document.title =
        'Danh sách bài viết về lĩnh vực IT / CNTT / Phần mềm / lập trình tại F8'),
    []
  )

  useEffect(() => {
    ;(async () => {
      const url = `${apiURL}${location.pathname}`
      const data = await getBlogTag(url)

      setBlogs(data)
    })()
  }, [location.pathname])

  const getBlogTag = async (url) => {
    try {
      return (await fetch(url)).json()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Header />
      <Row>
        <SideBar />
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={11}
          xl={11}
          style={{ marginBottom: 80 }}
        >
          <div className="withSidebarContent">
            <Row className={styles.wrapper}>
              <div className={styles.containerTop}>
                <h2>{`Tag: ${location.pathname.split('/blog/tag/')[1]}`}</h2>
                <p>
                  {`Tổng hợp các bài viết được gắn thẻ “${
                    location.pathname.split('/blog/tag/')[1]
                  }” trong nội dung.`}
                </p>
              </div>
              <Col xs={12} lg={8} xl={8} className={styles.leftLayout}>
                {blogs && blogs.length !== 0 && <NewBlogs blogs={blogs} />}
                {(!blogs || blogs.length === 0) && (
                  <p>
                    Không có bài viết nào{' '}
                    <Link to="/new-post">thêm bài viết.</Link>
                  </p>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default BlogTag
