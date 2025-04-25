import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";


const router = express.Router();

//data sending post routes

router.post("/register", async (req, res) => {
    try {
        const { username, email, password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json( {message: "Email already exist"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        
        res.status(201).json({message: "User registered Successfully"});
    }
    catch(err) {
        res.status(500).json({message: err.message});
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
  
      console.log("Login successful");
      res.status(200).json({ message: "Login successful", user: { email: user.email, username: user.username } });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: err.message });
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

    router.patch("/profile", async (req, res) => {
      const { username, email } = req.body;

      try {
        const updatedUser = await User.findOneAndUpdate(
          { email},
          { username},
          {new: true}
        );
        if (!updatedUser) {
          return res.status(404).json({message: "User not found"});
        }

        res.json({
          message: "Username updated successfully",
          user: {
            email: updatedUser.email,
            username: updatedUser.username,
          }
        });
      } catch (err) {
        console.error("Error updating username:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    //GET profile details by email
    router.get("/profile", async (req, res) => {
      try {
        const {email} = req.query;

        if (!email) {
          return res.status(400).json({ message: "Email is required "});
        }

        const user = await User.findOne({ email });

        if (!user) {
          return res.status(404).json({ message: "User not found "});
        }

       res.status(200).json({
        email: user.email,
        username: user.username,
       });
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        res.status(200).json({ message: "Internal Server Error "});
      }
    });

export default router;