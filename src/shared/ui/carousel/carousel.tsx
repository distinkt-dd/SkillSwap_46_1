import { useState, type FC } from 'react';
import styles from './carousel.module.css'; // создайте файл стилей
import clsx from 'clsx';
import { IconUI } from '../icons';

export type TCarousel = {
  className: string;
  images: (string | undefined)[];
};

export const CarouselUI: FC<TCarousel> = ({ className, images }) => {
  const flexImages = images;
  const [stateImg, setStateImg] = useState(flexImages);

  if (!images) return;

  const handleForw = () => {
    setStateImg((prev) => {
      if (prev.length === 0) return prev;
      return [...prev.slice(1), prev[0]];
    });
  };

  const handleBack = () => {
    setStateImg((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, -1);
      return [last, ...rest];
    });
  };

  return (
    <div className={clsx(styles.carouselContainer, className)}>
      <div className={styles.carouselGeneral}>
        <button className={clsx(styles.btn, styles.left)} onClick={handleBack}>
          <IconUI name="chevronRight" />
        </button>
        <button className={clsx(styles.btn, styles.right)} onClick={handleForw}>
          <IconUI name="chevronRight" />
        </button>
        <img src={stateImg[0]} alt="" />
      </div>
      <ul className={styles.carouselList}>
        {stateImg.map((item, index, arr) => {
          if (index === 0) return;
          if (index < 3)
            return (
              <li className={styles.carouselItem}>
                <img src={item} />
              </li>
            );
          if (index === 3) {
            if (arr.length > 4) {
              return (
                <li className={styles.carouselItem}>
                  <span data-num={`+${arr.length - 3}`} className={styles.fade}></span>
                  <img src={item} />
                </li>
              );
            }
            return (
              <li className={styles.carouselItem}>
                <img src={item} />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
