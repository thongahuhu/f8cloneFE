import React, { memo, Suspense, useContext } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import Logo from './components/Logo'
import Search from './components/Search'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Header.module.scss'
import MobileNav from './components/MobileNav'
import '../../../sass/_custom.scss'
import { useSelector } from 'react-redux'
import PublishButton from '../../new-post/PublishButton'
import { Link } from 'react-router-dom'
import User from './components/User'
import MyCourse from './components/MyCourse'
import Notification from './components/Notification'
import { PostContext } from '../../../context/PostContext'

const Login = React.lazy(() => import('./components/Login'))

const Header = ({ className, isProfile, isSearchPage, submitEditPost }) => {
  const user = useSelector((state) => state.user)
  const { isEditPost, isNewPost } = useContext(PostContext)

  return (
    <Navbar className={`${styles.navHeader} ${className}`}>
      <Container fluid style={{ padding: 0 }}>
        <MobileNav photoURL={user.photoURL} />
        <Logo />
        {!isEditPost && !isNewPost && !isProfile && !isSearchPage && <Search />}
        <div className={styles.userAction}>
          {(isNewPost || isEditPost) && (
            <PublishButton submitEditPost={submitEditPost} />
          )}
          {!isProfile && (
            <Link to="/search" className={styles.searchMobileWrapper}>
              <div className={styles.searchMobileIcon}></div>
            </Link>
          )}

          <Suspense fallback={<User />}>
            {user.isLoggedIn ? (
              <>
                {!isProfile && <MyCourse />}
                <Notification />
                <User
                  photoURL={user.photoURL}
                  displayName={user.displayName}
                  email={user.email}
                  slug={user.slug}
                />
              </>
            ) : (
              <Login />
            )}
          </Suspense>
        </div>
      </Container>
    </Navbar>
  )
}

export default memo(Header)
