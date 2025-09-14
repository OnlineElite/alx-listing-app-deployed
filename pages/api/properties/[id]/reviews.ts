// pages/api/properties/[id]/reviews.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import avatar from "@/public/assets/images/avatar.jpg"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing property ID" });
  }

  try {
    const options = {
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/property/rating`,
      params: {id: '50873910'},
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
        'x-rapidapi-host': 'airbnb-search.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);

    // Map API response into simplified review objects
    const reviews = response.data.ratings.map((item : any) => ({
      propertyId : id,
      avatar: avatar,
      name: item.__typename,
      rating: item.localizedRating,
      comment: item.accessibilityLabel,
    }))

    res.status(200).json(reviews);
  } catch (error: any) {
    console.log(error.response?.data)
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ error: "Failed to fetch property reviews" });
  }
}
