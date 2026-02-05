import express from "express";
import { addtoWatchlist, removeFromWatchlist, updateWatchlistItem } from "../controller/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js"
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

//Authintication middleware
router.use(authMiddleware);
//Addwatchlist routing.
router.post("/", validateRequest(addToWatchlistSchema), addtoWatchlist);

//Route for delete
router.delete("/:id", authMiddleware, removeFromWatchlist);

//Router for update
router.put("/:id", authMiddleware, updateWatchlistItem);

export default router;