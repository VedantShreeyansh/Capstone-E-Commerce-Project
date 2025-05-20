import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import products from "../data/product.js";
import { authenticateToken, authorizeRoles } from "../Middleware/Auth.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

//data sending post routes

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role = "buyer" } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//login waala route

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login Request:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //Generate JWT Token
    const token = jwt.sign(
       {email: user.email, username: user.username},
       "your_jwt_secret_key",
        {expiresIn: '1h'}
      );

    // Set the token as an HTTP-only cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    console.log("Login successful");
    res.status(200).json({
        message: "Login successful",
        user: { email: user.email, username: user.username, role: user.role },
      });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//TODO.....Most Important
// You have to add one more route for edit the username and store it in MongoDB

// router.patch("/profile", async (req, res) => {
//   try {
//     const { email, password, newUsername } = req.body;

//     console.log("PATCH /profile Request Body:", { email, password, newUsername });

//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found");
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Invalid credentials for email", email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     user.username = newUsername;
//     await user.save();

//     console.log("Username updated successfully");
//     res.status(200).json({ message: "Username updated successfully", username: user.username });
//   } catch (err) {
//     console.error("Error during username update:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const email = req.user?.email; // ✅ fetched by authenticateToken middleware

    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      email: user.email,
      username: user.username,
      profilePic: user.profilePic || null,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



//GET profile details by email
router.patch("/profile", async (req, res) => {
  const { email, username } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    await user.save();

    res.status(200).json({ message: "Username updated successfully", username: user.username });
  } catch (err) {
    console.error("Error updating username:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/upload-pic", upload.single("profilePic"), async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const profilePicUrl = `/uploads/${req.file.filename}`;

    const user = await User.findOneAndUpdate(
      { email },
      { profilePic: profilePicUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile Pic uploaded successfully",
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.error("Error uploading profile picture: ", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// router.get("/:id", (req, res) => {
//   const productId = parseInt(req.params.id, 10);
//   const product = products.find((p) => p.id === productId);

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   res.json(product);
// });

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully "});
});

router.get("/admin/dashboard", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome to the Admin Dashboard "});
});

router.get("/seller/dashboard", authenticateToken, authorizeRoles("seller"), (req, res) => {
  res.status(200).json({ message: "Welcome to the Seller Dashboard"});
});

router.get("/buyer/dashboard", authenticateToken, authorizeRoles("buyer"), (req, res) => {
  res.status(200).json({ message: "Welcome to the Buyer Dashboard" });
});

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
   });


export default router;
