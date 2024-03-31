"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Link } from "@nextui-org/react";
import bg from "../../public/bg.svg";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

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
    setShowForm(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData: UserData = {
      fullName: (
        event.currentTarget.elements.namedItem("fullName") as HTMLInputElement
      ).value,
      estimatedIncome: (
        event.currentTarget.elements.namedItem(
          "estimatedIncome"
        ) as HTMLInputElement
      ).value,
      weeklyExpenditures: (
        event.currentTarget.elements.namedItem(
          "weeklyExpenditures"
        ) as HTMLInputElement
      ).value,
      bigSpendings: (
        event.currentTarget.elements.namedItem(
          "bigSpendings"
        ) as HTMLInputElement
      ).value,
      goals: (
        event.currentTarget.elements.namedItem("goals") as HTMLInputElement
      ).value,
    };

    setUserData([formData]);
  };
  return (
    <main className="flex min-h-screen flex-row w-full items-center justify-center bg-black overflow-hidden">
      <div className="flex flex-col flex-1 items-center justify-center w-full bg-transparent text-white gap-16">
        <span
          style={{
            fontSize: "80px",
            fontFamily: "Kufam, sans-serif",
            fontWeight: "bold",
            backgroundImage:
              "linear-gradient(to right, #6B35B0, #DB278D, #CE1A30)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          WealthWise!
        </span>
        {showForm ? (
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col items-center justify-center w-full  gap-4  p-4 rounded-lg"
          >
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <div>
                {" "}
                <label
                  htmlFor="fullName"
                  className="text-xl text-right mr-4"
                  style={{
                    fontFamily: "Kufam, sans-serif",
                    fontSize: 15,
                  }}
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="px-5 py-1 bg-white bg-opacity-10 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="estimatedIncome"
                  className="text-xl text-right mr-4"
                  style={{
                    fontFamily: "Kufam, sans-serif",
                    fontSize: 15,
                  }}
                >
                  Estimated Income
                </label>
                <input
                  id="estimatedIncome"
                  type="text"
                  className="px-5 py-1 bg-white bg-opacity-10 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="weeklyExpenditures"
                  className="text-xl text-right mr-4"
                  style={{
                    fontFamily: "Kufam, sans-serif",
                    fontSize: 15,
                  }}
                >
                  Weekly Expenditures
                </label>
                <input
                  id="weeklyExpenditures"
                  type="text"
                  className="px-5 py-1 bg-white bg-opacity-10 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="bigSpendings"
                  className="text-xl text-right mr-4"
                  style={{
                    fontFamily: "Kufam, sans-serif",
                    fontSize: 15,
                  }}
                >
                  Big Spendings
                </label>
                <input
                  id="bigSpendings"
                  type="text"
                  className="px-5 py-1 bg-white bg-opacity-10 rounded-md"
                />
              </div>

              <div>
                {" "}
                <label
                  htmlFor="goals"
                  className="text-xl text-right mr-4"
                  style={{
                    fontFamily: "Kufam, sans-serif",
                    fontSize: 15,
                  }}
                >
                  Goals
                </label>
                <input
                  id="goals"
                  type="text"
                  className="px-5 py-1 bg-white bg-opacity-10 rounded-md"
                />
              </div>
            </div>
            <div className="flex space-x-5">
              <Button
                type="submit"
                className="p-3 rounded-xl text-white border-2 border-green-500 font-bold text-lg"
                style={{
                  backgroundColor: "transparent",
                  fontFamily: "Kufam, sans-serif",
                  fontSize: 12,
                }}
              >
                Submit
              </Button>
              <Button
                onClick={handleBackClick}
                className="p-3 rounded-xl text-white border-2 border-green-500 font-bold text-lg"
                style={{
                  backgroundColor: "transparent",
                  fontFamily: "Kufam, sans-serif",
                  fontSize: 12,
                }}
              >
                Back
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center w-full">
            <span
              className="text-[24px] font-bold kufam-font"
              style={{
                fontFamily: "Kufam, sans-serif",
              }}
            >
              Start spending the smart way
            </span>
            <span
              className="mt-3 text-[13px]"
              style={{
                fontFamily: "Kufam, sans-serif",
              }}
            >
              Get your finances back in control with WealthWise!
            </span>
            <div className="flex flex-row gap-2 mt-4 items-center justify-center">
              <Button
                onClick={handleTryNowClick}
                className="text-white border-2 border-green-600 font-bold"
                style={{
                  background: "none",
                  fontFamily: "Kufam, sans-serif",
                  fontSize: 13,
                }}
              >
                Try it for free now!
                <ArrowOutwardIcon
                  className="mb-1"
                  sx={{
                    fill: "white",
                  }}
                />
              </Button>
              <Button
                href="/profile"
                as={Link}
                className="text-white border-2 border-green-600 font-bold"
                style={{
                  background: "none",
                  fontFamily: "Kufam, sans-serif",
                  fontSize: 13,
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
