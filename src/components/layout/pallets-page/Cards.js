import React, { useEffect, useState } from 'react';

import { slugify } from '../../../utils/url';
import { Link } from '../../default/Link';

export default function Cards({ data, selectedVersion, searchQuery, selectedCategory }) {
  const cardsData = data.data.marketplace.search.results;
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    const filtered = cardsData.filter(each => each.compatibilityVersion === selectedVersion);
    setFilteredData(filtered);
  }, [selectedVersion]);

  return (
    <>
      {filteredData.length > 0 &&
        filteredData
          .filter(each => {
            if (selectedCategory === 'all') {
              return each;
            } else if (each.categories && each.categories.includes(selectedCategory)) {
              return each;
            }
          })
          .filter(each => {
            if (searchQuery.length === 0) {
              return each;
            } else if (each.name.toLowerCase().includes(searchQuery)) {
              return each;
            }
          })
          .map((each, index) => {
            return (
              <Link
                key={index}
                to={`/pallets/${slugify(each.name)}/`}
                className="w-full duration-300 ease-in-out hover:scale-105"
              >
                <div className="relative h-44 px-4 py-3 bg-substrateGray-light dark:bg-substrateDark rounded-md shadow-md">
                  <div className="absolute top-0 right-0 py-2 px-3 bg-substrateGreen-light dark:bg-substrateGreen rounded-tr-md rounded-bl-md font-bold text-xs">
                    {each.version}
                  </div>
                  <div>
                    <h5 className="mb-2 truncate md:w-60 xl:w-auto 2xl:w-60">{each.name}</h5>
                    <p className="text-sm mb-4">{each.authors ? each.authors : 'N/A'}</p>
                    <p className="text-sm mb-0 h-20 text-ellipsis overflow-hidden">{each.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
    </>
  );
}