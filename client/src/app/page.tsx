"use client"
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import bg from "../../public/bg.svg";
interface UserData {
  fullName: string;
  estimatedIncome: string;
  weeklyExpenditures: string;
  bigSpendings: string;
  goals: string;
}
export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [UserData, setUserData] = useState<UserData[]>([]);
  const handleTryNowClick = () => {
    setShowForm(true); 
  };
  const handleBackClick = () => {
    setShowForm(false)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData: UserData = {
      fullName: (event.currentTarget.elements.namedItem("fullName") as HTMLInputElement).value,
      estimatedIncome: (event.currentTarget.elements.namedItem("estimatedIncome") as HTMLInputElement).value,
      weeklyExpenditures: (event.currentTarget.elements.namedItem("weeklyExpenditures") as HTMLInputElement).value,
      bigSpendings: (event.currentTarget.elements.namedItem("bigSpendings") as HTMLInputElement).value,
      goals: (event.currentTarget.elements.namedItem("goals") as HTMLInputElement).value,
    };

    setUserData([formData]);
  };
  return (
    <main className="flex min-h-screen flex-row w-full items-center justify-center bg-black overflow-hidden">
      <div className="flex flex-col flex-1 items-center justify-center w-full bg-transparent text-white gap-16 kufam-font">
        <span
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            backgroundImage: "linear-gradient(to right, #6B35B0, #DB278D, #CE1A30)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          WealthWise!
        </span>
        {showForm ? (
          <form onSubmit={handleSubmit} className="text-left mt-0 flex flex-col items-center gap-4 bg-white bg-opacity-10 py-5 px-10 rounded-lg">
  <div className="grid grid-cols-2 gap-4 items-center w-full">
    <label htmlFor="fullName" className="text-xl text-right mr-4">Full Name</label>
    <input id="fullName" type="text" className="px-5 py-1 bg-white bg-opacity-10 rounded-md" />
    
    <label htmlFor="estimatedIncome" className="text-xl text-right mr-4">Estimated Income</label>
    <input id="estimatedIncome" type="text" className="px-5 py-1 bg-white bg-opacity-10 rounded-md" />
    
    <label htmlFor="weeklyExpenditures" className="text-xl text-right mr-4">Weekly Expenditures</label>
    <input id="weeklyExpenditures" type="text" className="px-5 py-1 bg-white bg-opacity-10 rounded-md" />
    
    <label htmlFor="bigSpendings" className="text-xl text-right mr-4">Big Spendings</label>
    <input id="bigSpendings" type="text" className="px-5 py-1 bg-white bg-opacity-10 rounded-md" />
    
    <label htmlFor="goals" className="text-xl text-right mr-4">Goals</label>
    <input id="goals" type="text" className="px-5 py-1 bg-white bg-opacity-10 rounded-md" />
  </div>
  <div className="flex space-x-5">
  <Button type="submit" variant="shadow" className="mt-4 p-3 rounded-xl text-black font-bold text-lg" style={{ backgroundColor: "#00FF94", }}>
    Submit
  </Button>
  <Button onClick={handleBackClick} variant="shadow" className="mt-4 p-3 rounded-xl text-black font-bold text-lg" style={{ backgroundColor: "#00FF94", }}>
    Back
  </Button>
  </div>
</form>

        ) : (
          <div className="flex flex-col items-center text-center w-full">
            <span className="text-[30px] font-bold kufam-font">
              Start spending the smart way
            </span>
            <span className="mt-3 text-[15px]">
              Get your finances back in control with WealthWise!
            </span>
            <div className="flex space-x-3 mt-4">
              <Button onClick={handleTryNowClick} variant="shadow" className="p-7 rounded-xl text-black font-bold text-lg" style={{ backgroundColor: "#00FF94", }}>
                Try it for free now!
              </Button>
        <Button
          href="/profile"
          as={Link}
          variant="shadow"
          className="p-7 rounded-xl text-black font-bold text-lg"
          style={{
            backgroundColor: "#00FF94",
          }}
        >
          Login
        </Button>
        </div>
          </div>
        )}
      </div>
      <div className="hidden flex-col flex-1 w-full h-screen overflow-hidden lg:flex">
        <div className="mt-10 ml-10 fixed bg-black border-2 border-white rounded-[32px] p-1 h-full overflow-hidden w-full">
          <Image src={bg} alt="Alt" className="mt-1" />
        </div>
      </div>
    </main>
  );
}