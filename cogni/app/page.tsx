
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Search, Star, ArrowRight, Filter } from 'lucide-react';
import { useSearch } from "./hooks/useSearch";
import { useAgents } from "./hooks/useAgents";
import { useAuth } from "./hooks/useAuth";
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
  
 // landing page
export default function Home() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedIndustries, setSelectedIndustries] = useState(['']);
  const [selectedFunctionalities, setSelectedFunctionalities] = useState(['']);
  const [minRating, setMinRating] = useState(0);
  const { searchQuery, handleSearch } = useSearch();

  const {
    agents: featuredAgents,
    loading,
    error
  } = useAgents({
    _query: searchQuery,
    industry: selectedIndustries.join(','),
    functionality: selectedFunctionalities.join(','),
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    minRating,
    limit: 6
  });

  const industries = ["Retail", "Healthcare", "Finance", "Technology", "Education"];
  const functionalities = ["Chatbot", "Data Analysis", "Automation", "Content Generation"];




  return (
    <div className="min-h-screen">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find the Perfect AI Agent for Your Business
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect with top AI developers and transform your business with custom AI solutions
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for AI agents..."
                className="w-full px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value, (query) => handleSearch(query, () => {}))}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-3 rounded-full hover:bg-blue-700">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <Filter className="w-5 h-5" />
                </div>

                {/* Industry Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Industry</h3>
                  <div className="space-y-2">
                    {industries.map((industry) => (
                      <label key={industry} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600"
                          checked={selectedIndustries.includes(industry)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIndustries([...selectedIndustries, industry]);
                            } else {
                              setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
                            }
                          }}
                        />
                        <span className="ml-2">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Functionality Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Functionality</h3>
                  <div className="space-y-2">
                    {functionalities.map((functionality) => (
                      <label key={functionality} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600"
                          checked={selectedFunctionalities.includes(functionality)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFunctionalities([...selectedFunctionalities, functionality]);
                            } else {
                              setSelectedFunctionalities(selectedFunctionalities.filter(f => f !== functionality));
                            }
                          }}
                        />
                        <span className="ml-2">{functionality}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    className="mb-2"
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Minimum Rating</h3>
                  <div className="flex items-center space-x-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className={`flex items-center p-2 rounded ${
                          minRating === rating ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setMinRating(rating)}
                      >
                        <Star className={`w-4 h-4 ${minRating === rating ? 'fill-current text-blue-600' : ''}`} />
                        <span className="ml-1">{rating}+</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Featured Agents Section */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">AI Agents Home</h2>
                <Button variant="outline" className="flex items-center">
                  View all <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="text-red-600 text-center py-8">
                  Error loading agents. Please try again.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredAgents.map((agent) => (
                    <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="w-full h-48 bg-gray-100 rounded-lg mb-4">
                          <img src={agent.image} alt={agent.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{agent.description}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1">{agent.rating}</span>
                          </div>
                          <span className="font-semibold">${agent.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* How It Works Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Browse AI Agents",
                    description: "Explore our marketplace of pre-built AI solutions"
                  },
                  {
                    title: "Choose & Customize",
                    description: "Select the perfect agent and customize it for your needs"
                  },
                  {
                    title: "Transform Your Business",
                    description: "Implement AI solutions and watch your business grow"
                  }
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );




/* 
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/cogni-logo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by not{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
  */
}

