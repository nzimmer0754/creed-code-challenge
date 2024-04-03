// this is the response from the API
export interface PodcastFilter {
  id: number;
  name: string;
  parent_id: number;
  podcasts: Podcast[];
  total: number;
  has_next: boolean;
  has_previous: boolean;
  page_number: number;
  previous_page_number: number;
  next_page_number: number;
  listennotes_url: string;
}

export interface Podcast {
  id: string;
  title: string;
  publisher: string;
  image: string;
  thumbnail: string;
  listennotes_url: string;
  total_episodes: number;
  explicit_content: boolean;
  description: string;
  itunes_id: number;
  rss: Email;
  latest_pub_date_ms: number;
  earliest_pub_date_ms: number;
  language: Language;
  country: Country;
  website: string;
  extra: Extra;
  is_claimed: boolean;
  email: Email;
  type: Type;
  looking_for: LookingFor;
  genre_ids: number[];
}

export enum Country {
  uk = 'United Kingdom',
  us = 'United States',
}

export enum Email {
  PleaseUpgradeToThePROPlanToSeeThisField = 'Please upgrade to the PRO plan to see this field',
}

export interface Extra {
  twitter_handle: string;
  facebook_handle: string;
  instagram_handle: string;
  wechat_handle: string;
  patreon_handle: string;
  youtube_url: string;
  linkedin_url: string;
  spotify_url: string;
  google_url: string;
  url1: string;
  url2: string;
  url3: string;
}

export enum Language {
  English = 'English',
}

export interface LookingFor {
  sponsors: boolean;
  guests: boolean;
  cohosts: boolean;
  cross_promotion: boolean;
}

export enum Type {
  Episodic = 'episodic',
}
