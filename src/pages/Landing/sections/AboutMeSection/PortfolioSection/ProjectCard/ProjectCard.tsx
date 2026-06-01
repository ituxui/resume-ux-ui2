import type { ReactNode } from 'react';
import { Link } from 'react-router';
import styles from './ProjectCard.module.scss';
import { Heading, Text } from '@shared/ui';

type ProjectCardProps = {
  heading: ReactNode;
  description: ReactNode;
  img: string;
  alt: string;
  link: string;
};

export const ProjectCard = ({
  heading,
  description,
  img,
  alt,
  link,
}: ProjectCardProps) => {
  return (
    <Link to={link} className={styles.wrapper}>
      <div className={styles.image}>
        <img src={img} alt={alt} className={styles.img} />
      </div>

      <Heading role="navigation-widget" className={styles.heading}>
        {heading}
      </Heading>
      <Text role="body" className={styles.description} colorScheme="muted">
        {description}
      </Text>
    </Link>
  );
};
