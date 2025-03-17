export type ValueOf<T> = T[keyof T];

export type ExternalLink = {
  scheme: string;
  link: string;
};

export type File = {
  url: string;
  fileName: string;
  date: Date;
};
