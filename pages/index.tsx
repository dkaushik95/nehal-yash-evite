import { motion } from 'framer-motion';
import Head from 'next/head'
import Image from 'next/image'
import { useAuthState, useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth';
// import styles from '../styles/Home.module.css'

import styled from 'styled-components';
import InformationCard from '../components/InformationCard';
import RSVPEditor from '../components/RSVPEditor';
import RSVPResults from '../components/RSVPResults';
import { auth } from '../firebase/clientApp';

const admins = [
  'agrawal.nehal2810@gmail.com',
  'rite2yash@gmail.com'
]

export default function Home() {
  const [ signOut ] = useSignOut(auth)
  const [ signInWithGoogle, , loading ] = useSignInWithGoogle(auth)
  const [ user, , error ] = useAuthState(auth)

  const continueWithGoogle = async () => {
    await signInWithGoogle()
  }

  const logout = async () => {
    await signOut()
  }

  return (
    <AppContainer>
      <HeroImage
          width={800}
          height={600}
          src='/images/party-background.jpg'
          alt='Image'
        />
      <InformationCard />
      {loading && (
        <Button>Loading</Button>
      )}
      {!user && !loading && (
        <Button onClick={continueWithGoogle}>Continue with Google</Button>
      )}
      {/* RSVP Editor */}
      <Divider />

      {user && (
        <>
          {!admins.includes(`${user.email}`) && (
            <>
              <RSVPEditor />
              <Button secondary onClick={logout}>Log out</Button>
            </>
          )}
          {admins.includes(`${user.email}`) && (
            <>
              <RSVPResults />
              <Button secondary onClick={logout}>Log out</Button>
            </>
          )}
        </>
      )}
    </AppContainer>
  )
}

const Divider = styled.div`
  width: 80%;
  border-top: .1rem solid #cacaca;
`;

const AppContainer = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  background: #fefcfa;
  row-gap: 2rem;
  padding-bottom: 4rem;

`;

const HeroImage = styled(Image)`
  width: 90%;
  object-fit: cover;
  object-position: center;
  border: 1px solid #555;
  border-radius: 1.5rem;
`;

const Button = styled.button<{
  secondary?: boolean|any
}>`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #555;
  font-size: ${props => props.secondary ? '1.5rem' : '2rem'};
  ${props => props.secondary ? '' : ''}
  background: ${props => props.secondary ? 'transparent' : '#403b20'};
  color: ${props => props.secondary ? '#403b20' : 'white'};
`;