import React from 'react';
import NavbarProfile from '../components/NavbarProfile';
import FilterBar from '../components/FilterBar';
import ListVilla from '../components/ListVilla';


export default function Home() {
  return (
    <>
      <NavbarProfile />
       <FilterBar />
      <ListVilla />
    </>
  );
}
