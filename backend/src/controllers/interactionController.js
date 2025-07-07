/** interactionController.js
 *  Pure-JavaScript version (no TypeScript types)
 */
import * as interactionServices from '../services/interactionServices.js';

/* ---------- Likes ---------- */

export const upsertLike = async (req, res) => {
  try {
    const { clerk_id, business_clerk_id } = req.body;
    await interactionServices.upsertLike(clerk_id, business_clerk_id);
    res.status(200).json({ message: 'Like upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteLike = async (req, res) => {
  try {
    const { clerk_id, business_clerk_id } = req.body;
    const deleted = await interactionServices.deleteLike(clerk_id, business_clerk_id);
    if (!deleted) return res.status(404).json({ error: 'Like not found' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getAccountLikes = async (req, res) => {
  try {
    const { clerk_id } = req.params;
    const likes = await interactionServices.getAccountLikes(clerk_id);
    res.status(200).json(likes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getBusinessLikes = async (req, res) => {
  try {
    const { business_clerk_id } = req.params;
    const likes = await interactionServices.getBusinessLikes(business_clerk_id);
    res.status(200).json(likes);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/* ---------- Folders ---------- */

export const upsertFolder = async (req, res) => {
  try {
    await interactionServices.upsertFolder(req.body);
    res.status(200).json({ message: 'Folder upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { clerk_id, folder_name } = req.body;
    await interactionServices.deleteFolder(clerk_id, folder_name);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getAccountFolders = async (req, res) => {
  try {
    const { clerk_id } = req.params;
    const folders = await interactionServices.getAccountFolders(clerk_id);
    res.status(200).json(folders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/* ---------- Photos ---------- */

export const upsertPhotos = async (req, res) => {
  try {
    await interactionServices.upsertPhotos(req.body);
    res.status(200).json({ message: 'Photo upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deletePhotos = async (req, res) => {
  try {
    await interactionServices.deletePhotos(req.params.uuid);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getAccountPhotos = async (req, res) => {
  try {
    const photos = await interactionServices.getAccountPhotos(req.params.clerk_id);
    res.status(200).json(photos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getBusinessPhotos = async (req, res) => {
  try {
    const photos = await interactionServices.getBusinessPhotos(req.params.business_clerk_id);
    res.status(200).json(photos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/* ---------- Reviews ---------- */

export const upsertReviews = async (req, res) => {
  try {
    await interactionServices.upsertReviews(req.body);
    res.status(200).json({ message: 'Review upserted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteReviews = async (req, res) => {
  try {
    await interactionServices.deleteReviews(req.params.uuid);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getAccountReviews = async (req, res) => {
  try {
    const reviews = await interactionServices.getAccountReviews(req.params.clerk_id);
    res.status(200).json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getBusinessReviews = async (req, res) => {
  try {
    const reviews = await interactionServices.getBusinessReviews(req.params.business_clerk_id);
    res.status(200).json(reviews);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
