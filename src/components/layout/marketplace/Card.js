import cx from 'classnames';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import { Link } from '../../default/Link';
import SecondaryButton from '../../ui/SecondaryButton';

export default function Card({ title, text, link }) {
  const imageStyles = 'block h-28 object-cover rounded-t-md';
  return (
    <Link to={link}>
      <div
        className={cx(
          'bg-substrateGray-light rounded-md mb-4 lg:mx-4 lg:mb-8 md:md-10 shadow-md lg:w-[438px] xl:w-[540px]',
          'hover:scale-105 transition-transform',
          'dark:bg-substrateBlackish'
        )}
      >
        {title === 'runtimes' ? (
          <StaticImage
            className={imageStyles}
            src="../../../../media/images/runtimes-home.jpg"
            alt={`Substrate Marketplace ${title}`}
          />
        ) : title === 'pallets' ? (
          <StaticImage
            className={imageStyles}
            src="../../../../media/images/pallets-home.jpg"
            alt={`Substrate Marketplace ${title}`}
          />
        ) : (
          <StaticImage
            className={imageStyles}
            src="../../../../media/images/projects-home.jpg"
            alt={`Substrate Marketplace ${title}`}
          />
        )}
        <div className="p-6 lg:p-9">
          <p className="text-2xl lg:text-4xl font-bold capitalize">{title}</p>
          <p className="sm:h-14">{text}</p>
          <div className="text-center sm:text-left">
            <SecondaryButton fullWidth hero>
              Browse {title}
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Link>
  );
}
