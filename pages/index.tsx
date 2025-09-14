import {PROPERTYLISTINGSAMPLE} from "@/constants"
import {HERO_BACKGROUND_IMAGE} from "@/constants"
import Card from "@/components/common/Card"
//import {PropertyProps} from "@/interfaces"
import Pill from "@/components/layout/Pill"
import {PropertyProps} from "@/interfaces"
import {FILTERS} from "@/constants"
import axios from "axios";
import { useEffect, useState } from "react";
//import PropertyCard from "@/components/property/PropertyCard"; // Assume this component exists

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }


  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredProperties = (properties? properties : PROPERTYLISTINGSAMPLE).filter((property : PropertyProps) => {
    return (
      activeFilter === 'All' ||
      property.category?.some((cat) =>
        cat.toLowerCase().includes(activeFilter.toLowerCase())
      ) ||
      property.name.toLowerCase().includes(activeFilter.toLowerCase())
    );
  })
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/*------------------------- Hero section --------------------------- */}
      <section className="bg-cover bg-center bg-no-repeat flex justify-center items-center flex-col h-[50vh] relative"
        style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            Find your favorite place here!
          </h1>
          <h2 className="text-white font-semibold text-lg md:text-xl lg:text-2xl max-w-3xl">
            The best prices for over 2 million properties worldwide
          </h2>
        </div>
      </section>

      {/*------------------------- Filter section --------------------------- */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Explore by Category
            </h3>
            <span className="text-sm text-gray-600">
              {filteredProperties.length} properties found
            </span>
          </div>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
            <Pill
              label="All"
              isActive={activeFilter === 'All'}
              onClick={() => handleFilterClick('All')}
            />
            {(FILTERS || []).map((filter) => (
              <Pill
                key={filter}
                label={filter}
                isActive={activeFilter === filter}
                onClick={() => handleFilterClick(filter)}
              />
            ))}
          </div>
        </div>
      </section>

      {/*------------------------- Listing section --------------------------- */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Properties
            </h2>
            <p className="text-gray-600">
              Discover amazing places to stay around the world
            </p>
          </div>

          {/* Property Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(filteredProperties || []).map(({id, name, address, rating, category, price, offers, image, discount}, key : number) => (
                <Card key={key} id={id} name={name} address={address} rating={rating} price={price} category={category} offers={offers} image={image} discount={discount} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
