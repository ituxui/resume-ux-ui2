import { useNavigate } from 'react-router';
import styles from './Article.module.scss';
import { Heading, Text, Image } from '@components';
import cn from 'classnames';
import type { RoutePath } from '@shared/routes';

export interface ArticleProps {
  heading?: string;
  description?: string;
  imageSrc?: string;
  to?: RoutePath | string;
  classNames?: {
    wrapper?: string;
    container?: string;
    header?: string;
    heading?: string;
    description?: string;
    image?: string;
    imageContainer?: string;
  };
}

export const Article = ({
  heading,
  description,
  imageSrc,
  to,
  classNames: classes,
}: ArticleProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (to && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={cn(styles.wrapper, classes?.wrapper, {
        [styles.clickable]: Boolean(to),
      })}
      onClick={handleClick}
      role={to ? 'link' : undefined}
      tabIndex={to ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className={cn(styles.container, classes?.container)}>
        <div className={cn(styles.header, classes?.header)}>
          {heading && (
            <Heading
              role="article"
              className={cn(styles.heading, classes?.heading)}
            >
              {heading}
            </Heading>
          )}
        </div>
        {description && (
          <Text
            role="caption"
            className={cn(styles.description, classes?.description)}
          >
            {description}
          </Text>
        )}
      </div>
      {imageSrc && (
        <Image
          src={imageSrc}
          className={{
            container: cn(styles.imageContainer, classes?.imageContainer),
            image: cn(styles.image, classes?.image),
          }}
          zoomable={false}
        />
      )}
    </div>
  );
};
