import express from "express";
const router = express.Router();
import databaseManager from "./databaseManager.js";
import directors from "./directors.js";
import audience from "./audience.js";

router.post("/databaseLogin",databaseManager.login );
router.post("/addAudience", databaseManager.addAudience);
router.post("/addDirector", databaseManager.addDirector);
router.post("/deleteAudience", databaseManager.deleteAudience);
router.post("/updatePlatformId", databaseManager.updatePlatformId);
router.get("/viewDirectors", databaseManager.viewDirectors);
router.post("/ratingAudience", databaseManager.ratingForAudience);
router.post("/movieRating", databaseManager.movieRating);
router.post("/directorMovies", databaseManager.directorMovies);

router.post("/directorLogin", directors.login);
router.post("/addMovie", directors.addMovie);
router.post("/addPred", directors.addPred);
router.post("/avlTheatres", directors.availableTheatres)
router.post("/ticketAudience", directors.ticketAudience)
router.post("/updateMovie", directors.updateMovie)
router.post("/allMovies", directors.allMovies)

router.post("/audienceLogin",audience.login);
router.get("/listMovies", audience.listMovie);
router.post("/buyTicket", audience.ticketBuying);
router.post("/rateMovie", audience.rateMovie);
router.post("/viewTickets", audience.viewTickets);



export default router;