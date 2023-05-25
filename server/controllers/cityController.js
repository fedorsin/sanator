const {City, Item, BasketItem} = require('../models/models')
const ApiError = require('../error/ApiError')

class CityController {
    async create(req, res){
        const {name} = req.body
        const city = await City.create({name})
        return res.json(city)
    }
    async getAll(req, res){
        const cities = await City.findAll()
        return res.json(cities)
    }

    async delete(req, res){
        try {
            const {id} = req.params
            const city = await City.findOne({where: {id: id}})
            if(!city){
                throw ApiError.badRequest('This type does not exist')
            }
            const item = await Item.findOne({where: {cityId: city.id}})
            if(item){
                await Item.destroy({where:{cityId: city.id}})
                await BasketItem.destroy({where: {itemId: item.id}})
            }
            await city.destroy()
            return res.json({message: "Type deleted successfully"})
        } catch (e) {
            console.log(e)
            throw ApiError.badRequest('An unexpected error has occurred')
        }
    }

    async update(req, res){
        try {
            const {id} = req.params
            const {name} = req.body

            await City.findOne({where: {id}}).then(async data => {
                if(data){
                    let newCity ={}
                    name ? newCity.name = name : false

                    await City.update({...newCity}, {where:{id}}).then(() => {
                        return res.json('Type updated')
                    })
                } else {
                    return res.json('This type does not exist')
                }
            })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new CityController()