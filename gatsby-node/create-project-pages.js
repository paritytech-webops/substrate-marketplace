const path = require('path');
const { slugify } = require('../src/utils/url');

/*
   Notes:
   - all graphql function call returns a Promise
 */

const createProjectPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      marketplace {
        search(category: "", query: "", type: PROJECT) {
          results {
            ... on marketplace_Project {
              id
              name
              authors
              description
              version
              categories
              repository
              homepage
              license
              listingInsights {
                insights {
                  id
                  metricValue
                  metricName
                }
                stars
              }
              readme
              readmeContent
              documentation
              projectRelations {
                relations {
                  listing {
                    name
                    type
                    version
                  }
                  relationType
                }
              }
            }
          }
        }
        marketplaceCategories(type: PROJECT) {
          name
        }
      }
    }
  `);
  if (!result || !result.data) return;
  const section = 'projects';
  const categories = result.data.marketplace.marketplaceCategories;

  /* Single Project Pages e.g. siteurl.com/projects/project-name */
  result.data.marketplace.search.results.forEach(node => {
    const slug = slugify(node.name);
    const section = 'projects';
    createPage({
      path: `${section}/${slug}/`,
      component: path.resolve(`./src/templates/single.js`),
      context: {
        slug,
        node,
        section,
      },
    });
  });

  /* Aggregated Projects siteurl.com/projects */
  createPage({
    path: `/${section}/`,
    component: path.resolve(`./src/templates/list.js`),
    context: {
      result,
      categories,
      section,
    },
  });
};

module.exports = {
  createProjectPages,
};
