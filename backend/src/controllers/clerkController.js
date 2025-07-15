const clerkexpress = require("@clerk/express")


module.exports = {
  async getAvatar(req, res) {
    try {
    const { username } = req.params;        
    const { data: users } = await clerkexpress.clerkClient.users.getUserList({
      username: [username],                  
      limit: 1,
    });

    if (!users.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];                   

    return res.json({ avatarUrl: user.imageUrl });
  } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}