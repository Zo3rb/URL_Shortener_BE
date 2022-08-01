import { Request, Response, NextFunction } from "express";
import ShortUrlModel from "../models/ShortUrl.model";
import AnalyticModel from "../models/Analytic.model";

export async function createUrlHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { destination } = req.body;

    const newShortUrl = await ShortUrlModel.create({ destination });
    await AnalyticModel.create({ shortLinkId: newShortUrl._id });

    return res.status(201).json({
      success: true,
      data: {
        newShortUrl,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
}

export async function getUrlHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { shortId } = req.params;

    const shortUrl = await ShortUrlModel.findOne({ shortId });
    await AnalyticModel.findOneAndUpdate(
      { shortLinkId: shortUrl?._id },
      { $inc: { visited: 1 } }
    ).exec();

    if (!shortUrl) {
      return res.status(404).json({
        success: false,
        error: "Link Was Not Found",
      });
    }

    return res.redirect(shortUrl.destination);
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
}

export async function getLinksAnalytics(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const analytics = await AnalyticModel.find({}).populate("shortLinkId");

    if (analytics.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Success But No Analytics Created Yet",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        analytics,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
}
