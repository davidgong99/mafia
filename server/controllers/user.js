function onGetAllUsers(req, res) {
    return res.send(JSON.stringify({
        "response": ["bob", "alice"],
        "responseCode": 200
        }));
};
async function onGetUserById(req, res) { };
async function onCreateUser(req, res) { };
async function onDeleteUserById(req, res) { };

const user = {
  onGetAllUsers,
  onGetUserById,
  onCreateUser,
  onDeleteUserById,
};

export default user;