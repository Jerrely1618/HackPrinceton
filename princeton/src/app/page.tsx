import { Button } from "@nextui-org/react";
import Image from "next/image";
import bg from "../../public/bg.svg";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-row w-full items-center justify-center bg-black overflow-hidden">
      <div className="flex flex-col flex-1 items-center justify-center w-full bg-transparent text-white gap-16">
        <span
          style={{
            fontSize: "80px",
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
        <div className="flex flex-col text-center w-full">
          <span className="text-[30px] font-bold">
            Start spending the smart way
          </span>
          <span className="text-[15px]">
            Get your finances back in control with WealthyWise!
          </span>
        </div>

        <Button
          variant="shadow"
          className="p-3 rounded-xl text-black font-bold"
          style={{
            backgroundColor: "#00FF94",
          }}
        >
          Try it for free now!
        </Button>
      </div>
      <div className="hidden flex-col flex-1 w-full h-screen overflow-hidden lg:flex">
        <div className="mt-10 ml-10 fixed bg-black border-2 border-white rounded-[32px] p-1 h-full overflow-hidden w-full">
          <Image src={bg} alt="Alt" className="mt-1" />
        </div>
      </div>
    </main>
  );
}
