import axios from "axios";
import {City} from "../models/index.js";
export default async function send(names, i){
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${names[i]}&format=json`);

    if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0]; // Get the first result's coordinates
        const city=await City.findOne({
            where: {
                lat: lat,
                lon: lon
            }
        })
        if(!city) await City.create({ name: names[i], lat, lon });
    } else {
        console.warn(`No data found for ${names[i]}`);
    }
    i++

    if(i<names.length){
        setTimeout(() => send(names,i), 1000)
    }
}