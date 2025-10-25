import React, { useState } from 'react';
import Modal from '@/components/common/Modal';

export default function ListModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Modal show={showModal} onClose={onCloseModal}>
      <Text>Hello Bruh</Text>
    </Modal>
  );
};