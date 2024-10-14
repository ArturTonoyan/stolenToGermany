import axios from "axios";
import {City} from "../models/index.js";
export default async function send(names, i){
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${names[i]}&format=json`);

    if (response.data && response.data.length > 0) {

        let lat, lon
        for (const data of response.data) {
            lat = data.lat
            lon = data.lon;

            if (lat > 35.0 && lat < 72.0 && lon > -25 && lon < 60) {

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