"use client";

import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function PrivacyTermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Neighbor Stories</h1>
                <p className="text-sm text-gray-600">Privacy & Terms</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Stories
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Privacy & Terms</h2>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Who we are</h3>
              <p className="text-gray-700 leading-relaxed">
                NeighborStories.org is a project run by the people who live here.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  We don't sell or share your data.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  We don't use tracking cookies.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  If you give us your contact information, we'll only use it for the purpose you expect (like notifying you about a meetup where a story will be shared).
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  You can ask us to delete your information at any time.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  This site is intended for people 14 and older.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Terms of Use</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Please use this site with care and respect.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  You are responsible for your own actions when participating in gatherings.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  We don't endorse user content.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  We accept no liability for what happens in and around this tool.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  This site is operated in CA, USA and any disputes are subject to its laws.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  We may update these terms if needed, but we'll keep them simple and human.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Care</h3>
              <p className="text-gray-700 leading-relaxed">
                We know things don't always go perfectly. If a misunderstanding or conflict arises, our volunteers are happy to help neighbors talk it through and find repair.
              </p>
            </section>

            <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions?</h3>
              <p className="text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Reach us at{" "}
                <a href="mailto:hello@relationaltechproject.org" className="text-blue-600 hover:underline">
                  hello@relationaltechproject.org
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}