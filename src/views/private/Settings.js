import React, { useState, Suspense, useEffect } from 'react'
import styles from './Settings.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../components/main-layout/nav/Header'
import { useSelector } from 'react-redux'
import FieldInput from '../../components/utils/field-input/FieldInput'
import Cookies from 'js-cookie'
import { apiURL } from '../../context/constants'
import { useDispatch } from 'react-redux'
import { settings } from '../../actions/userAction'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'
import { storage } from '../../firebase/config'
import removeActions from '../../components/utils/remove-accents/removeActions'

const Footer = React.lazy(() =>
  import('../../components/main-layout/footer/Footer')
)

const Settings = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [settingMode, setSettingMode] = useState([])
  const [fullName, setFullName] = useState(user.displayName)
  const [bio, setBio] = useState(user.bio ? user.bio : '')
  const [image, setImage] = useState({
    preview: null,
    avatar: null,
  })
  const [social, setSocial] = useState({
    fb: user.socials.fb ? user.socials.fb : '',
    youtube: user.socials.youtube ? user.socials.youtube : '',
    linkedin: user.socials.linkedin ? user.socials.linkedin : '',
    instagram: user.socials.instagram ? user.socials.instagram : '',
    twitter: user.socials.twitter ? user.socials.twitter : '',
  })

  useEffect(() => (document.title = 'Thiết lập về tôi tại F8'), [])

  const settingModeChosen = (option) => settingMode.includes(option)

  const handleSettingMode = (option) =>
    settingModeChosen(option)
      ? setSettingMode((prev) => prev.filter((item) => item !== option))
      : setSettingMode((prev) => [...prev, option])

  useEffect(() => () => image.preview && URL.revokeObjectURL(image), [image])

  const getNewAvatar = (e) => {
    const image = URL.createObjectURL(e.target.files[0])
    setImage((prev) => {
      return {
        ...prev,
        preview: image,
        avatar: e.target.files[0],
      }
    })
  }

  const changeName = async () => {
    const { accessToken } = JSON.parse(Cookies.get('userData'))
    if (!accessToken) return

    const url = `${apiURL}/help/setting/fullName`
    const data = await patchFullName(url, accessToken)

    setFullName(data.fullName)
    dispatch(settings({ fullName: data.fullName, photoURL: user.photoURL }))
  }

  const patchFullName = async (url, token) => {
    try {
      return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ fullName }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      handleSettingMode('name')
    }
  }

  const changeAvatar = () => {
    const { accessToken } = JSON.parse(Cookies.get('userData'))
    if (!accessToken) return

    if (image.avatar) {
      const storageRef = ref(storage, `uploads/${image.avatar.name}`)
      const uploadTask = uploadBytesResumable(storageRef, image.avatar)

      uploadTask.on(
        'state_changed',
        () => {},
        (err) => console.log(err),
        async () => {
          const photoURL = await getDownloadURL(uploadTask.snapshot.ref)
          const url = `${apiURL}/help/setting/avatar`
          const data = await patchAvatar(url, photoURL, accessToken)

          setImage(data.photoURL)
          dispatch(
            settings({ fullName: user.displayName, photoURL: data.photoURL })
          )
        }
      )
    }
  }

  const patchAvatar = async (url, photoURL, token) => {
    try {
      return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ photoURL }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      handleSettingMode('avatar')
    }
  }

  const bioChange = async () => {
    const { accessToken } = JSON.parse(Cookies.get('userData'))
    if (!accessToken) return

    const url = `${apiURL}/help/setting/bio`
    const data = await patchBio(url, accessToken)

    setBio(data.bio)
    dispatch(
      settings({
        fullName: user.displayName,
        photoURL: user.photoURL,
        bio: data.bio,
      })
    )
  }

  const patchBio = async (url, token) => {
    try {
      return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({ bio }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      handleSettingMode('bio')
    }
  }

  const socialChange = async (socialName) => {
    const { accessToken } = JSON.parse(Cookies.get('userData'))
    if (!accessToken) return

    const url = `${apiURL}/help/setting/social`
    const data = await patchSocial(url, socialName, accessToken)

    setSocial((prev) => {
      return {
        ...prev,
        fb: data.socials.fb ? data.socials.fb : '',
        youtube: data.socials.youtube ? data.socials.youtube : '',
        linkedin: data.socials.linkedin ? data.socials.linkedin : '',
        instagram: data.socials.instagram ? data.socials.instagram : '',
        twitter: data.socials.twitter ? data.socials.twitter : '',
      }
    })
  }

  const patchSocial = async (url, socialName, token) => {
    try {
      return await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(social),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      handleSettingMode(socialName)
    }
  }

  return (
    <>
      <Header />
      <Container className={styles.settings}>
        <Row style={{ margin: 0 }}>
          <Col sm={12} md={12} lg={9} xl={9}>
            <div className={styles.wrapper}>
              <h3 className={styles.heading}>Cài đặt</h3>
              <div className={styles.container}>
                <div className={styles.userInfo}>
                  <h3>Thông tin cá nhân</h3>
                </div>
                <FieldInput
                  title={'Họ tên'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  description={
                    'Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn.'
                  }
                  placeholder={'Thêm tên của bạn'}
                  maxLength={50}
                  disabled={!settingMode.includes('name')}
                  onShow={() => handleSettingMode('name')}
                  settingMode={settingMode.includes('name')}
                  onSave={changeName}
                />
                <FieldInput
                  title={'Bio'}
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  description={
                    'Bio hiển thị trên trang cá nhân và trong các bài viết (blog) của bạn.'
                  }
                  placeholder={'Thêm giới thiệu'}
                  maxLength={150}
                  disabled={!settingMode.includes('bio')}
                  onShow={() => handleSettingMode('bio')}
                  settingMode={settingMode.includes('bio')}
                  onSave={bioChange}
                />
                <FieldInput
                  title={'Avatar'}
                  description={
                    'Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.'
                  }
                  photoURL={user.photoURL}
                  preview={image.preview}
                  isImage={true}
                  onFileChange={getNewAvatar}
                  onShow={() => handleSettingMode('avatar')}
                  settingMode={settingMode.includes('avatar')}
                  onSave={changeAvatar}
                />
                <FieldInput
                  title={'Email'}
                  value={user.email ? user.email : ''}
                  placeholder={'Eg. hoclaptrinh@f8.edu.vn'}
                  isEdit={false}
                  disabled={true}
                />
                <FieldInput
                  title={'User Name'}
                  value={`${removeActions(
                    user.displayName.toLowerCase().replace(/\s/g, '')
                  )}`}
                  placeholder={'Thêm user name'}
                  isEdit={false}
                  disabled={true}
                  description={`URL: https://fullstack.edu.vn/@${removeActions(
                    user.displayName.toLowerCase().replace(/\s/g, '')
                  )}`}
                />
                <FieldInput
                  title={'Số điện thoại'}
                  value={user.phoneNumber}
                  placeholder={'Thêm số điện thoại'}
                  isEdit={false}
                  disabled={true}
                  description={'Điện thoại kết nối với F8.'}
                />
              </div>

              <div className={styles.container}>
                <div className={styles.userInfo}>
                  <h3>Mạng xã hội</h3>
                </div>
                <FieldInput
                  title={'Facebook'}
                  maxLength={150}
                  onChange={(e) =>
                    setSocial((prev) => {
                      return {
                        ...prev,
                        fb: e.target.value,
                      }
                    })
                  }
                  placeholder={'Eg. https://www.facebook.com/hoclaptrinhf8'}
                  disabled={!settingMode.includes('fb')}
                  onShow={() => handleSettingMode('fb')}
                  settingMode={settingMode.includes('fb')}
                  onSave={() => socialChange('fb')}
                  value={social.fb}
                />
                <FieldInput
                  title={'Youtube'}
                  placeholder={'Eg. https://www.youtube.com/c/F8VNOfficial'}
                  maxLength={150}
                  onChange={(e) =>
                    setSocial((prev) => {
                      return {
                        ...prev,
                        youtube: e.target.value,
                      }
                    })
                  }
                  disabled={!settingMode.includes('youtube')}
                  onShow={() => handleSettingMode('youtube')}
                  settingMode={settingMode.includes('youtube')}
                  onSave={() => socialChange('youtube')}
                  value={social.youtube}
                />
                <FieldInput
                  title={'Linkedin'}
                  placeholder={'Eg. https://www.linkedin.com/in/hoclaptrinhf8/'}
                  maxLength={150}
                  onChange={(e) =>
                    setSocial((prev) => {
                      return {
                        ...prev,
                        linkedin: e.target.value,
                      }
                    })
                  }
                  disabled={!settingMode.includes('linkedin')}
                  onShow={() => handleSettingMode('linkedin')}
                  settingMode={settingMode.includes('linkedin')}
                  onSave={() => socialChange('linkedin')}
                  value={social.linkedin}
                />
                <FieldInput
                  title={'Instagram'}
                  placeholder={'Eg. https://www.instagram.com/hoclaptrinhf8/'}
                  maxLength={150}
                  onChange={(e) =>
                    setSocial((prev) => {
                      return {
                        ...prev,
                        instagram: e.target.value,
                      }
                    })
                  }
                  disabled={!settingMode.includes('instagram')}
                  onShow={() => handleSettingMode('instagram')}
                  settingMode={settingMode.includes('instagram')}
                  onSave={() => socialChange('instagram')}
                  value={social.instagram}
                />
                <FieldInput
                  title={'Twitter'}
                  placeholder={'Eg. https://twitter.com/hoclaptrinhf8'}
                  maxLength={150}
                  onChange={(e) =>
                    setSocial((prev) => {
                      return {
                        ...prev,
                        twitter: e.target.value,
                      }
                    })
                  }
                  disabled={!settingMode.includes('twitter')}
                  onShow={() => handleSettingMode('twitter')}
                  settingMode={settingMode.includes('twitter')}
                  onSave={() => socialChange('twitter')}
                  value={social.twitter}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default Settings
