import express from "express";

const router = express.Router();

//Get method in use
router.get("/", (req, res) =>{
    res.json({message: "This is the Get method reaced"})
});

//Post method in use
router.post("/", (req, res) =>{
    res.json({message: "This is the Post method reaced"})
});

//Put method in use
router.put("/", (req, res) =>{
    res.json({message: "This is the put method reaced"})
});

//Delete method in use
router.delete("/", (req, res) =>{
    res.json({message: "This is the delete method reaced"})
});
export default router;