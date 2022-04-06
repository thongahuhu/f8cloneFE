import React from 'react'
import { Link } from 'react-router-dom'
import MainButton from '../utils/button/MainButton'
import styles from './CourseEnroll.module.scss'

const CourseEnroll = ({ image, showHandler, slug }) => {
  return (
    <div className={styles.purchaseBadge}>
      <div className={styles.imgPreview} onClick={showHandler}>
        <div
          className={styles.backgroundImg}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <i className={`${styles.icon} fa-regular fa-circle-play`}></i>
        <p>Xem giới thiệu khóa học</p>
      </div>
      <h5>Miễn phí</h5>
      <MainButton className={styles.button} primary={true}>
        <Link to={`/learning/${slug}`}>Đăng ký học</Link>
      </MainButton>
      <ul>
        <li>
          <i className={`${styles.icon} fa-regular fa-compass`}></i>
          <span>Trình độ cơ bản</span>
        </li>
        <li>
          <i className={`${styles.icon} fa-regular fa-film`} />
          <span>
            Tổng số <strong>10</strong> bài học
          </span>
        </li>
        <li>
          <i className={`${styles.icon} fa-regular fa-clock`}></i>
          <span>
            Thời lượng <strong>03 giờ 25 phút</strong>
          </span>
        </li>
        <li>
          <i className={`${styles.icon} fa-regular fa-battery-full`}></i>
          <span>Học mọi lúc, mọi nơi</span>
        </li>
      </ul>
    </div>
  )
}

export default CourseEnroll
