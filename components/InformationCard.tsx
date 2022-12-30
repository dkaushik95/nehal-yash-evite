import styled from 'styled-components'
import { motion } from 'framer-motion'

const createAnimationDown = (duration: number, delay: number) => ({
  initial:{opacity: 0, y: 100},
  animate:{opacity: 1, y: 0},
  transition:{duration, delay }
})

const InformationCard = () => {
  return (
    <InformationContainer>
      <Pre>Shake, Stir and Mix at</Pre>
      <Sub>Yash and Nehal&apos;s</Sub>
      <Heading>Cocktail Party</Heading>

      <MoreInfo>
        <Sec>
          <b>Date:</b>
          <p> Jan 7th, 2023</p>
        </Sec>
        <Sec>
          <b>Venue:</b> 
          <p>Encasa 2 clubhouse room, <br /> 520 E Weddell Drive, <br />Sunnyvale, CA 94089</p>
        </Sec>
        <Sec>
          <b>Time:</b>
          <p> 4PM onwards</p>
        </Sec>
        <Sec>
          <b>Dress code:</b>
          <p>Cocktail attire</p>
        </Sec>

        <Sec>
          <ul>
            <li>Parking is limited at the venue. You are encouraged to carpool/uber/lyft</li>
            <li>Your presence is the only present we need</li>
          </ul>
        </Sec>
      </MoreInfo>
    </InformationContainer>
  )
}

const MoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  margin-top: 2rem;
`;

const Sec = styled.div`
  display: flex;
  justify-content: space-between;
  >p {
    text-align: end;
  }
`

const B = styled.b.attrs({
  ['data-aos']: 'fade-right'
})``

const P = styled.p.attrs({
  ['data-aos']: 'fade-left'
})``


const Pre = styled.h3`
  color: #787878;

`

const Sub = styled.h2`
  color: #565554;

`

const Heading = styled.h1`
  color: #d0af1a;
  font-size: 3rem;

`

const InformationContainer = styled.div`
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default InformationCard