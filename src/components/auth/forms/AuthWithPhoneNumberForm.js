import React, { useEffect, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import styles from './AuthWithPhoneNumberForm.module.scss'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from '../../../firebase/config'
import FormGroup from '../../utils/auth-form/FormGroup'
import { apiURL } from '../../../context/constants'
import Cookies from 'js-cookie'
import userDefaultPhoto from '../../../asset/images/nobody_m.256x256.jpg'

const LoginWithPhoneNumberForm = ({
  switchPhoneAndEmail,
  dispatchAndNavigate,
  isLogin,
}) => {
  const COUNTRY_NAME_DEFAULT = 'vn'
  const COUNTRY_CODE_DEFAULT = '84'

  const LIMITED_COUNTER = 60

  const [countryName, setCountryName] = useState(COUNTRY_NAME_DEFAULT)
  const [countryCode, setCountryCode] = useState(COUNTRY_CODE_DEFAULT)
  const [isSendVerifyCode, setIsSentVerifyCode] = useState(false)
  const [verifyOTP, setVerifyOTP] = useState('')
  const [counter, setCounter] = useState(LIMITED_COUNTER)
  const [userPhoneNumber, setUserPhoneNumber] = useState('')
  const [fullName, setFullName] = useState('')
  const [validatePhoneNumber, setValidatePhoneNumber] = useState(null)
  const [validateFullName, setValidateFullName] = useState(null)
  const [invalidOTP, setInvalidOTP] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const getCountryName = (e) => {
    const countryNameFormatted = e.target.value.split(' ')[0].toLowerCase()
    const countryCodeFormatted = e.target.value.split(' +')[1]

    setCountryName(countryNameFormatted)
    setCountryCode(countryCodeFormatted)
  }

  const onSubmitOTP = () => {
    sendOTPCode()
    setIsSentVerifyCode(true)
    counterWhenSubmit()
  }

  const counterWhenSubmit = () => {
    let interval = setInterval(() => {
      setCounter((prev) => {
        const isCounterGreaterThanZero = prev > 0
        if (isCounterGreaterThanZero) return prev - 1

        clearInterval(interval)
        setIsSentVerifyCode(false)
        return LIMITED_COUNTER
      })
    }, 1000)
  }

  const sendOTPCode = async () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      auth,
    )

    const phoneNumber = `+${countryCode}${userPhoneNumber}`
    const appVerifier = window.recaptchaVerifier

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      )
      window.confirmationResult = confirmationResult
    } catch (error) {
      console.log(error.message)
    }
  }

  const validateOTPGetUserDataIfTrue = async () => {
    try {
      setLoading(true)
      const result = await window.confirmationResult.confirm(verifyOTP)

      let user = await result.user
      const hasUserData = user

      hasUserData && signInOrSignUp()
    } catch (error) {
      if (error.code === 'auth/invalid-verification-code')
        setInvalidOTP('Mã xác minh không hợp lệ')
    } finally {
      setLoading(false)
    }
  }

  const signInOrSignUp = async () => {
    if (isLogin) {
      const res = await fetch(`${apiURL}/login/provider`, {
        method: 'POST',
        body: JSON.stringify({
          phoneNumber: userPhoneNumber,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      Cookies.set('token', data.accessToken, { expires: 365 })
      dispatchAndNavigate({
        ...data.user,
        accessToken: data.accessToken,
      })
    } else {
      const userDefaultAvatar =
        'https://firebasestorage.googleapis.com/v0/b/f8clone-3e404.appspot.com/o/uploads%2Fnobody_m.256x256.jpg?alt=media&token=8e617e21-795f-45ce-8340-955a5290e66f'

      const res = await fetch(`${apiURL}/register`, {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          photoURL: userDefaultAvatar,
          phoneNumber: userPhoneNumber,
          activated: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      Cookies.set('token', data.accessToken, { expires: 365 })
      dispatchAndNavigate({
        ...data.user,
        accessToken: data.accessToken,
      })
    }
  }

  const checkNumberPhone = async (e) => {
    try {
      const length = e.target.value.trim().length
      const isPhoneNumberInputLengthEqualTen = length === 10

      if (isPhoneNumberInputLengthEqualTen) {
        const res = await fetch(`${apiURL}/login/phone-number`, {
          method: 'POST',
          body: JSON.stringify({ phoneNumber: e.target.value }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await res.json()

        !isLogin && data.notUsed && setUserPhoneNumber(e.target.value)
        isLogin && data.used && setUserPhoneNumber(e.target.value)

        isLogin
          ? setValidatePhoneNumber(data.notUsed ? data.notUsed : null)
          : setValidatePhoneNumber(data.used ? data.used : null)
      }

      const isPhoneNumberInputLengthEqualZero = length === 0
      isPhoneNumberInputLengthEqualZero && setValidatePhoneNumber(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleValidateFullName = () => {
    const isEmptyFullNameInput = fullName.length === 0
    const isValidFullNameInput =
      fullName.length > 1 && !fullName.match('[a-zA-Z][a-zA-Z ]{2,}')

    if (isEmptyFullNameInput) {
      setValidateFullName('Tên không được để trống')
    } else if (isValidFullNameInput) {
      setValidateFullName(null)
    } else {
      setValidateFullName('Tên của bạn không hợp lệ')
    }
  }

  useEffect(() => {
    const disableSendOTPButton = () => {
      if (!isLogin) {
        return (
          fullName.trim().indexOf(' ') === -1 ||
          validateFullName !== null ||
          userPhoneNumber.length !== 10 ||
          validatePhoneNumber !== null
        )
      }
      return userPhoneNumber.length !== 10 || validatePhoneNumber !== null
    }

    setDisabled(disableSendOTPButton())
  }, [
    fullName,
    isLogin,
    userPhoneNumber.length,
    validateFullName,
    validatePhoneNumber,
  ])

  useEffect(() => {
    const isEmptyOTPInput = verifyOTP.length === 0
    isEmptyOTPInput && setInvalidOTP(null)
  }, [verifyOTP.length])

  return (
    <Form className={styles.formBody}>
      {!isLogin && (
        <FormGroup
          label="Tên của bạn?"
          maxLength={50}
          placeholder={'Họ và tên của bạn'}
          onChange={{
            input: (e) => {
              setFullName(e.target.value)
              setValidateFullName(null)
            },
          }}
          onBlur={handleValidateFullName}
          inValid={validateFullName}
        />
      )}
      <FormGroup
        placeholder={'Số điện thoại'}
        label={'Số điện thoại'}
        labelRight={'email'}
        isLogin={isLogin}
        phoneInput={true}
        maxLength={11}
        onClick={() => switchPhoneAndEmail('email')}
        onChange={{
          selectCountry: getCountryName,
          input: checkNumberPhone,
        }}
        countryName={countryName}
        inValid={validatePhoneNumber}
      />
      <FormGroup
        placeholder={'Nhập mã xác nhận'}
        maxLength={6}
        OTPInput={true}
        isSendVerifyCode={isSendVerifyCode}
        onChange={{ input: (e) => setVerifyOTP(e.target.value) }}
        counter={counter}
        disabled={disabled}
        inputDisabled={!isSendVerifyCode}
        onClick={onSubmitOTP}
        inValid={invalidOTP}
        onKeyUp={(e) =>
          e.keyCode === 13 &&
          verifyOTP.length === 6 &&
          validateOTPGetUserDataIfTrue()
        }
      />
      <div
        className={
          verifyOTP.length === 6 && !loading
            ? styles.logInButton
            : `${styles.logInButton} ${styles.disabled}`
        }
        onClick={validateOTPGetUserDataIfTrue}
      >
        {loading && (
          <Spinner
            animation="border"
            style={{ width: 24, height: 24, color: '#fff' }}
          />
        )}
        {!loading && <span>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</span>}
      </div>
    </Form>
  )
}

export default LoginWithPhoneNumberForm
