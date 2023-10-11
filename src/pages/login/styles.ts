import { styled } from '../../../stitches.config'

export const LoginContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  padding: 20,
  minHeight: '100vh',
})

export const LogoSection = styled('section', {
  width: '100%',
  height: '100%',
  background: 'url(/images/logo-section-bg.png) no-repeat center',
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,

  img: {
    '@media(max-width: 768px)': {
      width: 116,
      height: 29,
    },
  },
})

export const WelcomeSection = styled('section', {
  width: '100%',
  maxWidth: 372,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: 20,

  div: {
    marginTop: 40,
  },
})

export const AuthButtonsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})
