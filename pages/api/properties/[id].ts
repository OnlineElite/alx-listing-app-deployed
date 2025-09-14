// pages/api/properties/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log("the id recieved is : ", id)

  if (!id) {
    return res.status(400).json({ error: "Missing property ID" });
  }

  try {
    const options = {
      method: 'GET',
      url: 'https://airbnb13.p.rapidapi.com/room',
      params: {
        listing_id: `${id}`,
        locale: 'Paris',
        currency: 'USD'
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
        'x-rapidapi-host': 'airbnb13.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);

    // Format the data before sending it 
    const property = {
      id : response.data?.results?.id,
      name: response.data?.results?.name,
      address: {
        state: "",
        city: response.data?.results?.city,
        country: "",
      },
      rating: response.data?.results?.hostRating ,
      category: [response.data?.results?.type],
      price: response.data?.results?.price,
      offers: {
        bed: "",
        shower: "",
        occupants: "",
      },
      image: response.data?.results?.images[0],
      description : response.data?.results?.type + response.data?.results?.cancelPolicy || "N/A",
      gallery : response.data?.results?.images.slice(0, 10),
      discount: "",
      reviews : [],
    };

    res.status(200).json(property);
  } catch (error: any) {
    console.error("Error fetching property details:", error.message);
    res.status(500).json({ error: "Failed to fetch property details" });
  }
}
