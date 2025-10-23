export type Account = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  master?: boolean;
  voice: string;
  pitch: string;
  rate: string;
};

export type Personal = {
  firstName: string;
  lastName: string;
  email: string;
};

export type Settings = {
  voice: string;
  pitch: string;
  rate: string;
};

export type List = {
  title: string;
  acronym: string;
  grade: string;
  words: Word[];
  color: string;
};

export type Word = {
  word: string;
  definition: string;
};
