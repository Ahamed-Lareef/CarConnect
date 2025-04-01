import React from 'react'
import Banner from '../components/Banner'
import WashType from '../components/WashType'
import StationRegistrationBanner from '../components/StationRegistrationBanner'

const Home = () => {
  return (
    <div>
      <Banner/>
      <StationRegistrationBanner/>
      <WashType/>
    </div>
  )
}

export default Home