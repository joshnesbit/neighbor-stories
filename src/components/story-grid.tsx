"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Play, Flower } from "lucide-react";

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
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Flower className="w-6 h-6 text-orange" />
          <h3 className="text-3xl font-bold text-teal">
            NEIGHBOR STORIES with Sarahi
          </h3>
          <Flower className="w-6 h-6 text-yellow" />
        </div>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
          Meet your neighbors through intimate portraits and conversations. 
          Each profile captures the layered identities and rich stories that make our community vibrant.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {neighborProfiles.map((profile) => (
          <Card 
            key={profile.id} 
            className="group cursor-pointer bg-white/90 backdrop-blur-sm border-4 border-orange rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-3 overflow-hidden shadow-lg"
          >
            <div className="relative">
              <div className="aspect-[3/4] bg-gradient-to-br from-teal-light to-orange-light relative overflow-hidden">
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal/20 to-orange/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      {profile.type === 'video' ? (
                        <Play className="w-10 h-10 text-teal" />
                      ) : (
                        <Camera className="w-10 h-10 text-orange" />
                      )}
                    </div>
                    <p className="text-lg text-gray-800 font-bold">{profile.name}</p>
                  </div>
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              
              {/* Media type indicator */}
              <div className="absolute top-4 right-4">
                <Badge className={`font-bold text-white shadow-lg ${
                  profile.type === 'video' ? 'bg-teal' : 'bg-orange'
                }`}>
                  {profile.type === 'video' ? (
                    <><Play className="w-3 h-3 mr-1" /> VIDEO</>
                  ) : (
                    <><Camera className="w-3 h-3 mr-1" /> PHOTO</>
                  )}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 text-lg">{profile.name}</h4>
                <Badge className="text-xs bg-yellow-light text-yellow font-bold px-3 py-1 rounded-full border-2 border-yellow">
                  {profile.neighborhood}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-700 leading-relaxed italic font-medium">
                {profile.preview}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <div className="inline-flex items-center gap-3 px-6 py-4 bg-white/80 rounded-2xl border-4 border-teal shadow-lg">
          <Camera className="w-6 h-6 text-teal" />
          <span className="text-lg text-teal font-bold">
            Want to be featured? Reach out to share your story!
          </span>
          <Flower className="w-6 h-6 text-orange" />
        </div>
      </div>
    </section>
  );
}