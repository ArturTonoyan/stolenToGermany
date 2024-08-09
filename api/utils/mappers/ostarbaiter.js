import cdnUrl from "../cdn-url.js";
import { cdnUrlImg } from "../cdn-url.js";

export default async ostarbaiter=>({
    id: ostarbaiter.id,
    date: ostarbaiter.date,
    fio: ostarbaiter.fio,
    address: ostarbaiter.address,
    departureDate: ostarbaiter.departureDate,
    departure: ostarbaiter.departure,
    arrival: ostarbaiter.arrival,
    links: await cdnUrl(ostarbaiter),
    img: cdnUrlImg(ostarbaiter)
});

export function mapShort(ostarbaiter){
    return {
        id: ostarbaiter.id,
        date: ostarbaiter.date,
        fio: ostarbaiter.fio,
        address: ostarbaiter.address,
        profession: ostarbaiter.profession,
        img: cdnUrlImg(ostarbaiter)
    }
}


export function mapOfStolen(ostarbaiter){
    return {
        id: ostarbaiter.id,
        date: ostarbaiter.date,
        fio: ostarbaiter.fio,
        profession: ostarbaiter.profession,
    }
}