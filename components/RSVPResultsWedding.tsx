import { collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, firestore } from '../firebase/clientApp';

const RSVPResultsWedding = () => {
  const [user, , ] = useAuthState(auth)

  const docRef = collection(firestore, 'rsvp_wedding')
  const [rsvps, , ] = useCollection(docRef, {snapshotListenOptions: {includeMetadataChanges: true}})

  const allRsvps = rsvps?.docs.map(doc => doc.data())
  console.log('🚀 ~ file: RSVPResultsWedding.tsx:14 ~ RSVPResultsWedding ~ allRsvps:', allRsvps)

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
          <h3>Name</h3>
        </div>
        <div>
          <h3>RSVP</h3>
        </div>
        <div>
          <h3>Days</h3>
        </div>
      </DetailsContainer>
      <DetailsContainer>
        {allRsvps?.map(item => (
          <TableBody key={item.email}>
            <h3>{item.name}</h3>
            <h3>{item.rsvp}</h3>
            <ul>
              {item.reception && <li>24</li>}
              {item.day1 && <li>26</li>}
              {item.day2 && <li>27</li>}
            </ul>
          </TableBody>
        ))}
      </DetailsContainer>
      
    </ResultsContainer>
  )
}

const TableBody = styled.div`
  display: flex;
  row-gap: 2rem;
  width: 80%;
  justify-content: space-evenly;
`;

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
  justify-content: space-evenly;

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

export default RSVPResultsWedding;