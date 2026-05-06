import User from "../models/user.js"

const getRandomUser = async () => {
  return await User.findOne()
}

export default { getRandomUser }
