import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../models/user.models";
import {
  comparePasswords,
  generateRandomString,
  hashPassword,
} from "../utils/password.utils";
import jwt from "jsonwebtoken";
import { Link } from "../models/link.models";
import { contentModel } from "../models/content.models";

export async function signUp(req: Request, res: Response) {
  const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(3, "Password too short")
      .max(10, "Password too long"),
  });

  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors,
    });
  }

  const { username, email, password } = result.data;

  try {
    const passwordHashed: string = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: passwordHashed,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: "User does not exist" });
  }

  // Compare plain password with hashed password
  const passwordMatch = await comparePasswords(password, existingUser.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: existingUser._id,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return res.status(200).json({ message: "Token sent", token });
}
export function logOut(req: Request, res: Response) {
  return res.status(200).json({ message: "Logout successful" });
}
export async function shareLink(req: Request, res: Response) {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: missing user data" });
    }

    const { share } = req.body;

    if (typeof share !== "boolean") {
      return res
        .status(400)
        .json({ message: "Invalid 'share' value; expected boolean" });
    }

    if (share) {
      const existingLink = await Link.findOne({ userId: req.user._id });

      if (existingLink) {
        existingLink.hash = generateRandomString(10);
        await existingLink.save();
        return res
          .status(200)
          .json({ message: "Link updated", hash: existingLink.hash });
      } else {
        const newLink = await Link.create({
          userId: req.user._id,
          hash: generateRandomString(10),
        });
        return res
          .status(201)
          .json({ message: "Link created", hash: newLink.hash });
      }
    } else {
      const result = await Link.deleteOne({ userId: req.user._id });
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "No existing share link to remove" });
      }
      return res.status(200).json({ message: "Link removed" });
    }
  } catch (error) {
    console.error("Error in shareLink:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function viewShare(req: Request, res: Response) {
  const hash = req.params.shareLink;
  console.log(hash);

  const link = await Link.findOne({ hash });
  if (!link) {
    return res.status(401).json({ message: "Sorry incorrect link" });
  }

  const content = await contentModel.find({ userId: link.userId });

  const user = await User.findById(link.userId);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  res.json({
    username: user.username,
    content,
  });
}
