import { PropertyProps } from "@/interfaces/index";
//import Image from "next/image";
//import  Slider from "@/components/common/Slider";

const PropertyDetail: React.FC<{ property: PropertyProps }> = ({ property }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold">{property.name}</h1>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-yellow-500">{property.rating} stars</span>
        <span>{property.address.city}, {property.address.country}</span>
      </div>

      {/* Image Grid */}
      {/* <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-2 gap-2 mt-4">
        <div className=" row-span-2 col-span-2 w-full h-full object-fill rounded-l-lg" >
          <Image src={property.gallery[0]} alt={property.name} width={100} height={100} className="w-full h-full object-cover rounded-l-lg"/>
        </div>
        <div className=" col-span-2 w-full h-64 object-fill rounded-tr-lg">
          <Image src={property.gallery[1]} alt={property.name} width={100} height={100} className="w-full h-full object-fill rounded-tr-lg"/>
        </div>
        <div className=" w-full max-h-25 object-fill ">
          <Image src={property.gallery[2]} alt={property.name} width={100} height={100} className="w-full h-full object-fill "/>
        </div>
        <div className=" w-full max-h-25 object-fill rounded-br-lg" >
          <Image src={property.gallery[1]} alt={property.name} width={100} height={100} className="w-full h-full bject-fill rounded-br-lg"/>
        </div>
      </div> */}
      {/* <div className="w">
        <Slider gallery={property.gallery} />
      </div> */}


      {/* Description */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p>{property.description}</p>
      </div>

      {/* Amenities */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">What this place offers</h2>
        <ul className="flex flex-wrap space-x-4">
          {property.category.map((amenity, index) => (
            <li key={index} className="bg-gray-200 p-2 rounded-md">
              {amenity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyDetail;
