const { contactsServices } = require('../../services')

const getContacts = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const favorite = req.query.favorite || null
    const { _id } = req.user
    let totalCount
    let results
    if (favorite !== null) {
        totalCount = await contactsServices.countContactsData({ owner: _id, favorite })    
    } else {
        totalCount = await contactsServices.countContactsData({ owner: _id })
    }
    const startIndex = (page - 1) * limit
    const totalPages = Math.ceil(totalCount / limit)
    if (favorite !== null) {
        results = await contactsServices.listContactsData({ owner: _id, favorite }, startIndex, limit)
    } else {
        results = await contactsServices.listContactsData({ owner: _id }, startIndex, limit)
    }

    res.json({
        results,
        totalCount,
        page,
        pages: totalPages
    })
}

module.exports = getContacts