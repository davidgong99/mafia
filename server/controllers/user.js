export default {
    onGetAllUsers: (req, res) => {
        return JSON.stringify(["bob", "alice"])
    },
    onGetUserById: async (req, res) => { },
    onCreateUser: async (req, res) => { },
    onDeleteUserById: async (req, res) => { },
}