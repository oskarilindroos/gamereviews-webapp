// Return the user's info based on ID
import { UserData } from "../../Types"
// TODO: Make actual API implmenetation

const getUserById = (id: string): UserData => {
    return {
        id,
        user_name: "user " + id,
        email: "test@user.com"
    }
}

export default getUserById