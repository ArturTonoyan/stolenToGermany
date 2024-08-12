
import map, {mapOfStolen, mapShort} from '../utils/mappers/ostarbaiter.js'
import prepareParams from "../utils/prepare-params.js";
import Ostarbeiter from "../models/index.js";
import {AppErrorMissing, AppErrorNotExist} from "../utils/error.js";
import axios from 'axios'
import { Op} from "sequelize";

export default {
    async get({ query }, res){
        const {  filters } = prepareParams(query, {
            allowedFilters: {
                surname: String,
                name: String,
                patronymic: String,
                date: String,
                address:String,
                departureDate: String,
                departure: String,
                arrival: String,
            },
        });


        const fulname=[filters.surname, filters.name, filters.patronymic].filter(c=>c).join(' ')
        const ostarbaiters=await Ostarbeiter.findAll({
            order: ['fio'],
            where: {
                ...(fulname && { fio: {[Op.like]:`% ${fulname} %`  }}),
                ...(filters.date && { date: new Date(filters.date)}),
                ...(filters.address && { address: {[Op.like]:`%${filters.address}`}}),
                ...(filters.departureDate && {departureDate: new Date(filters.departureDate)}),
                ...(filters.departure && {departure: {[Op.like]:`%${filters.departure}`}}),
                ...(filters.arrival && {arrival: {[Op.like]: `%${filters.arrival}`}}),
            },
        })
        if(!ostarbaiters) throw new AppErrorNotExist('ostarbaiters')

        res.json({
            ostarbaiters: ostarbaiters.map(mapShort)
        })
    },

    async delete({ params: { ostarbaiterId } }, res){
        const ostarbaiter=await Ostarbeiter.findByPk(ostarbaiterId)
        if(!ostarbaiter) throw new AppErrorNotExist('ostarbaiter')
        await ostarbaiter.destroy();
        res.json({ status: 'Ok' })
    },

    async getById({ params: { ostarbaiterId } }, res){
        const ostarbaiter=await Ostarbeiter.findByPk(ostarbaiterId)
        if(!ostarbaiter) throw new AppErrorNotExist('ostarbaiter')
        res.json({ostarbaiter:  await map(ostarbaiter)})
    },

    async update({params: { ostarbaiterId }, body: {date, profession,arrival, departure, address, repatr, addressAfter, infoDeath  }},res){


        const ostarbaiter=await Ostarbeiter.findByPk(ostarbaiterId)
        if(!ostarbaiter) throw new AppErrorNotExist('ostarbaiter')

        await ostarbaiter.update({
            date: date,
            profession: profession,
            arrival: arrival,
            departure: departure,
            address: address,
        })
        res.json({status: 'Ok'})
    },

    async create({body: { name, surname, patronymic, date, profession, arrival, departure, address, repatr, addressAfter, infoDeath  } },res){
        if(!name) throw new AppErrorMissing('name');
        if(!surname) throw new AppErrorMissing('surname')
        const fulname=[surname, name, patronymic].filter(c=>c).join(' ')
        const ostarbaiter=await Ostarbeiter.create({
            fio: fulname,
            date: date,
            profession: profession,
            arrival: arrival,
            departure: departure,
            address: address,
        })

        res.json({status: 'Ok'})

    },

    async stolenInCamps( { query }, res){
        const {  filters } = prepareParams(query, {
            allowedFilters: {
                city: String,
            },
        });
        if(!filters.city) throw new AppErrorMissing('city')
        const ostarbaiters=await Ostarbeiter.findAll({
            where: {
                arrival: filters.city,
            }
        })

        const {data }=await axios({
            method: 'get',
            url: `https://geocode-maps.yandex.ru/1.x/?apikey=488d7b02-e389-4817-b4e8-2a9729c0dce0&geocode=${filters.city}&format=json`,
            responseType: 'json'
        })
        const [{ ...feature  }]=data.response.GeoObjectCollection.featureMember
            .filter(object => object.GeoObject.metaDataProperty.GeocoderMetaData.kind==='locality')

        res.json({
            point: feature.GeoObject.Point,
            ostarbaiters: ostarbaiters?.map(mapOfStolen)
        })
    },
}