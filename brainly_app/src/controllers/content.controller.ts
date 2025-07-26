import { Request, Response } from "express";
import { contentModel } from "../models/content.models";
import { tagModel } from "../models/tags.models";

export async function createContent(req: Request, res: Response) {
  const { title, link, type, tags } = req.body;
  console.log(req.body);
  if (!title || !link || !type || !tags) {
    return res.status(400).json({
      message:
        "Title, link and valid type ('youtube' or 'twitter') and Tags are required.",
    });
  }

  try {
    const tagIds = [];
    for (const tagName of tags) {
      const normalizedTagName = tagName.toLowerCase().trim();

      let tag = await tagModel.findOne({ name: normalizedTagName });

      if (!tag) {
        tag = await tagModel.create({ name: normalizedTagName });
      }
      tagIds.push(tag._id);
    }
    await contentModel.create({
      title,
      link,
      type,
      tags: tagIds,
      userId: req.user._id,
    });
    return res.status(201).json({ message: "content created successful" });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Server error: " + error.message });
  }
}

export async function getContent(req: Request, res: Response) {
  console.log("inside get content");
  const userId = req.user._id;
  const content = await contentModel
    .find({
      userId: userId,
    })
    .populate("userId", "username")
    .populate("tags", "name");
  res.status(201).json({
    content,
  });
}

export async function deleteContent(req: Request, res: Response) {
  try {
    const contentId = req.params.id;
    const userId = req.user._id;

    const result = await contentModel.deleteOne({
      _id: contentId,
      userId: userId,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Content not found or unauthorized" });
    }

    return res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
