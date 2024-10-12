import cdnUrl from "../cdn-url.js";
import { cdnUrlImg } from "../cdn-url.js";

export default async ostarbaiter=>({
    id: ostarbaiter.id,
    date: ostarbaiter?.date,
    surname: ostarbaiter?.surname,
    name: ostarbaiter?.name,
    patronymic: ostarbaiter?.patronymic,
    departure: ostarbaiter?.departure,
    profession: ostarbaiter?.profession,
    dateDeparture: ostarbaiter?.dateDeparture,
    localityDeparture: ostarbaiter?.localityDeparture,
    localityWork: ostarbaiter?.localityWork,
    infoOfDeath: ostarbaiter?.infoOfDeath,
    infoOfRepatriation: ostarbaiter?.infoOfRepatriation,
    addressAfterReturning: ostarbaiter?.addressAfterReturning,
    links: await cdnUrl(ostarbaiter),
    img: await cdnUrlImg(ostarbaiter) ?? null
});

export  async function mapShort(ostarbaiter) {
    return {
        id: ostarbaiter.id,
        date: ostarbaiter?.date,
        surname: ostarbaiter?.surname,
        name: ostarbaiter?.name,
        patronymic: ostarbaiter?.patronymic,
        localityDeparture: ostarbaiter?.localityDeparture,
        profession: ostarbaiter?.profession,
        img: await cdnUrlImg(ostarbaiter)  ?? null
    }
}


export function mapOfStolen(ostarbaiter){
    return {
        id: ostarbaiter.id,
        date: ostarbaiter.date,
        surname: ostarbaiter.surname,
        name: ostarbaiter?.name,
        patronymic: ostarbaiter?.patronymic,
        profession: ostarbaiter?.profession,
    }
}