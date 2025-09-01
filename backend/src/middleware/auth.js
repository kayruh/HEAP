const clerkexpress = require('@clerk/express');

// Ensures the request is authenticated and decorates req.auth with { userId, username }
async function requireAuthUsername(req, res, next) {
  try {
    const { userId } = clerkexpress.getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    // Cache username on the request to avoid repeating calls downstream
    if (!req.auth) req.auth = {};
    req.auth.userId = userId;

    if (!req.auth.username) {
      const user = await clerkexpress.clerkClient.users.getUser(userId);
      req.auth.username = user?.username || null;
    }

    if (!req.auth.username) return res.status(400).json({ error: 'Username unavailable' });
    return next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { requireAuthUsername };
