"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Play } from "lucide-react";

const neighborProfiles = [
  {
    id: 1,
    name: "Elena Rodriguez",
    image: "/api/placeholder/300/400",
    preview: "\"I came here with nothing but hope. Now I run the corner bakery where neighbors gather every morning...\"",
    type: "photo",
    neighborhood: "Mission District"
  },
  {
    id: 2,
    name: "David Chen",
    image: "/api/placeholder/300/400",
    preview: "\"Teaching my daughter Mandarin while she teaches me TikTok dances. We're both learning about identity...\"",
    type: "video",
    neighborhood: "Richmond"
  },
  {
    id: 3,
    name: "Amara Johnson",
    image: "/api/placeholder/300/400",
    preview: "\"After 30 years as a nurse, retirement felt empty. Then I started the neighborhood book club...\"",
    type: "photo",
    neighborhood: "Sunset"
  },
  {
    id: 4,
    name: "Omar Hassan",
    image: "/api/placeholder/300/400",
    preview: "\"My food truck isn't just business—it's my way of sharing Somali culture, one plate at a time...\"",
    type: "video",
    neighborhood: "SOMA"
  },
  {
    id: 5,
    name: "Sarah Kim",
    image: "/api/placeholder/300/400",
    preview: "\"Being a single mom felt isolating until the neighbor kids started calling me 'Auntie Sarah'...\"",
    type: "photo",
    neighborhood: "Castro"
  },
  {
    id: 6,
    name: "Miguel Santos",
    image: "/api/placeholder/300/400",
    preview: "\"I fix bikes in my garage, but really I'm fixing connections. Every repair comes with coffee and conversation...\"",
    type: "video",
    neighborhood: "Mission Bay"
  }
];

export function StoryGrid() {
  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Humans of the Neighborhood
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet your neighbors through intimate portraits and conversations. 
          Each profile captures the layered identities and rich stories that make our community vibrant.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-2">
                      {profile.type === 'video' ? (
                        <Play className="w-8 h-8 text-orange-600" />
                      ) : (
                        <Camera className="w-8 h-8 text-orange-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{profile.name}</p>
                  </div>
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              
              {/* Media type indicator */}
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 text-gray-700">
                  {profile.type === 'video' ? (
                    <><Play className="w-3 h-3 mr-1" /> Video</>
                  ) : (
                    <><Camera className="w-3 h-3 mr-1" /> Photo</>
                  )}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{profile.name}</h4>
                <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                  {profile.neighborhood}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed italic">
                {profile.preview}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-600 mb-4">
          Portraits and stories by Sarahi, community storyteller
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
          <Camera className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-purple-700 font-medium">
            Want to be featured? Reach out to share your story!
          </span>
        </div>
      </div>
    </section>
  );
}