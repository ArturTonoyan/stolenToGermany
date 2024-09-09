export interface Human {
  addressAfterReturning: string;
  date: string;
  dateDeparture: string;
  departure: string;
  id: string;
  img: string;
  infoOfDeath: string;
  infoOfRepatriation: string;
  links: any;
  localityDeparture: string;
  localityWork: string;
  name: string;
  patronymic: string;
  profession: string;
  surname: string;
}

type HumanDataKeys = keyof Human;
export interface HumanInfo {
  type: string;
  text: string;
  dataKey: HumanDataKeys;
}

export const humaInfo: HumanInfo[] = [
  {
    type: "scanPassport",
    text: "Год рождения — ",
    dataKey: "date" as keyof Human,
  },
  {
    type: "employmentHistory",
    text: "Профессия на момент отправки в Германию — ",
    dataKey: "profession" as keyof Human,
  },
  {
    type: "addressBeforeShipping",
    text: "Адрес проживания до угона на принудительные работы в Германию — ",
    dataKey: "departure" as keyof Human,
  },
  {
    type: "departureDate",
    text: "Дата угона на принудительные работы в Германию — ",
    dataKey: "dateDeparture" as keyof Human,
  },
  {
    type: "departure",
    text: "Населенный пункт откуда угнан на принудительные работы — ",
    dataKey: "localityDeparture" as keyof Human,
  },
  {
    type: "arrival",
    text: "Место трудоиспользования на принудительных работах в Германии — ",
    dataKey: "localityWork" as keyof Human,
  },
  {
    type: "deathInformation",
    text: "Дата, место и причина смерти на момент пребывания в Германии — ",
    dataKey: "infoOfDeath" as keyof Human,
  },
  {
    type: "repatriationInfo",
    text: "Дата и место репатриации — ",
    dataKey: "infoOfRepatriation" as keyof Human,
  },
  {
    type: "addressAfterShipping",
    text: "Адрес проживания после возвращения в СССР — ",
    dataKey: "addressAfterReturning" as keyof Human,
  },
];
