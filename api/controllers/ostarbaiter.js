import map, { mapOfStolen, mapShort } from "../utils/mappers/ostarbaiter.js";
import prepareParams from "../utils/prepare-params.js";
import uplCtrl from "../controllers/uploads.js";
import Ostarbeiter from "../models/index.js";
import {AppErrorInvalid, AppErrorMissing, AppErrorNotExist} from "../utils/error.js";
import axios from "axios";
import { Op } from "sequelize";



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
      },
    });

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
    if (!surname) throw new AppErrorMissing("surname");
    if (!date) throw new AppErrorMissing("date");


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
    res.json({ status: "Ok" });
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

    if (!surname) throw new AppErrorMissing("surname");
    if (!date) throw new AppErrorMissing("date");

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
      const camps = await Ostarbeiter.findAll({
        where: {
          localityWork: { [Op.ne]: null },
        },
      });



      for (const camp of camps) {
        camp.localityWorkUpdate= camp.localityWork.split(' ')[1] !== undefined ? camp.localityWork.split(' ')[1] : camp.localityWork.split(' ')[0]
      }

      const localityWork=new Set(camps.filter(camp=>camp.localityWorkUpdate).map(c=> c.localityWorkUpdate))

      const points = [];
      try {
        for (const camp of localityWork) {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${camp}&format=json`);

            let count = camps.filter(ostarbaiter=>ostarbaiter?.localityWorkUpdate?.toUpperCase() === camp.toUpperCase()).length

            if(response?.data.length > 0) {
             points.push({
                locality: camp,
                point: { pos: `${response.data[0].lat} ${response.data[0].lon}` },
                count: count
              });
            }
          }
      } catch (e) {
        console.log(e);
      }
      return res.json({ camps: points });
    }

    const { count, rows } = await Ostarbeiter.findAndCountAll({
      where: {
        localityWork: { [Op.iLike]: `%${filters.localityWork}%` },
      },
    });

    if (count < 1) throw new AppErrorNotExist("ostarbaiters");

    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${filters?.localityWork}&format=json`);

    if(response?.length < 0) throw new AppErrorInvalid('localityWork')
    res.json({
      point: { pos: `${response.data[0].lat} ${response.data[0].lon}` },
      count: count,
      ostarbaiters: rows?.map(mapOfStolen),
    });
  },
};
