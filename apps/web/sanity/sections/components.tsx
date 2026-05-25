import type {
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
  PostsGallerySection,
  ProjectFaqSection,
  ProjectSignupSection,
  ProjectPhotoInfoSection,
  ProjectQuestionsSection,
  ProjectVideoSection,
  PhotoInfoSection,
  FaqAccordionSection,
  CooperationCardsSection,
  AboutStatsSection,
  TeacherBenefitsSection,
  TeacherEngagementSection,
  InstitutionBenefitsSection,
} from "@/sanity/typegen";
import ProjectsGalleryWrapper from "@/components/sections/project-list/ProjectsGalleryWrapper";
import PostsGalleryWrapper from "@/components/sections/post-list/PostsGalleryWrapper";
import { ComponentType } from "react";
import HeroSlider from "@/components/views/home/hero/HeroSlider";
import HeroBackgroundSectionComponent from "@/components/reusable/HeroBackgroundSection";
import AboutSectionComponent from "@/components/views/home/AboutSection";
import PartnersSectionComponent from "@/components/reusable/PartnersSection";
import TestimonialsSectionComponent from "@/components/reusable/TestimonialsSection";
import ValuesSectionComponent from "@/components/reusable/ValuesSection";
import WhoWeAreSectionComponent from "@/components/views/about/WhoWeAreSection";
import WhatWeDoSectionComponent from "@/components/views/about/WhatWeDoSection";
import OurHistorySectionComponent from "@/components/views/about/OurHistorySection";
import OurTeamSectionComponent from "@/components/views/about/OurTeamSection";
import DocumentsSectionComponent from "@/components/reusable/DocumentsSection";
import ProjectTitleSectionComponent from "@/components/views/project-view/ProjectTitleSection";
import ProjectFaqSectionComponent from "@/components/views/project-view/ProjectFaqSection";
import ProjectSignupSectionComponent from "@/components/views/project-view/ProjectSignupSection";
import ProjectPhotoInfoSectionComponent from "@/components/views/project-view/ProjectPhotoInfoSection";
import ProjectQuestionsSectionComponent from "@/components/views/project-view/ProjectQuestionsSection";
import ProjectVideoSectionComponent from "@/components/views/project-view/ProjectVideoSection";
import PhotoInfoSectionComponent from "@/components/reusable/PhotoInfoSection";
import FaqAccordionSectionComponent from "@/components/views/what-we-do/FaqAccordionSection";
import CooperationCardsSectionComponent from "@/components/views/cooperation/CooperationCardsSection";
import AboutStatsSectionComponent from "@/components/views/cooperation/AboutStatsSection";
import TeacherBenefitsSectionComponent from "@/components/views/cooperation/TeacherBenefitsSection";
import TeacherEngagementSectionComponent from "@/components/views/cooperation/TeacherEngagementSection";
import InstitutionBenefitsSectionComponent from "@/components/views/cooperation/InstitutionBenefitsSection";
import CooperationModelsSectionComponent from "@/components/views/cooperation/CooperationModelsSection";
import CoalitionSectionComponent from "@/components/views/cooperation/CoalitionSection";

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
  projectsGallerySection: async ({ item }: { item: ProjectsGallerySection }) => {
    return <ProjectsGalleryWrapper item={item} />;
  },
  postsGallerySection: async ({ item }: { item: PostsGallerySection }) => {
    return <PostsGalleryWrapper item={item} />;
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
  cooperationCardsSection: ({ item }: { item: CooperationCardsSection }) => (
    <CooperationCardsSectionComponent item={item} />
  ),
  aboutStatsSection: ({ item }: { item: AboutStatsSection }) => (
    <AboutStatsSectionComponent item={item} />
  ),
  teacherBenefitsSection: ({ item }: { item: TeacherBenefitsSection }) => (
    <TeacherBenefitsSectionComponent item={item} />
  ),
  teacherEngagementSection: ({ item }: { item: TeacherEngagementSection }) => (
    <TeacherEngagementSectionComponent item={item} />
  ),
  institutionBenefitsSection: ({ item }: { item: InstitutionBenefitsSection }) => (
    <InstitutionBenefitsSectionComponent item={item} />
  ),
  cooperationModelsSection: ({ item }: { item: any }) => (
    <CooperationModelsSectionComponent item={item} />
  ),
  coalitionSection: ({ item }: { item: any }) => <CoalitionSectionComponent item={item} />,
};
