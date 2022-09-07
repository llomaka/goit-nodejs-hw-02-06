const { usersServices } = require('../../services')
const { RequestError } = require('../../helpers')
const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')

const updateAvatar = async (req, res) => {
    try {
        const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')
        const { path: tempUpload, filename } = req.file
        const { _id } = req.user
        const [extension] = filename.split('.').reverse()
        const avatarName = `${_id}.${extension}`
        const resultUpload = path.join(avatarsDir, avatarName)
        const image = await Jimp.read(tempUpload)
        image.cover(250, 250)
        await image.writeAsync(resultUpload)
        await fs.unlink(tempUpload)
        const avatarURL = path.join(req.headers.host, 'avatars', avatarName)
        const updatedUser = await usersServices.updateUserData(_id, { avatarURL })
        res.status(200).json({avatarURL: updatedUser.avatarURL})
    } catch (error) {
        await fs.unlink(req.file.path)
        throw RequestError(501, error.message)
    }
}

module.exports = updateAvatar