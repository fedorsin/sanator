const Router = require('express')
const router = new Router()
const itemRouter = require('./itemRouter')
const typeRouter = require('./typeRouter')
const cityRouter = require('./cityRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const ratingRouter = require('./ratingRouter')

router.use('/user', userRouter)
router.use('/item', itemRouter)
router.use('/type', typeRouter)
router.use('/city', cityRouter)
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)


module.exports = router