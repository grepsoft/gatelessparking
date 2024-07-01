import Footer from "@/components/footer";
import SearchComponent from "@/components/search-component";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Home() {
  return (
    <main className="sm:container">

      {/* Search form */}
      <SearchComponent />

      <h3 className="text-2xl sm:text-4xl font-bold text-slate-500 pt-16 pb-16 text-center uppercase tracking-wide">
        There is always a spot available.
      </h3>

      <section className="hidden lg:block pt-16 pb-32">
        <div className="grid grid-cols-3 place-items center">

          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-blue-500 text-white relative justify-center items-center rounded-full w-12 h-12">
              <p className="text-2xl font-bold
              after:content-[''] after:absolute after:-left-2 after:-top-2 after:w-16 after:h-16 after:-z-[1]
              after:rounded-full after:bg-gray-100
              ">1</p>
            </div>
            <p className="pt-2 text-slate-500 text-lg tracking-wide">
              Enter your destination
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-blue-500 text-white relative justify-center items-center rounded-full w-12 h-12">
              <p className="text-2xl font-bold
              after:content-[''] after:absolute after:-left-2 after:-top-2 after:w-16 after:h-16 after:-z-[1]
              after:rounded-full after:bg-gray-100
              ">2</p>
            </div>
            <p className="pt-2 text-slate-500 text-lg tracking-wide">
              Pick date and time
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-col bg-blue-500 text-white relative justify-center items-center rounded-full w-12 h-12">
              <p className="text-2xl font-bold
              before:content=[''] before:absolute before:w-[1000px]
              before:-z-10 before:top-1/2 before:h-[2px]
              before:-left-[920px] before:bg-blue-500
              
              after:content-[''] after:absolute after:-left-2 
              after:-top-2 after:w-16 after:h-16 after:-z-[1]
              after:rounded-full after:bg-gray-100
              ">3</p>
            </div>
            <p className="pt-2 text-slate-500 text-lg tracking-wide">
              Pick a spot
            </p>
          </div>

        </div>
      </section>

      <h2 className="text-2xl sm:text-5xl text-center pb-32 text-slate-500">
        No more running around looking for a parking spot.
      </h2>

      <section>
        <div className="pt-16 w-full absolute left-0 sm:bg-map bg-cover bg-no-repeat bg-center bg-blue-600 bg-opacity-25 
        bg-blend-overlay">
          <div className="grid grid-cols-1 sm:grid-cols-2 container pb-16 place-items-center sm:place-items-start">
            <div className="flex flex-col text-zinc-600 text-center sm:text-left">
              <p className="text-3xl sm:text-4xl font-bold">Fully responsive</p>
              <p className="text-md sm:text-lg pt-2 tracking-tight">It feels just like a mobile app.</p>
            </div>

            <div className="pt-8 sm:pt-0">
              <Image alt="mobile screenshot" width={320} height={400}
              src="/gateless-parking-mobile.png" />
            </div>
          </div>

          <Footer />
        </div>
      </section>
    </main>
  );
}
