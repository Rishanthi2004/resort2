export interface ResortExperience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  maskClass: string;
  tag: string;
  details: {
    hours: string;
    setting: string;
    feature: string;
  };
}

export interface VillaFeature {
  id: string;
  title: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
}

export interface LocationPOI {
  id: string;
  name: string;
  type: string;
  x: number; // percentage on map
  y: number; // percentage on map
  coordinates: string;
  highlight: string;
  description: string;
}
