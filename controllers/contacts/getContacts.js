const { contactsServices } = require('../../services')

const getContacts = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const favorite = req.query.favorite || null
    const { _id: owner } = req.user
    let totalCount
    let results
    if (favorite !== null) {
        totalCount = await contactsServices.countContactsData({ owner, favorite })    
    } else {
        totalCount = await contactsServices.countContactsData({ owner })
    }
    const startIndex = (page - 1) * limit
    const totalPages = Math.ceil(totalCount / limit)
    if (favorite !== null) {
        results = await contactsServices.listContactsData({ owner, favorite }, startIndex, limit)
    } else {
        results = await contactsServices.listContactsData({ owner }, startIndex, limit)
    }

    res.json({
        results,
        totalCount,
        page,
        pages: totalPages
    })
}

module.exports = getContacts