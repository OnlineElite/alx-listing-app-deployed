import {PropertyProps} from "@/interfaces"
import Image from "next/image"
import Link from "next/link";
import { StarIcon } from 'lucide-react';

const Card : React.FC<PropertyProps> = ({name, address, rating, category, price, image, discount})=>{

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
        stars.push(
            <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
        );
        }

        if (hasHalfStar) {
        stars.push(
            <div key="half" className="relative">
            <StarIcon className="h-4 w-4 text-gray-300 fill-current" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
                <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
            </div>
            </div>
        );
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
        stars.push(
            <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300 fill-current" />
        );
        }

        return stars;
    };

    return(
        <Link href={`/property/${name}`} className="no-underline">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="relative w-full h-48 overflow-hidden">
                    <Image src={image}  alt={name} fill
                    className=" object-cover hover:scale-105 transition-transform duration-300"/>
                </div>
                <div className="mt-2">
                    {category.map((item, index)=> (
                        <span key={index} className="px-2 mx-1 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{item}</span>
                    ))}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{name}</h3>
                    <div className="flex justify-between items-center">
                    {address && (<p className="text-sm text-gray-600 mb-2">{address.city}, {address.country} </p>)}
                    {/* {offers? <span className="text-sm text-gray-600">{offers.bed} Bed | {offers.occupants} Occupants | {offers.shower} Shower </span> : ""} */}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                            {renderStars(rating)}
                            <span className="text-sm text-gray-600 ml-1">({rating})</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">
                            ${price}
                            <span className="text-sm font-normal text-gray-600">/night</span>
                        </span>
                        {discount? <span>⬇️ <span className="text-green-600 font-bold">{discount}%</span></span> : ""}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card;