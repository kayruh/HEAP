const clerkexpress = require('@clerk/express');

// Ensures the request is authenticated and stashes { userId, username } in req.authContext
async function requireAuthUsername(req, res, next) {
  try {
    const authInfo = typeof req.auth === 'function' ? req.auth() : clerkexpress.getAuth(req);
    const userId = authInfo?.userId;
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    const user = await clerkexpress.clerkClient.users.getUser(userId);
    const username = user?.username || null;
    if (!username) return res.status(400).json({ error: 'Username unavailable' });

    req.authContext = { userId, username };
    return next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { requireAuthUsername };
