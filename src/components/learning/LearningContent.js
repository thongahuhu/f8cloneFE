import React from 'react'
import styles from './LearningContent.module.scss'
import LearningVideo from './LearningVideo'

const LearningContent = ({ show }) => {
  return (
    <div
      className={
        show ? styles.wrapper : `${styles.wrapper} ${styles.fullWidth}`
      }
    >
      <LearningVideo />
      <div className={styles.content}>
        <div className={styles.contentTop}>
          <div className={styles.heading}>
            <h1>
              Học IT cần tố chất gì? Góc nhìn khác từ chuyên gia định hướng giáo
              dục
            </h1>
            <p>Cập nhật tháng 2 năm 2022</p>
          </div>
          <button className={styles.addNoteButton}>
            <i className="bi bi-plus-lg"></i>
            <span className={styles.label}>
              Thêm ghi chú tại <span className={styles.duration}>00:00</span>
            </span>
          </button>
        </div>
        <div className={styles.aboutMessage}>
          <p>
            Tham gia nhóm{' '}
            <a
              rel="noreferrer noopener noreferrer"
              target="_blank"
              href={'https://www.facebook.com/groups/f8official/'}
            >
              Học lập trình tại F8
            </a>{' '}
            trên Facebook để cùng nhau trao đổi trong quá trình học tập ❤️
          </p>
          <p>
            Các bạn subscribe kênh Youtube{' '}
            <a
              rel="noreferrer noopener noreferrer"
              target="_blank"
              href={'https://url.mycv.vn/f8_youtube?ref=lesson_desc'}
            >
              F8 Official
            </a>{' '}
            để nhận thông báo khi có các bài học mới nhé ❤️
          </p>
        </div>
      </div>
      <div className={styles.poweredBy}>
        Made with <i className="bi bi-heart-fill"></i>{' '}
        <span className={styles.dot}>.</span> Powered by F8
      </div>
    </div>
  )
}

export default LearningContent