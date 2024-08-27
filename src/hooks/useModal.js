// src/hooks/useModal.js

import { useState, useEffect } from 'react';

const useModal = (initialIsOpen = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialIsOpen);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isModalOpen, openModal, closeModal, toggleModal };
};

export default useModal;