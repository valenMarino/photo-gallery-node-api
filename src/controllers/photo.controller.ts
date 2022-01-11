import { Request, Response } from "express";
import Photo from "../models/Photo";
import path from "path";
import fs from "fs-extra";

export async function createPhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { title, description } = req.body;

  const newPhoto = {
    title: title,
    description: description,
    imagePath: req.file?.path,
  };

  const photo = new Photo(newPhoto);
  await photo.save();

  return res.send({
    message: "Photo successfully saved",
    photo,
  });
}

export async function getPhoto(req: Request, res: Response): Promise<Response> {
  const photo = await Photo.findById(req.params.id);
  return res.send(photo);
}

export async function getPhotos(
  req: Request,
  res: Response
): Promise<Response> {
  const photos = await Photo.find();
  return res.send(photos);
}

export async function deletePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const photo = await Photo.findByIdAndRemove(id);

  if (photo) {
    await fs.unlink(path.resolve(photo.imagePath));
  }

  return res.send({
    message: "Photo successfully deleted",
    photo,
  });
}

export async function updatePhoto(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedPhoto = await Photo.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    { new: true, useFindAndModify: false }
  );

  return res.send({
    message: "Photo successfully updated",
    updatedPhoto,
  });
}
