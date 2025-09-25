const businessServices = require('../services/businessServices');
const clerkexpress = require("@clerk/express")


module.exports = {

    async getAll(req, res) {
        try {
            const getAllBusiness = await businessServices.getAllBusiness();
            res.status(200).json({
                getAllBusiness
            })


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async upsertEvent(req, res) {
         try {
            const { userId } = clerkexpress.getAuth(req);
                if (!userId) {
                  return res.status(401).json({ error: 'Not authenticated' });
                }
            const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
            const {uuid, title, description, start, end, google_map, address} = req.body 
            const upsertEvent = await businessServices.upsertEvent(uuid, username, title, description, start, end, google_map, address);
            
            if (!username) return res.status(404).json({ error: 'username required' });

            res.status(200).json({
                message: "Upserted Event"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteEvent(req, res) {
        try {
            const { userId } = clerkexpress.getAuth(req);
                if (!userId) {
                  return res.status(401).json({ error: 'Not authenticated' });
                }
            const username = (await clerkexpress.clerkClient.users.getUser(userId)).username
            const {uuid} = req.body
            const deleteEvent = await businessServices.deleteEvent(uuid, username)

            res.status(204).json({
                message: "Deleted Event"
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    async getEvents(req, res) {
        try {
            const {username} = req.params
            const getEvents = await businessServices.getEvents(username)

            res.status(200).json({getEvents})

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getBusinessInfo(req, res) {
        try {
            const {username} = req.params;
            const businessInfo = await businessServices.getBusinessInfo(username);
            if (!username) return res.status(404).json({ error: 'username required' });
            // console.log(businessInfo)
            res.status(200).json(businessInfo)
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async uploadBusinessImage(req, res) {
    try {
      const { userId } = clerkexpress.getAuth(req);
      if (!userId) return res.status(401).json({ error: 'Not authenticated' });

      const username = (await clerkexpress.clerkClient.users.getUser(userId))
        .username;
    //   const username = "kneadkopi";
      const { buffer, mimetype } = req.file;          // from multer
    //   console.log(username, buffer, mimetype)

      const data = await businessServices.uploadBusinessImage(
        username,
        buffer,
        mimetype,
      );

      return res.status(201).json(data);              // { path, publicUrl }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  /* GET /business/getBusinessImage/:username */
  async getBusinessImage(req, res) {
    try {
      const images = await businessServices.getBusinessImage(
        req.params.username,
      );
      return res.status(200).json(images);            // [url, url, …]
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async deleteBusinessImage(req, res) {
  try {
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    const username =
      (await clerkexpress.clerkClient.users.getUser(userId)).username;

    const { fileName } = req.body;
    if (!fileName)
      return res.status(400).json({ error: 'fileName required' });

    await businessServices.deleteBusinessImage(username, fileName);

    return res.status(204).json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
},

    // async checkBusinessEvent(req,res) {
    //     try {
    //         const username = "kneadkopi";
    //         const event_uuid = "90343e2e-0fd8-4ee2-b104-800d87c9b9b2";
    //         const check = await businessServices.checkBusinessEvent(username,event_uuid);
    //         console.log(check)
    //         return res.status(200).json(check);
    //     }
    //     catch (e) {
    //         return res.status(500).json({error: e.message})
    //         console.log(e)
    //     }
    // },


    async uploadEventImage(req, res) {
    try {
      const { userId } = clerkexpress.getAuth(req);
      if (!userId) return res.status(401).json({ error: 'Not authenticated' });

      const username = (await clerkexpress.clerkClient.users.getUser(userId))
        .username;
    //   const username = "kneadkopi";
      const { event_uuid } = req.params

      const check = await businessServices.checkBusinessEvent(username, event_uuid)
      // console.log(check)
      if (!check) {
      return res
        .status(403)
        .json({ error: 'You are not the owner of this event.' });
        }
      if (!req.file)
      {return res.status(400).json({ error: 'file field missing' });}

        const { buffer, mimetype } = req.file;

          const data = await businessServices.uploadEventImage(
        event_uuid,
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

 

  /* GET /business/getBusinessImage/:username */
  async getEventImage(req, res) {
    try {
        // console.log(req.params.event_uuid)
      const images = await businessServices.getEventImage(
        req.params.event_uuid,
      );
      return res.status(200).json(images);            // [url, url, …]
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async deleteEventImage(req, res) {
  try {
          const { userId } = clerkexpress.getAuth(req);
      if (!userId) return res.status(401).json({ error: 'Not authenticated' });

      const username = (await clerkexpress.clerkClient.users.getUser(userId))
        .username;
    //   const username = "kneadkopi";
      const { event_uuid } = req.params

      const check = await businessServices.checkBusinessEvent(username, event_uuid)

    const { fileName } = req.body;
    if (!fileName)
      return res.status(400).json({ error: 'fileName required' });

    await businessServices.deleteEventImage(event_uuid, fileName);

    return res.status(204).json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
},
  async countEvents(req, res) {
    try {
      const { username } = req.params;
      // console.log("hit")
      const count = await businessServices.countEvents(username);
      res.status(200).json(count);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

}
