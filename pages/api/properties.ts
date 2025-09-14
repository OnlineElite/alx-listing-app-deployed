// pages/api/properties.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
//import { PropertyProps } from "@/interfaces"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const options = {
      method: 'GET',
      url: 'https://airbnb13.p.rapidapi.com/search-location',
      params: {
      location: 'Paris',
      checkin: '2025-09-14',
      checkout: '2025-09-20',
      adults: '1',
      children: '0',
      infants: '0',
      pets: '0',
      page: '1',
      currency: 'USD'
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
      'x-rapidapi-host': 'airbnb13.p.rapidapi.com'
    }
  };

    const response = await axios.request(options);

    // Format results
    const formatted = response.data?.results?.map((item: any) => ({
      id : item.id,
      name: item.name,
      address: {
        state: "",
        city: item.city,
        country: item.address,
      },
      rating: item.rating ,
      category: [item.type],
      price: parseFloat(((item.price.rate)/6).toFixed(1)) ,
      offers: {
        bed: item.beds,
        shower: item.bathrooms,
        occupants:item.persons
      },
      image: item.images[0],
      description : item.type + item.cancelPolicy || "N/A",
      gallery : item.images,
      discount: "",
      reviews : [],
    }));

    res.status(200).json(formatted);
  } catch (error: any) {
    console.error("Error fetching properties:", error.message);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
}
