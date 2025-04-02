import React from 'react'
import Banner from '../components/Banner'
import WashType from '../components/WashType'
import StationRegistrationBanner from '../components/StationRegistrationBanner'
import CitySearch from '../components/CitySearch'

const Home = () => {
  return (
    <div>
      <Banner/>
      <CitySearch/>
      <StationRegistrationBanner/>
      <WashType/>
    </div>
  )
}

export default Home