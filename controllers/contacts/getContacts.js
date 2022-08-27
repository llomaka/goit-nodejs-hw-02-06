const { contactsServices } = require('../../services')

const getContacts = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const { _id } = req.user
    const totalCount = await contactsServices.countContactsData({ owner: _id })
    const startIndex = (page - 1) * limit
    const totalPages = Math.ceil(totalCount / limit)

    res.json({
        results: await contactsServices.listContactsData({ owner: _id }, startIndex, limit),
        page,
        pages: totalPages
    })
}

module.exports = getContacts