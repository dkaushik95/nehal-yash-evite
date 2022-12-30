import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore'
import styled from 'styled-components';
import { auth, firestore } from '../firebase/clientApp';

const RSVPEditor = () => {
  const [user, , ] = useAuthState(auth)

  const docRef = doc(firestore, 'rsvp', `${user?.email}`)
  const [ currentRSVP, loading, ] = useDocument(docRef, {
    snapshotListenOptions: {
      includeMetadataChanges: true
    }
  })

  const messageByType = {
    yes: 'See you soon! 😃',
    no: 'Sorry you couldn\'t make it. 😞',
    maybe: 'Maybe you\'ll change that soon! 😃',
    other: 'Choose your RSVP'
  }

  let currentResponse = 'other'

  if(currentRSVP?.exists) {
    currentResponse = currentRSVP.data()?.rsvp
  }

  const currentMessage = messageByType[currentResponse as keyof typeof messageByType] || messageByType.other 

  const setRSVP = (answer: String) => {
    setDoc(docRef, {
      rsvp: answer,
      name: user?.displayName,
      email: user?.email
    })
  }

  return (
    <RSVPContainer>
      <h1>Hi {user?.displayName}</h1>
      {loading && (
        <p>Current status loading</p>
      )}
      {currentRSVP?.exists() && (
        <p>Your RSVP has been recorded, you can update it here anytime</p>
      )}
      <h2>{currentMessage}</h2>
      <Buttons>
        <Button isActive={currentResponse === 'yes'} bg='#005d13' onClick={() => setRSVP('yes')}>Yes</Button>
        <Button isActive={currentResponse === 'no'} bg='#9b0000' onClick={() => setRSVP('no')}>No</Button>
        <Button isActive={currentResponse === 'maybe'} bg='#403b20' onClick={() => setRSVP('maybe')}>Maybe</Button>
      </Buttons>
      
    </RSVPContainer>
  )
}

const RSVPContainer = styled.div`
  width: 100%;
  padding: 2rem;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const Button = styled.button<{
  isActive: boolean,
  bg: string
}>`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #403b20;
  font-size: 2rem;
  background: ${props => props.isActive ? props.bg : 'transparent'};
  color: ${props => props.isActive ? 'white' : '#403b20'};
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default RSVPEditor;
