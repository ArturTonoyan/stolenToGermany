import map, { mapOfStolen, mapShort } from "../utils/mappers/ostarbaiter.js";
import prepareParams from "../utils/prepare-params.js";
import uplCtrl from "../controllers/uploads.js";
import Ostarbeiter, { City } from "../models/index.js";
import {
  AppErrorInvalid,
  AppErrorNotExist,
} from "../utils/error.js";
import axios from "axios";
import { Op } from "sequelize";
import turf from "turf";
import {booleanPointInPolygon} from "@turf/boolean-point-in-polygon";
import coordinates from "../config/coordinates.js";
  


export default {
  async get({ query }, res) {
    const { filters } = prepareParams(query, {
      allowedFilters: {
        surname: String,
        name: String,
        patronymic: String,
        date: String,
        localityWork: String,
        departure: String,
        dateDeparture: String,
        localityDeparture: String,
        start: String,
        end: String,
      },
    });


    let pageSize = Number(filters?.end - filters?.start) + 1;
    let offset = Number(filters?.start === '0' ? 0 : Number(filters?.start));

    if(!pageSize) pageSize=20
    if(!offset) offset=0

    const ostarbaiters = await Ostarbeiter.findAll({
      order: ["surname", "name", "patronymic"],
      where: {
        ...(filters.surname && {
          surname: { [Op.iLike]: `%${filters.surname}%` },
        }),
        ...(filters.name &&
            { name: { [Op.iLike]: `%${filters.name}%` }
        }),
        ...(filters.patronymic && {
          patronymic: { [Op.iLike]: `%${filters.patronymic}%` },
        }),
        ...(filters.date && { date: {[Op.like]: `%${filters.date}%`}}),
        ...(filters.localityWork && {
          localityWork: { [Op.iLike]: `%${filters.localityWork}%` },
        }),
        ...(filters.departure && {
          departure: { [Op.iLike]: `%${filters.departure}%` },
        }),
        ...(filters.dateDeparture && {
            dateDeparture: { [Op.iLike]: `%${filters.dateDeparture}%` },
        }),
        ...(filters.localityDeparture && {
          localityDeparture: { [Op.iLike]: `%${filters.localityDeparture}%` },
        }),
      },
      limit: pageSize,
      offset: offset,
    });

    if (!ostarbaiters) throw new AppErrorNotExist("ostarbaiters");

    const mapOstarbaiters = [];
    for (const ostarbaiter of ostarbaiters) {
      mapOstarbaiters.push(await mapShort(ostarbaiter));
    }

    res.json({
      ostarbaiters: mapOstarbaiters,
    });
  },

  async delete({ params: { ostarbaiterId } }, res) {
    const ostarbaiter = await Ostarbeiter.findByPk(ostarbaiterId);
    if (!ostarbaiter) throw new AppErrorNotExist("ostarbaiter");
    uplCtrl.deleteDirectrory(ostarbaiter);
    await ostarbaiter.destroy();
    res.json({ status: "Ok" });
  },

  async getById({ params: { ostarbaiterId } }, res) {
    const ostarbaiter = await Ostarbeiter.findByPk(ostarbaiterId);
    if (!ostarbaiter) throw new AppErrorNotExist("ostarbaiter");
    res.json({ ostarbaiter: await map(ostarbaiter) });
  },

  async update(
    {
      params: { ostarbaiterId },
      body: {
        name,
        surname,
        patronymic,
        date,
        profession,
        dateDeparture,
        localityWork,
        localityDeparture,
        departure,
        infoOfRepatriation,
        addressAfterReturning,
        infoOfDeath,
      },
    },
    res
  ) {
    if (localityWork) {
      let checkLocalityWork=false

      const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${localityWork}&format=json`
      );

      if (response.data && response.data.length > 0) {
        for (const data of response.data) {

          const {lat, lon} = data; // Get the first result's coordinates

          const point = turf.point([lon, lat]); // Создаем объект точки

          if (booleanPointInPolygon(point, coordinates[0]) || booleanPointInPolygon(point, coordinates[1]) || booleanPointInPolygon(point, coordinates[2])) {
            checkLocalityWork=true
            const city = await City.findOne({
              where: {
                lat: lat,
                lon: lon
              }
            })

            if (!city) await City.create({
              name: localityWork,
              lat: lat,
              lon: lon
            })
          }
        }
      }

      if(!checkLocalityWork) throw new AppErrorInvalid('localityWork')
    }

        const ostarbaiter = await Ostarbeiter.findByPk(ostarbaiterId);
        if (!ostarbaiter) throw new AppErrorNotExist("ostarbaiter");

        await ostarbaiter.update({
          surname: surname,
          name: name,
          patronymic: patronymic,
          date: date,
          profession: profession,
          dateDeparture: dateDeparture,
          localityWork: localityWork,
          localityDeparture: localityDeparture,
          departure: departure,
          infoOfRepatriation: infoOfRepatriation,
          addressAfterReturning: addressAfterReturning,
          infoOfDeath: infoOfDeath,
        });
        res.json({status: "Ok"});
      },

  async create(
    {
      body: {
        name,
        surname,
        patronymic,
        date,
        profession,
        dateDeparture,
        localityWork,
        localityDeparture,
        departure,
        infoOfRepatriation,
        addressAfterReturning,
        infoOfDeath,
      },
    },
    res
  ) {
    if (localityWork) {
      let checkLocalityWork=false
      const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${localityWork}&format=json`
      );

      if (response.data && response.data.length > 0) {
        for (const data of response.data) {

          const {lat, lon} = data; // Get the first result's coordinates

          const point = turf.point([lon, lat]); // Создаем объект точки

          if (booleanPointInPolygon(point, coordinates[0]) || booleanPointInPolygon(point, coordinates[1]) || booleanPointInPolygon(point, coordinates[2])) {
            checkLocalityWork=true
            const city = await City.findOne({
              where: {
                lat: lat,
                lon: lon
              }
            })

            if (!city) await City.create({
              name: localityWork,
              lat: lat,
              lon: lon
            })
          }
        }
      }
      if(!checkLocalityWork) throw  new AppErrorInvalid('localityWork')
    }

    await Ostarbeiter.create({
      surname: surname,
      name: name,
      patronymic: patronymic,
      date: date,
      profession: profession,
      dateDeparture: dateDeparture,
      localityWork: localityWork,
      localityDeparture: localityDeparture,
      departure: departure,
      infoOfRepatriation: infoOfRepatriation,
      addressAfterReturning: addressAfterReturning,
      infoOfDeath: infoOfDeath,
    });

    res.json({ status: "Ok" });
  },

  async stolenInCamps({ query }, res) {
    const { filters } = prepareParams(query, {
      allowedFilters: {
        localityWork: String,
      },
    });
    if (!filters.localityWork) {
      const cities = await City.findAll({});

      const camps = await Ostarbeiter.findAll({
        where: {
          localityWork: { [Op.ne]: null },
        },
      });

      const localityWork = cities.filter(
        (obj, index, self) =>
          index === self.findIndex((t) => t.name === obj.name)
      );


      const points = [];


      for (const city of localityWork) {
        let count = camps.filter(
          (ostarbaiter) =>
            ostarbaiter?.localityWork?.toUpperCase() === city.name.toUpperCase()
        ).length;
        points.push({
          locality: city.name,
          point: { pos: `${city.lat} ${city.lon}` },
          count: count,
        });

      }
      return res.json({ camps: points });
    }

    const { count, rows } = await Ostarbeiter.findAndCountAll({
      where: {
        localityWork: filters.localityWork,
      },
    });

    if (count < 1) throw new AppErrorNotExist("ostarbaiters");

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${filters?.localityWork}&format=json`
    );

    if (response?.length < 0) throw new AppErrorInvalid("localityWork");
    res.json({
      point: { pos: `${response.data[0].lat} ${response.data[0].lon}` },
      count: count,
      ostarbaiters: rows?.map(mapOfStolen),
    });
  },
};

