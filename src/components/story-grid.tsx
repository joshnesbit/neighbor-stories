"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Play, MapPin } from "lucide-react";

const neighborProfiles = [
  {
    id: 1,
    name: "Elena Rodriguez",
    image: "/api/placeholder/300/400",
    preview: "\"I came here from El Salvador with nothing but hope. Now I run the corner bakery on 24th Street where neighbors gather every morning for pan dulce and community...\"",
    type: "photo",
    neighborhood: "24th and Mission",
    landmark: "24th Street BART"
  },
  {
    id: 2,
    name: "David Chen",
    image: "/api/placeholder/300/400",
    preview: "\"Teaching my daughter Mandarin while she teaches me TikTok dances in our Sunset home. We're both learning about identity in this foggy, beautiful neighborhood...\"",
    type: "video",
    neighborhood: "48th and Judah",
    landmark: "Ocean Beach"
  },
  {
    id: 3,
    name: "Amara Johnson",
    image: "/api/placeholder/300/400",
    preview: "\"After 30 years as a UCSF nurse, retirement felt empty. Then I started the neighborhood book club at Green Apple Books in the Richmond...\"",
    type: "photo",
    neighborhood: "43rd and Lincoln",
    landmark: "Green Apple Books"
  },
  {
    id: 4,
    name: "Omar Hassan",
    image: "/api/placeholder/300/400",
    preview: "\"My food truck isn't just business—it's my way of sharing Somali culture, one plate at a time, parked outside the Twitter building in SOMA...\"",
    type: "video",
    neighborhood: "3rd and Folsom",
    landmark: "Twitter HQ"
  },
  {
    id: 5,
    name: "Sarah Kim",
    image: "/api/placeholder/300/400",
    preview: "\"Being a single mom in the Castro felt isolating until the neighbor kids started calling me 'Auntie Sarah' at Harvey Milk Plaza...\"",
    type: "photo",
    neighborhood: "Castro and Market",
    landmark: "Harvey Milk Plaza"
  },
  {
    id: 6,
    name: "Miguel Santos",
    image: "/api/placeholder/300/400",
    preview: "\"I fix bikes in my Mission Bay garage, but really I'm fixing connections. Every repair comes with coffee and conversation about this changing neighborhood...\"",
    type: "video",
    neighborhood: "3rd and King",
    landmark: "Chase Center"
  }
];

export function StoryGrid() {
  // Bay Area neighborhood colors
  const getNeighborhoodColor = (neighborhood: string) => {
    const colors: { [key: string]: string } = {
      "Mission District": "bg-purple-100 text-purple-700 border-purple-200",
      "Sunset District": "bg-orange-100 text-orange-700 border-orange-200",
      "Richmond": "bg-green-100 text-green-700 border-green-200",
      "SOMA": "bg-gray-100 text-gray-700 border-gray-200",
      "Castro": "bg-pink-100 text-pink-700 border-pink-200",
      "Mission Bay": "bg-blue-100 text-blue-700 border-blue-200"
    };
    return colors[neighborhood] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <section className="mb-8 sm:mb-12">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Humans of the Outer Sunset
        </h3>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Meet your neighbors through intimate portraits and conversations. The layers of our lives and diversity in our stories make our community unique and vibrant.
        </p>
        <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200 text-xs">
          📍 San Francisco Stories
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {neighborProfiles.map((profile) => (
          <Card 
            key={profile.id} 
            className="group cursor-pointer bg-white/80 backdrop-blur-sm border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          >
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-orange-100 to-pink-100 relative overflow-hidden">
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-pink-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-2">
                      {profile.type === 'video' ? (
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                      ) : (
                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-600 px-2">{profile.name}</p>
                  </div>
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              
              {/* Media type indicator */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                <Badge variant="secondary" className="bg-white/90 text-gray-700 text-xs">
                  {profile.type === 'video' ? (
                    <><Play className="w-3 h-3 mr-1" /> Video</>
                  ) : (
                    <><Camera className="w-3 h-3 mr-1" /> Photo</>
                  )}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{profile.name}</h4>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-3">
                <Badge variant="outline" className={`text-xs ${getNeighborhoodColor(profile.neighborhood)} self-start`}>
                  {profile.neighborhood}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{profile.landmark}</span>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic line-clamp-3">
                {profile.preview}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-6 sm:mt-8">
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
          Portraits and stories by Sarahi, SF community storyteller
        </p>
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-100 rounded-full">
          <Camera className="w-4 h-4 text-purple-600" />
          <span className="text-xs sm:text-sm text-purple-700 font-medium">
            Want to be featured? Reach out to share your SF story!
          </span>
        </div>
      </div>
    </section>
  );
}