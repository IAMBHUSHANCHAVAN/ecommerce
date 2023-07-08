import User from "../models/user.js";
// read
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getUserFriend = async (req, res) => {
    try {
        const id = req.params;
        const user = await User.findById(id)
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstname, lastname, occupation, location, picturepath }) => {
                return { _id, firstname, lastname, occupation, location, picturepath }
            }
        )
        res.send(200).json(formattedFriends)

    } catch (error) {
        res.send(400).json({ message: err.message })
    }
}

// update 
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id)
        const friend = await User.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id != friendId)
            friend.friends = user.friends.filter((id) => id != id)
        }
        else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save();
        await friend.save()
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstname, lastname, occupation, location, picturepath }) => {
                return { _id, firstname, lastname, occupation, location, picturepath }
            }
        )
        res.send(200).json(formattedFriends)
    } catch (error) {
        res.send(400).json({ message: err.message })
    }
}



