import express from "express";
import {
  createUrlHandler,
  getLinksAnalytics,
  getUrlHandler,
} from "../controllers/ShortUrl.controller";
import { validateResources } from "../middleware/validateResources";
import { createUrlSchema } from "../validationSchemas/createUrl.schema";

const router = express.Router();

router.get("/", getLinksAnalytics);

router.get("/:shortId", getUrlHandler);

router.post("/", validateResources(createUrlSchema), createUrlHandler);

export default router;
