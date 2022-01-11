import { Router } from "express";
import {
  createPhoto,
  getPhotos,
  getPhoto,
  deletePhoto,
  updatePhoto,
} from "../controllers/photo.controller";
import storage from "../libs/multer";

const router = Router();

router
  .route("/photos")
  .post(storage.single("image"), createPhoto)
  .get(getPhotos);

router.route("/photos/:id").get(getPhoto).delete(deletePhoto).put(updatePhoto);

export default router;
