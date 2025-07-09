const interactionServices = require('../services/interactionServices');

/* ---------- Likes ---------- */
module.exports = {
async upsertLike(req, res) {
  try {
    const { username, business_username } = req.body;
    await interactionServices.upsertLike(username, business_username);
    res.status(200).json({ message: 'Like upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteLike(req, res) {
  try {
    const { username, business_username } = req.body;
    const deleted = await interactionServices.deleteLike(username, business_username);
    if (!deleted) return res.status(404).json({ error: 'Like not found' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getAccountLikes(req, res) {
  try {
    const { username } = req.params;
    const likes = await interactionServices.getAccountLikes(username);
    res.status(200).json(likes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getBusinessLikes(req, res) {
  try {
    const { business_username } = req.params;
    const likes = await interactionServices.getBusinessLikes(business_username);
    res.status(200).json(likes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

/* ---------- Folders ---------- */
async upsertFolder (req, res) {
  try {
    const {username,folder_name,saved} = req.body
    
    await interactionServices.upsertFolder(username,folder_name,saved);
    res.status(200).json({ message: 'Folder upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteFolder(req, res) {
  try {
    const { username, folder_name } = req.body;
    await interactionServices.deleteFolder(username, folder_name);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getAccountFolders(req, res) {
  try {
    const { username } = req.params;
    const folders = await interactionServices.getAccountFolders(username);
    res.status(200).json(folders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

/* ---------- Reviews ---------- */
async upsertReview(req, res) {
  try {
    const {uuid,business_username,username,photo,review} = req.body
    await interactionServices.upsertPhotos(uuid,business_username,username,photo,review);
    res.status(200).json({ message: 'Review upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteReview(req, res) {
  try {
    await interactionServices.deletePhotos(req.params.uuid);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getAccountReviews(req, res) {
  try {
    const reviews = await interactionServices.getAccountPhotos(req.params.username);
    res.status(200).json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getBusinessReviews(req, res) {
  try {
    const reviews = await interactionServices.getBusinessPhotos(req.params.business_username);
    res.status(200).json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

}