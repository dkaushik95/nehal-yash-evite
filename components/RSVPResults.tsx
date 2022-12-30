import { collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, firestore } from '../firebase/clientApp';

const RSVPResults = () => {
  const [user, , ] = useAuthState(auth)

  const docRef = collection(firestore, 'rsvp')
  const [rsvps, , ] = useCollection(docRef, {snapshotListenOptions: {includeMetadataChanges: true}})

  const allRsvps = rsvps?.docs.map(doc => doc.data())

  const yesList = allRsvps?.filter(r => r.rsvp === 'yes')
  const noList = allRsvps?.filter(r => r.rsvp === 'no')
  const maybeList = allRsvps?.filter(r => r.rsvp === 'maybe')

  return (
    <ResultsContainer>
      <h1>Hello, {user?.displayName}</h1>
      <h2>
        Here&apos;s the deets:
      </h2>
      <DetailsContainer>
        <div>
          <h3>Yes ({yesList?.length})</h3>
          <List>
            {yesList?.map(y => (
              <li key={y.email}>{y.name}</li>
            ))}
          </List>
        </div>
        
        <div>
          <h3>No ({noList?.length})</h3>
          <List>
            {noList?.map(y => (
              <li key={y.email}>{y.name}</li>
            ))}
          </List>
        </div>
        
        <div>
          <h3>Maybe ({maybeList?.length})</h3>
          <List>
            {maybeList?.map(y => (
              <li key={y.email}>{y.name}</li>
            ))}
          </List>
        </div>
      </DetailsContainer>
      
    </ResultsContainer>
  )
}

const ResultsContainer = styled.div`

  width: 80%;

  display: flex;
  flex-direction: column;

  row-gap: 2rem;

  h1, h2, h3, h4, h5, h6, button {
    font-family: 'IBM Plex Sans';
  }

`;

const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 600px){
    flex-direction: column;
    row-gap: 1rem;
  }
`

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 1rem;
`

export default RSVPResults;