import { DocumentData, doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore'
import styled from 'styled-components';
import { auth, firestore } from '../firebase/clientApp';

const RSVPWedding = () => {
  const [user, , ] = useAuthState(auth)

  const docRef = doc(firestore, 'rsvp_wedding', `${user?.email}`)
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

  let currentData: DocumentData | undefined = {
    reception: false,
    day1: false,
    day2: false,
    rsvp: 'other'
  }

  let currentResponse = currentData.rsvp

  if(currentRSVP?.exists) {
    currentData = currentRSVP.data()
    currentResponse = currentData?.rsvp
  }


  const currentMessage = messageByType[currentResponse as keyof typeof messageByType] || messageByType.other 

  const setRSVP = (answer: String) => {
    setDoc(docRef, {
      rsvp: answer,
      name: user?.displayName,
      email: user?.email,
      day1: false,
      day2: false,
      reception: false
    })
  }

  const handleChange = (type: string) => {
    setDoc(docRef, {
      ...currentData,
      [type]: !currentData?.[type],
      name: user?.displayName,
      email: user?.email,
      rsvp: currentData?.rsvp || 'other'
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

      {(currentResponse === 'yes' || currentResponse === 'maybe') && (
        <div>
          <h2>Please select the days that you can make it</h2>
          <CheckboxGroup>
            <label>
              <input type='checkbox' name='reception' checked={currentData?.reception} onChange={() => handleChange('reception')} />
              Pre wedding party | 24th November 2023
            </label>

            <label>
              <input type='checkbox' name='reception' checked={currentData?.day1} onChange={(e) => handleChange('day1')} />
              Haldi & Sangeet | 26th November 2023
            </label>

            <label>
              <input type='checkbox' name='reception' checked={currentData?.day2} onChange={(e) => handleChange('day2')} />
              Mayra, Phere & Reception | 27th November 2023
            </label>
          </CheckboxGroup>
        </div>
      )} 
      
    </RSVPContainer>
  )
}

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  label {
    display: flex;
    column-gap: 16px;
    flex-direction: row;
  }
`;

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

export default RSVPWedding;
