import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ShowcaseCardsSection from '../components/ShowcaseCardsSection';
import homeCardsData from '../data/homeCards';
import pandaImage from '../assets/img/panda.jpg';

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection
        img={pandaImage}
        decorative={'Adopt a pet'}
        title={'Meet the inhabitants of LamaZoo'}
        subtitle={
          'Make a donation to receive a certificate recognizing your support. Support your favorite pet!'
        }
      />
      <ShowcaseCardsSection cardsContent={homeCardsData} />
    </>
  );
};

export default Home
