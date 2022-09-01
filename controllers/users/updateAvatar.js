const { usersServices } = require('../../services')
// const { RequestError } = require('../../helpers')
const path = require('path')
const fs = require('fs/promises')

const updateAvatar = async (req, res) => {
    try {
        console.log(req.baseUrl)
        const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')
        const { path: tempUpload, filename } = req.file
        const { _id } = req.user
        const [extension] = filename.split('.').reverse()
        const avatarName = `${_id}.${extension}`
        const resultUpload = path.join(avatarsDir, avatarName)
        await fs.rename(tempUpload, resultUpload)
        const avatarURL = path.join('avatars', resultUpload)
        console.log(avatarURL)
        const updatedUser = await usersServices.updateUserData(_id, { avatarURL })
        res.status(200).json({avatarURL: updatedUser.avatarURL})
    } catch (error) {
        await fs.unlink(req.file.path)
        error.status = 503
        return error
    }
}

module.exports = updateAvatar