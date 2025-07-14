const interactionServices = require('../services/interactionServices');
const clerkexpress = require("@clerk/express")


/* ---------- Likes ---------- */
module.exports = {
async upsertLikeBusiness(req, res) {
  try {
    const { username, business_username } = req.body;
    const upsertLikeBusiness = await interactionServices.upsertLikeBusiness(username, business_username);
    
    res.status(200).json({ message: 'Like upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteLikeBusiness(req, res) {
  try {
    const { username, business_username } = req.body;
    const deleted = await interactionServices.deleteLikeBusiness(username, business_username);
    if (!deleted) return res.status(404).json({ error: 'Like not found' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getBusinessLikeCount(req, res) {
  try {
    const { business_username } = req.params;
    const likes = await interactionServices.getBusinessLikeCount(business_username);
    res.status(200).json(likes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async upsertLikeEvent(req, res) {
  try {
    const { username, event } = req.body;
    const upsertLikeEvent = await interactionServices.upsertLikeEvent(username, event);
    
    res.status(200).json({ message: 'Like upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteLikeEvent(req, res) {
  try {
    const { username, event } = req.body;
    const deleted = await interactionServices.deleteLikeEvent(username, event);
    if (!deleted) return res.status(404).json({ error: 'Like not found' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getEventLikeCount(req, res) {
  try {
    const { event } = req.params;
    const likes = await interactionServices.getEventLikeCount(event);
    res.status(200).json(likes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},


async getAccountLikes(req, res) {
  try {
    const { username } = req.body;
    const likes = await interactionServices.getAccountLikes(username);
    res.status(200).json(likes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

/* ---------- Folders ---------- */
async upsertFolder (req, res) {
  try {
    const {username,folder_name,saved,description} = req.body
    
    await interactionServices.upsertFolder(username,folder_name,saved,description);
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
    
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // then lookup the Clerk user to get their username

    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
    // const { username } = req.params;
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
    await interactionServices.upsertReview(uuid,business_username,username,photo,review);
    res.status(200).json({ message: 'Review upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteReview(req, res) {
  try {
    await interactionServices.deleteReview(req.params.uuid);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getAccountReviews(req, res) {
  try {
    const reviews = await interactionServices.getAccountReviews(req.params.username);
    res.status(200).json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getBusinessReviews(req, res) {
  try {
    const reviews = await interactionServices.getBusinessReviews(req.params.business_username);
    res.status(200).json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

}