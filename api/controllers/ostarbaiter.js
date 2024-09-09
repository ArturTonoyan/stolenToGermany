import map, { mapOfStolen, mapShort } from "../utils/mappers/ostarbaiter.js";
import prepareParams from "../utils/prepare-params.js";
import uplCtrl from "../controllers/uploads.js";
import Ostarbeiter from "../models/index.js";
import {AppErrorInvalid, AppErrorMissing, AppErrorNotExist} from "../utils/error.js";
import axios from "axios";
import { Op } from "sequelize";
const validateLetter  = (str) => /^[А-ЯЁ-]+$/i.test(str)
const validateDeparture  = (str) => /^[А-ЯЁ.,-]+$/i.test(str)
const validateNumeric = (str) => /^(18[4-9][0-9]|19[0-3][0-9]|194[0-4])+$/i.test(str)
const validateLetterNumeric = (str) => /^[А-Яа-яЁё0-9.,;:!?\"'()\-—\s]+$/i.test(str)



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
    if (!surname || !validateLetter(surname)) throw new AppErrorMissing("surname");
    if (!date) throw new AppErrorMissing("date");
    if(date && !validateNumeric(date))  throw new AppErrorInvalid('date')
    if(name && !validateLetter(name)) throw  new AppErrorInvalid('name')
    if(patronymic && !validateLetter(patronymic)) throw  new AppErrorInvalid('patronymic')
    if(profession && !validateLetter(profession)) throw new AppErrorInvalid('profession')
    if(dateDeparture && !validateNumeric(dateDeparture)) throw new AppErrorInvalid('dateDeparture')
    if(localityWork) throw new AppErrorInvalid('localityWork')
    if(localityDeparture) throw new AppErrorInvalid('localityDeparture')
    if(addressAfterReturning) throw new AppErrorInvalid('addressAfterReturning')
    if(infoOfRepatriation && !validateLetterNumeric(infoOfRepatriation)) throw new AppErrorInvalid('infoOfRepatriation')
    if(infoOfDeath && !validateLetterNumeric(infoOfDeath)) throw new AppErrorInvalid('infoOfDeath')

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

    if (!surname || !validateLetter(surname)) throw new AppErrorMissing("surname");
    if (!date) throw new AppErrorMissing("date");
    if(date && !validateNumeric(date))  throw new AppErrorInvalid('date')
    if(name && !validateLetter(name)) throw  new AppErrorInvalid('name')
    if(patronymic && !validateLetter(patronymic)) throw  new AppErrorInvalid('patronymic')
    if(profession && !validateLetter(profession)) throw new AppErrorInvalid('profession')
    if(dateDeparture && !validateNumeric(dateDeparture) ) throw new AppErrorInvalid('dateDeparture')
    if(localityWork) throw new AppErrorInvalid('localityWork')
    if(localityDeparture) throw new AppErrorInvalid('localityDeparture')
    if(addressAfterReturning) throw new AppErrorInvalid('addressAfterReturning')
    if(infoOfRepatriation && !validateLetterNumeric(infoOfRepatriation)) throw new AppErrorInvalid('infoOfRepatriation')
    if(infoOfDeath && !validateLetterNumeric(infoOfDeath)) throw new AppErrorInvalid('infoOfDeath')

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
        attributes: ["localityWork"],
      });

      const points = [];
      try {
        for (const camp of camps) {
          if (camp?.localityWork) {
            const { data } = await axios({
              method: "get",
              url: `https://geocode-maps.yandex.ru/1.x/?apikey=488d7b02-e389-4817-b4e8-2a9729c0dce0&geocode=${camp.localityWork}&format=json`,
              responseType: "json",
            });

            const responseData= data.response.GeoObjectCollection?.featureMember?.
            filter((object) => object.GeoObject.metaDataProperty.GeocoderMetaData.kind === "locality")
            if(responseData.length > 0) {
             points.push({
                locality: camp.localityWork,
                point: Object(...responseData).GeoObject.Point,
              });
            }
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

    const { data } = await axios({
      method: "get",
      url: `https://geocode-maps.yandex.ru/1.x/?apikey=488d7b02-e389-4817-b4e8-2a9729c0dce0&geocode=${filters.localityWork}&format=json`,
      responseType: "json",
    });
    const responseData= data.response.GeoObjectCollection?.featureMember?.
    filter((object) => object.GeoObject.metaDataProperty.GeocoderMetaData.kind === "locality")
    if(responseData.length < 0) throw new AppErrorInvalid('localityWork')
    res.json({
      point:  Object(...responseData).GeoObject.Point,
      count: count,
      ostarbaiters: rows?.map(mapOfStolen),
    });
  },
};
