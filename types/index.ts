export type Account = {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  voice: string;
  pitch: string;
  rate: string;
};

export type Profile = {
  first_name: string;
  last_name: string;
  email: string;
};

export type Settings = {
  voice: string;
  pitch: string;
  rate: string;
};
