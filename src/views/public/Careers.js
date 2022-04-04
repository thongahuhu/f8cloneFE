import React, { Suspense, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styles from './Careers.module.scss'
import '../../sass/_mainHeadingTitle.scss'
import '../../sass/_withSidebarContent.scss'
import CareerList from '../../components/career/CareerList'
import Header from '../../components/main-layout/nav/Header'
import SideBar from '../../components/main-layout/sidebar/SideBar'
import { apiURL } from '../../context/constants'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const Careers = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch(`${apiURL}/help/get-job`, {
          signal: controller.signal,
        })

        const data = await res.json()

        setJobs(data)
      } catch (error) {
        console.log(error)
      }
    })()

    return () => controller?.abort()
  }, [])

  return (
    <>
      <Header />
      <Row>
        <Col xs={0} sm={0} md={1} lg={1} xl={1}>
          <SideBar />
        </Col>
        <Col xs={12} sm={12} md={12} lg={11} xl={11}>
          <div className="withSidebarContent">
            <div className={styles.container}>
              <div className={styles.containerTop}>
                <h1 className="mainHeadingTitle">Cơ hội việc làm</h1>
                <p>
                  F8 tin rằng mỗi người đều có những tiềm năng vô hạn để trở nên
                  giỏi giang. Vấn đề là họ không áp dụng đúng phương pháp để
                  việc học hiệu quả hơn. Vì vậy F8 mong muốn giúp cho những
                  người gặp khó khăn trong việc học hành nói chung và học lập
                  trình nói riêng được tiếp cận các phương pháp, kinh nghiệm học
                  lập trình thông minh để trở nên giỏi thực sự.
                </p>
              </div>
              <div className={styles.containerBody}>
                <h2>2 việc làm đang mở tại F8</h2>
                <CareerList xl={8} jobs={jobs} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Careers