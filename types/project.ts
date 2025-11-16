// Shared type definition for Project
export interface ProjectTimelineItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  category?: string;
  link?: string;
}
