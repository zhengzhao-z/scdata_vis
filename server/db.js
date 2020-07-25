
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://zz:123456zr@121.89.218.162/scdata?authSource=scdata',{ useNewUrlParser: true,useUnifiedTopology: true })


const G5zd = mongoose.model('my2g3g',new mongoose.Schema(),'G5zd')

module.exports = {G5zd}