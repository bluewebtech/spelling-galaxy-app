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
  id?: number | null;
  title: string;
  acronym: string | null;
  grade: string | null;
  color: string | null;
  words: Word[];
  group: number | null;
};

export type Word = {
  word: string;
  definition: string | null;
};
