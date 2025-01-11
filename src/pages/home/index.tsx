import MatchingSheet from '@/components/home/MatchingSheet';
import Navbar from '@/components/home/Navbar';
import { useState } from 'react';

const HomePage = () => {
  const [modalContent, setModalContent] = useState({
    home: true,
    match: false,
    friend: false,
  });

  return (
    <section className="w-full flex-1 overflow-hidden p-[16px] relative bg-neutral">
      <MatchingSheet modalContent={modalContent} />
      <Navbar modalContent={modalContent} setModalContent={setModalContent} />
    </section>
  );
};

export default HomePage;
