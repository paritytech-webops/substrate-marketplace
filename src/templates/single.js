import DOMPurify from 'dompurify';
import { graphql } from 'gatsby';
import { isBrowser, Layout, NavBreadcrumb, Section, SEO } from 'gatsby-plugin-substrate';
import React from 'react';

import Sidebar from '../components/layout/single-template/Sidebar';
import ProjectLogo from '../components/ui/ProjectLogo';

export default function SingularPageTemplate({ pageContext }) {
  const { node, section } = pageContext;
  const { name, description, readmeContent } = node;
  const cleanHtml = isBrowser ? DOMPurify.sanitize(readmeContent) : readmeContent;

  return (
    <Layout>
      <SEO title={name} />
      <Section>
        <article className="lg:flex">
          <div className="lg:flex-grow mb-10 lg:mb-20 pr-4 underline-animate underline-animate-thin">
            <div className="mb-12 capitalize">
              <NavBreadcrumb hiddenCrumbs={[]} />
            </div>
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row lg:items-center">
                {section === 'projects' && (
                  <ProjectLogo
                    projectName={name}
                    className="w-12 h-12 lg:w-[60px] lg:h-[60px] mr-5 p-0.5 object-contain rounded-full dark:bg-gray-300"
                  />
                )}
                <h1 className="font-bold mb-0 lg:text-5xl">{name}</h1>
              </div>
            </div>
            {readmeContent ? (
              <div
                className="xl:max-w-4xl lg:max-w-2xl markdown-body"
                dangerouslySetInnerHTML={{ __html: cleanHtml }}
              ></div>
            ) : (
              <p className="xl:max-w-4xl lg:max-w-2xl  markdown-body">{description}</p>
            )}
          </div>
          <Sidebar data={node} section={section} />
        </article>
      </Section>
    </Layout>
  );
}

export const query = graphql`
  query {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
