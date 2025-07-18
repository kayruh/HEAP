const interactionServices = require('../services/interactionServices');
const clerkexpress = require("@clerk/express")


/* ---------- Likes ---------- */
module.exports = {

async searchProfile(req, res) {
  try {
    const results = await interactionServices.searchProfile(req.params.query);
    return res.status(200).json(results);             // array (possibly empty)
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
},

//-----------------------------BUSINESS LIKES --------------------------------------
async insertLikeBusiness(req, res) {
  try {
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
    const { business_username } = req.body;
    const insertLikeBusiness = await interactionServices.insertLikeBusiness(username, business_username);
    
    res.status(200).json({ message: 'Like inserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteLikeBusiness(req, res) {
  try {
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
    const { business_username } = req.body;
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

async getBusinessLikeCheck(req, res) {
  try {
    const { username, business_username } = req.body;
    const check = await interactionServices.getBusinessLikeCheck(username, business_username);
    res.status(200).json(check);
  } catch (e) {
    const status = e.httpStatus || 500;
    // console.log(e.httpStatus)
    return res.status(status).json({ message: e.message });
  }
},

// ---------------------------------------LIKE EVENT  ----------------------------------------------

async insertLikeEvent(req, res) {
  try {
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
    const { event } = req.body;
    const insertLikeEvent = await interactionServices.insertLikeEvent(username, event);
    
    res.status(200).json({ message: 'Like inserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteLikeEvent(req, res) {
  try {
    const { event } = req.body;
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
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

async getEventLikeCheck(req, res) {
  try {
    const { username, event } = req.body;
    const check = await interactionServices.getEventLikeCheck(username, event);
    res.status(200).json(check);
  } catch (e) {
    const status = e.httpStatus || 500;
    // console.log(e.httpStatus)
    return res.status(status).json({ message: e.message });
  }
},


// async getAccountLikes(req, res) { // needs to be changed
//   try {
//     const { username } = req.body;
//     const likes = await interactionServices.getAccountLikes(username);
//     res.status(200).json(likes);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// },

/* ---------- Folders ---------- */
async insertFolder (req, res) {
  try {
    // console.log("hit")
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
    const {folder_name,saved,description} = req.body
    
    await interactionServices.insertFolder(username,folder_name,saved,description);
    res.status(201).json({ message: 'Folder created' });
  } catch (e) {
    const status = e.httpStatus || 500;
    // console.log(e.status)
    return res.status(status).json({ message: e.message });
  }
},
async updateFolder (req, res) {
  try {
    // console.log("hit")
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
    const {folder_name,saved,description} = req.body
    
    await interactionServices.updateFolder(username,folder_name,saved,description);
    res.status(200).json({ message: 'Folder updated' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteFolder(req, res) {
  try {
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
    const {folder_name } = req.body;
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
    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
    // const { username } = req.params;
    const folders = await interactionServices.getAccountFolders(username);
    res.status(200).json(folders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async getFolderInfo(req, res) {
  try {
    const {username, folder_name} = req.body
    // console.log(username, folder_name)
    const folderInfo = await interactionServices.getFolderInfo(username, folder_name);
    res.status(200).json(folderInfo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

},

/* ---------- Reviews ---------- */
async upsertReview(req, res) {
  try {
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
    const {uuid,business_username,review} = req.body
    const reviewInfo = await interactionServices.upsertReview(uuid,business_username,username,review);
    console.log(reviewInfo)
    res.status(200).json(reviewInfo);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
},

async deleteReview(req, res) {
  try {
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
    await interactionServices.deleteReview(req.body.uuid, username);
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

async getEventInfo(req, res) {
  try {
    const eventInfo = await interactionServices.getEventInfo(req.params.event);
    res.status(200).json(eventInfo)
  } catch (e) {
    res.status(500).json({ error: e.message})
  }
},

    async checkReviewer(req,res) {
        try {
            const username = "adrian";
            const review_uuid = "637e4e2c-e4ba-4c5d-b878-bd5fa3452ac7";
            const check = await interactionServices.checkReviewer(username,review_uuid);
            console.log(check)
            return res.status(200).json(check);
        }
        catch (e) {
            return res.status(500).json({error: e.message})
            console.log(e)
        }
    },


    async uploadReviewImage(req, res) {
    try {
      const { userId } = clerkexpress.getAuth(req);
      if (!userId) return res.status(401).json({ error: 'Not authenticated' });

      const username = (await clerkexpress.clerkClient.users.getUser(userId))
        .username;
      const { review_uuid } = req.params

      const check = await interactionServices.checkReviewer(username, review_uuid)
      // console.log(check)
      if (!check) {
      return res
        .status(403)
        .json({ error: 'You are not the owner of this review.' });
        }
      
      // console.log(req.file)

      if (!req.file)
      {return res.status(400).json({ error: 'file field missing' });}

        const { buffer, mimetype } = req.file;

          const data = await interactionServices.uploadReviewImage(
        review_uuid,
        buffer,
        mimetype,
        );

    /* 5. ── Done ─────────────────────────────────────────────────────── */
        return res.status(201).json(data);                // { path, publicUrl }
    } catch (err) {
        console.error(err);                               // helpful log
        return res.status(500).json({ error: err.message });
    }
    },

 


  async getReviewImage(req, res) {
    try {
        // console.log(req.params.review_uuid)
      const images = await interactionServices.getReviewImage(
        req.params.review_uuid,
      );
      return res.status(200).json(images);            // [url, url, …]
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async deleteReviewImage(req, res) {
  try {
          const { userId } = clerkexpress.getAuth(req);
      if (!userId) return res.status(401).json({ error: 'Not authenticated' });

      const username = (await clerkexpress.clerkClient.users.getUser(userId))
        .username;
      // const username = "adrian";
      const { review_uuid } = req.params

      const check = await interactionServices.checkReviewer(username, review_uuid)

    const { fileName } = req.body;
    if (!fileName)
      return res.status(400).json({ error: 'fileName required' });

    await interactionServices.deleteReviewImage(review_uuid, fileName);

    return res.status(204).json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
},

}