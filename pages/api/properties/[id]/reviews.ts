// pages/api/properties/[id]/reviews.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing property ID" });
  }

  try {
    const options = {
      method: "GET",
      url: "https://airbnb-listings.p.rapidapi.com/v2/listingReviews",
      params: {
        id: id.toString(),
        // RapidAPI requires a date_time param, set to "now" or fixed value
        date_time: new Date().toISOString().slice(0, 19).replace("T", " "), //or '2023-01-11 10:52:50'
      },
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY as string, 
        "x-rapidapi-host": "airbnb-listings.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    // Map API response into simplified review objects
    const reviews = response.data?.data?.map((review: any) => ({
      id: review.id,
      reviewer: review.reviewer?.name || "Anonymous",
      rating: review.rating || 0,
      comments: review.comments || "",
      date: review.created_at || null,
    })) || [];

    res.status(200).json(reviews);
  } catch (error: any) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ error: "Failed to fetch property reviews" });
  }
}
