import React from 'react';
import styles from './models.module.css';
import { DoneIcon, NotificationIcon, UserCircleIcon } from '@shared/assets/index.ts';
import { Button } from '@shared/index';
import { Modal } from '@shared/ui/modal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'info' | 'exchange';
  onButtonClick?: () => void;
}

export const ModalInfo: React.FC<ModalProps> = ({ isOpen, onClose, type, onButtonClick }) => {
  if (!isOpen) return null;

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    onClose();
  };

  const iconMap = {
    success: NotificationIcon,
    info: DoneIcon,
    exchange: UserCircleIcon,
  };

  const title = {
    success: 'Вы предложили обмен',
    info: 'Ваше предложение создано',
    exchange: 'Ваше предложение создано',
  };

  const description = {
    success: 'Теперь дождитесь подтверждения. Вам придёт уведомление',
    info: 'Теперь вы можете предложить обмен',
    exchange: 'Теперь вы можете предложить обмен',
  };

  const IconComponent = iconMap[type];

  return (
    <Modal onClose={handleButtonClick} isOpen>
      <div className={styles.content}>
        <div className={styles.icon}>
          <IconComponent />
        </div>
        <div className={styles.info}>
          <div className={styles.text}>
            <h2 className={styles.title}>{title[type]}</h2>
            <p className={styles.description}>{description[type]}</p>
          </div>
          <Button onClick={handleButtonClick}>Готово</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalInfo;
