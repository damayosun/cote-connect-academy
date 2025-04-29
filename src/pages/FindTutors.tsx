
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for tutors
const tutorsData = [
  {
    id: 1,
    name: "Dr. Alex Chen",
    subjects: ["Computer Science", "Data Science"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 60,
    experience: 8,
    description: "PhD in Computer Science with expertise in AI and machine learning. I specialize in simplifying complex concepts.",
  },
  {
    id: 2,
    name: "Prof. Sarah Johnson",
    subjects: ["Electrical Engineering", "Physics"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 55,
    experience: 10,
    description: "Professor of Electrical Engineering with industry experience. My teaching approach focuses on practical applications.",
  },
  {
    id: 3,
    name: "Dr. Michael Taylor",
    subjects: ["Mathematics", "Statistics"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 50,
    experience: 12,
    description: "PhD in Mathematics with experience teaching at university level. I make math accessible and enjoyable for all students.",
  },
  {
    id: 4,
    name: "Prof. Emily Rodriguez",
    subjects: ["Chemical Engineering", "Organic Chemistry"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 58,
    experience: 7,
    description: "Chemical Engineering professor with industry background. I focus on connecting theory with real-world applications.",
  },
  {
    id: 5,
    name: "Dr. James Wilson",
    subjects: ["Mechanical Engineering", "Physics"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 52,
    experience: 9,
    description: "Mechanical Engineer with a passion for teaching complex concepts in a simple manner.",
  },
  {
    id: 6,
    name: "Dr. Lisa Park",
    subjects: ["Civil Engineering", "Environmental Engineering"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 56,
    experience: 11,
    description: "Civil Engineer with 11 years of experience in both academia and industry projects.",
  },
  {
    id: 7,
    name: "Prof. David Brown",
    subjects: ["Computer Engineering", "Digital Systems"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 62,
    experience: 14,
    description: "Computer Engineering professor specialized in FPGA design and embedded systems.",
  },
  {
    id: 8,
    name: "Dr. Rebecca Martinez",
    subjects: ["Biology", "Biochemistry"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    price: 54,
    experience: 8,
    description: "Biochemist with a focus on making complex biological concepts accessible to all students.",
  },
];

// Subject options
const subjectOptions = [
  "All Subjects",
  "Computer Science",
  "Electrical Engineering",
  "Mathematics",
  "Physics",
  "Chemical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Biology",
];

// Sort options
const sortOptions = [
  { value: "rating", label: "Top Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "experience", label: "Most Experienced" },
];

const FindTutors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("rating");
  
  // Filter and sort tutors based on selected criteria
  const filteredTutors = tutorsData
    .filter(tutor => {
      // Filter by search term
      const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tutor.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filter by subject
      const matchesSubject = selectedSubject === "All Subjects" || 
                             tutor.subjects.includes(selectedSubject);
      
      // Filter by price range
      const matchesPrice = tutor.price >= priceRange[0] && tutor.price <= priceRange[1];
      
      return matchesSearch && matchesSubject && matchesPrice;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "experience":
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow py-8 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Find Your Perfect Tutor</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Browse through our list of expert tutors and find the perfect match for your educational needs.
            </p>
          </div>
          
          {/* Search and filter section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  className="pl-10" 
                  placeholder="Search by tutor name or subject" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-2 flex justify-between">
                <span className="text-sm">Price Range: ${priceRange[0]} - ${priceRange[1]}</span>
              </div>
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={(value: number[]) => setPriceRange(value)}
                className="my-4"
              />
            </div>
          </div>
          
          {/* Tutors listing */}
          {filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor) => (
                <Card key={tutor.id} className="tutor-card">
                  <div className="flex p-4 border-b">
                    <div className="w-20 h-20 rounded-full overflow-hidden shrink-0">
                      <img 
                        src={tutor.image} 
                        alt={tutor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg">{tutor.name}</h3>
                      <div className="flex items-center text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{tutor.rating}</span>
                        <span className="mx-2">•</span>
                        <span>{tutor.experience} years exp.</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tutor.subjects.map((subject, index) => (
                          <span 
                            key={index} 
                            className="bg-cote-light dark:bg-slate-700 text-cote-primary dark:text-cote-light text-xs px-2 py-0.5 rounded-full"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                      {tutor.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cote-primary">${tutor.price}/hr</span>
                      <Button asChild>
                        <NavLink to={`/tutors/${tutor.id}`}>View Profile</NavLink>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No tutors found</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search criteria or browse all tutors.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FindTutors;
