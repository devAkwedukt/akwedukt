import type {
  PostsSection,
  HeroSection,
  HeroBackgroundSection,
  AboutSection,
  PartnersSection,
  TestimonialsSection,
  ValuesSection,
  WhoWeAreSection,
  WhatWeDoSection,
  OurHistorySection,
  OurTeamSection,
  DocumentsSection,
  ProjectTitleSection,
  ProjectsGallerySection,
  ProjectFaqSection,
  ProjectSignupSection,
  ProjectPhotoInfoSection,
  ProjectQuestionsSection,
  ProjectVideoSection,
  PhotoInfoSection,
  FaqAccordionSection,
} from "@/sanity/typegen";
import ProjectsGalleryWrapper from "@/components/project-list/ProjectsGalleryWrapper";
import { ComponentType } from "react";
import { q } from "../groqd";
import { sanityFetch } from "../live";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SanityImage } from "@/sanity/image/SanityImage";
import HeroSlider from "@/components/home/hero/HeroSlider";
import HeroBackgroundSectionComponent from "@/components/reusable/HeroBackgroundSection";
import AboutSectionComponent from "@/components/home/AboutSection";
import PartnersSectionComponent from "@/components/reusable/PartnersSection";
import TestimonialsSectionComponent from "@/components/reusable/TestimonialsSection";
import ValuesSectionComponent from "@/components/home/ValuesSection";
import WhoWeAreSectionComponent from "@/components/about/WhoWeAreSection";
import WhatWeDoSectionComponent from "@/components/about/WhatWeDoSection";
import OurHistorySectionComponent from "@/components/about/OurHistorySection";
import OurTeamSectionComponent from "@/components/about/OurTeamSection";
import DocumentsSectionComponent from "@/components/reusable/DocumentsSection";
import ProjectTitleSectionComponent from "@/components/project-view/ProjectTitleSection";
import ProjectFaqSectionComponent from "@/components/project-view/ProjectFaqSection";
import ProjectSignupSectionComponent from "@/components/project-view/ProjectSignupSection";
import ProjectPhotoInfoSectionComponent from "@/components/project-view/ProjectPhotoInfoSection";
import ProjectQuestionsSectionComponent from "@/components/project-view/ProjectQuestionsSection";
import ProjectVideoSectionComponent from "@/components/project-view/ProjectVideoSection";
import PhotoInfoSectionComponent from "@/components/what-we-do/PhotoInfoSection";
import FaqAccordionSectionComponent from "@/components/what-we-do/FaqAccordionSection";

/**
 * Example: A `section` registry mapping Sanity `_type` values to React components.
 *
 * Notes:
 * - TypeScript support -> you can infer query return types from GROQD or use typegen output
 * - Components can be inlined (as shown) or imported from separate files for better organization
 * - Remember that async components are server components (won't work on the client)
 * - Missing or null fields should be handled within each component
 */
export const components: { [key: string]: ComponentType<any> } = {
  aboutSection: ({ item }: { item: AboutSection }) => <AboutSectionComponent item={item} />,
  sectionPost: async ({ item }: { item: PostsSection }) => {
    const locale = await getLocale();
    const latestPosts = q
      .parameters<{ locale: string }>()
      .star.filterByType("post")
      .filterBy("locale == $locale")
      .slice(0, item.displayNumber ?? 3)
      .order("publishedAt desc")
      .project((sub) => ({
        _id: sub.field("_id"),
        title: sub.field("title"),
        image: sub.field("image"),
        slug: sub.field("slug"),
      }));
    const { data } = await sanityFetch({ query: latestPosts.query, params: { locale } });
    const posts = latestPosts.parse(data);
    if (!posts) return <h2>No posts found.</h2>;
    return (
      <>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug?.current}`}>
            <h2>{post.title}</h2>
            <SanityImage image={post.image} height={300} width={300} />
          </Link>
        ))}
      </>
    );
  },
  projectsGallerySection: async ({ item }: { item: ProjectsGallerySection }) => {
    return <ProjectsGalleryWrapper item={item} />;
  },
  heroSection: ({ item }: { item: HeroSection }) => (
    <HeroSlider slides={item.slides ?? []} enabled={item.enabled} />
  ),
  heroBackgroundSection: ({ item }: { item: HeroBackgroundSection }) => (
    <HeroBackgroundSectionComponent item={item} />
  ),
  partnersSection: ({ item }: { item: PartnersSection }) => (
    <PartnersSectionComponent item={item} />
  ),
  testimonialsSection: ({ item }: { item: TestimonialsSection }) => (
    <TestimonialsSectionComponent item={item} />
  ),
  valuesSection: ({ item }: { item: ValuesSection }) => <ValuesSectionComponent item={item} />,
  whoWeAreSection: ({ item }: { item: WhoWeAreSection }) => (
    <WhoWeAreSectionComponent item={item} />
  ),
  whatWeDoSection: ({ item }: { item: WhatWeDoSection }) => (
    <WhatWeDoSectionComponent item={item} />
  ),
  ourHistorySection: ({ item }: { item: OurHistorySection }) => (
    <OurHistorySectionComponent item={item} />
  ),
  ourTeamSection: ({ item }: { item: OurTeamSection }) => <OurTeamSectionComponent item={item} />,
  documentsSection: ({ item }: { item: DocumentsSection }) => (
    <DocumentsSectionComponent item={item} />
  ),
  projectTitleSection: ({ item }: { item: ProjectTitleSection }) => (
    <ProjectTitleSectionComponent item={item} />
  ),
  projectFaqSection: ({ item }: { item: ProjectFaqSection }) => (
    <ProjectFaqSectionComponent item={item} />
  ),
  projectSignupSection: ({ item }: { item: ProjectSignupSection }) => (
    <ProjectSignupSectionComponent item={item} />
  ),
  projectPhotoInfoSection: ({ item }: { item: ProjectPhotoInfoSection }) => (
    <ProjectPhotoInfoSectionComponent item={item} />
  ),
  projectQuestionsSection: ({ item }: { item: ProjectQuestionsSection }) => (
    <ProjectQuestionsSectionComponent item={item} />
  ),
  projectVideoSection: ({ item }: { item: ProjectVideoSection }) => (
    <ProjectVideoSectionComponent item={item} />
  ),
  photoInfoSection: ({ item }: { item: PhotoInfoSection }) => (
    <PhotoInfoSectionComponent item={item} />
  ),
  faqAccordionSection: ({ item }: { item: FaqAccordionSection }) => (
    <FaqAccordionSectionComponent item={item} />
  ),
};
