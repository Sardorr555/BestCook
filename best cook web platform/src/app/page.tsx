"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedSellers from "@/components/home/FeaturedSellers";
import HowItWorks from "@/components/home/HowItWorks";
import PopularProducts from "@/components/home/PopularProducts";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <PopularProducts />
        <FeaturedSellers />
        <HowItWorks />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
