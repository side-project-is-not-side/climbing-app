import { ExternalLink } from "@shared/types";


export type TSectorUpdateInfo = {date: Date; name: string | null};

export type AroundGym = {
  id: number;
  latitude: number;
  longitude: number;
};

export type GetAroundBoulderingGymResponse = AroundGym[];

export type Location = {
  latitude: number;
  longitude: number;
};
export type Link = {
  scheme: string;
  link: string;
};
export type DurationTime = {
  startAt: string;
  endAt: string;
};

export type BusinessHours = {
  weekday: DurationTime;
  weekend: DurationTime;
};

export type GetSelectedBoulderingGymResponse = {
  id: number;
  name: string;
  roadNameAddress: string;
  upcomingSector: TSectorUpdateInfo;
  lastUpdatedSector: TSectorUpdateInfo;
  tags: string[];
};

export type GetBoulderingGymDetailResponse = {
  id: number;
  imageUrls: string[];
  name: string;
  upcomingSector: TSectorUpdateInfo;
  lastUpdatedSector: TSectorUpdateInfo;
  description: string;
  tags: string[];
  location: Location;
  roadNameAddress: string;
  instagram: Link;
  naver: Link;
  businessHours: BusinessHours;
};

export type GetNearestGymsRequest = {
  latitude: number;
  longitude: number;
  type: 'around';
};

export type GymInfo = {
  id: number;
  name: string;
  thumbnailImageUrl: string;
  roadNameAddress: string;
  lotNumberAddress: string;
  distance: number;
  latitude: number;
  longitude: number;
  tags: string[];
};

export type GetNearestGymsResponse = GymInfo[];

export type GetGymDetailResponse = {
  id: number;
  name: string;
  thumbnailImageUrl: string;
  tags: string[];
  description: string;
  businessHours: BusinessHours;
  roadNameAddress: string;
  distance: number;
  location: Location;
  naverMap: ExternalLink;
  instagram: ExternalLink;
  notice?: string;
};
