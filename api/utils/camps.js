import axios from "axios";
import coordinates from "../config/coordinates.js";
import {City} from "../models/index.js";
import turf  from 'turf';
import { booleanPointInPolygon } from '@turf/boolean-point-in-polygon'
export default async function send(names, i){
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${names[i]}&format=json`);

    if (response.data && response.data.length > 0) {

        let lat, lon
        for (const data of response.data) {
            lat = data.lat
            lon = data.lon;

            const point = turf.point([lon, lat]); // Создаем объект точки

                if(booleanPointInPolygon(point, coordinates[0]) || booleanPointInPolygon(point, coordinates[1]) || booleanPointInPolygon(point, coordinates[2])){
                    const city = await City.findOne({
                        where: {
                            lat: lat,
                            lon: lon
                        }
                    })
                    if (!city) await City.create({name: names[i], lat, lon});
                    break;

            }
        }
    } else {
        console.warn(`No data found for ${names[i]}`);
    }
    i++

    if(i<names.length){
        setTimeout(() => send(names,i), 1000)
    }
}