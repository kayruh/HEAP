const interactionServices = require('../services/interactionServices');

/* ---------- Likes ---------- */
module.exports = {
async upsertLike(req, res) {
  try {
    const { clerk_id, business_clerk_id } = req.body;
    await interactionServices.upsertLike(clerk_id, business_clerk_id);
    res.status(200).json({ message: 'Like upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteLike(req, res) {
  try {
    const { clerk_id, business_clerk_id } = req.body;
    const deleted = await interactionServices.deleteLike(clerk_id, business_clerk_id);
    if (!deleted) return res.status(404).json({ error: 'Like not found' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getAccountLikes(req, res) {
  try {
    const { clerk_id } = req.params;
    const likes = await interactionServices.getAccountLikes(clerk_id);
    res.status(200).json(likes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getBusinessLikes(req, res) {
  try {
    const { business_clerk_id } = req.params;
    const likes = await interactionServices.getBusinessLikes(business_clerk_id);
    res.status(200).json(likes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

/* ---------- Folders ---------- */
async upsertFolder (req, res) {
  try {
    const {clerk_id,folder_name,saved} = req.body
    
    await interactionServices.upsertFolder(clerk_id,folder_name,saved);
    res.status(200).json({ message: 'Folder upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteFolder(req, res) {
  try {
    const { clerk_id, folder_name } = req.body;
    await interactionServices.deleteFolder(clerk_id, folder_name);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getAccountFolders(req, res) {
  try {
    const { clerk_id } = req.params;
    const folders = await interactionServices.getAccountFolders(clerk_id);
    res.status(200).json(folders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

/* ---------- Photos ---------- */
async upsertPhotos(req, res) {
  try {
    const {uuid,business_clerk_id,clerk_id,photo} = req.body
    await interactionServices.upsertPhotos(uuid,business_clerk_id,clerk_id,photo);
    res.status(200).json({ message: 'Photo upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deletePhotos(req, res) {
  try {
    await interactionServices.deletePhotos(req.params.uuid);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getAccountPhotos(req, res) {
  try {
    const photos = await interactionServices.getAccountPhotos(req.params.clerk_id);
    res.status(200).json(photos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getBusinessPhotos(req, res) {
  try {
    const photos = await interactionServices.getBusinessPhotos(req.params.business_clerk_id);
    res.status(200).json(photos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

/* ---------- Reviews ---------- */
async upsertReviews(req, res) {
  try {
    const {uuid, business_clerk_id, clerk_id, review} = req.body
    await interactionServices.upsertReviews(uuid, business_clerk_id, clerk_id, review);
    res.status(200).json({ message: 'Review upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteReviews(req, res) {
  try {
    await interactionServices.deleteReviews(req.params.uuid);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getAccountReviews(req, res) {
  try {
    const reviews = await interactionServices.getAccountReviews(req.params.clerk_id);
    res.status(200).json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getBusinessReviews(req, res) {
  try {
    const reviews = await interactionServices.getBusinessReviews(req.params.business_clerk_id);
    res.status(200).json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
}