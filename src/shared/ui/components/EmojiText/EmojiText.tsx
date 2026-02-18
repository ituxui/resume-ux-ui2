import { Text } from '@components';
import styles from './EmojiText.module.scss';


export type EmojiTextProps = React.HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt: string;
}

export const EmojiText = ({ children, src, alt }: EmojiTextProps) => {
  return (
    <div className={styles.wrapper}>
      <img src={src} alt={alt}
        loading="lazy"
        decoding="async" fetchPriority="low"
      />
      <Text role='bento'>{children}</Text>
    </div>
  )
}
