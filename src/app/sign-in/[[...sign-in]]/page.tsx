import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

export default function StudentLogin() {
  return (
    <div className="flex h-screen">
      {/* Left side - Image only */}
      <div className="hidden lg:flex w-1/2 h-full relative">
        <Image
          src="/image.jpg"
          alt="Student Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
        {/* Optional background illustration */}
        <div className="absolute inset-0 bg-[url('/abstract-shape.svg')] bg-no-repeat bg-center opacity-5"></div>

        <div className="w-full max-w-md p-8 relative z-10">
          {/* Heading */}
          <h2 className="text-3xl font-semibold text-red-500 mb-2 text-center">
            Student Login
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-center mb-6">
            Access your ERP student account
          </p>

          {/* Clerk SignIn */}
          <SignIn
            appearance={{
              elements: {
                card: "shadow-xl rounded-2xl w-full",
                headerSubtitle: "hidden",
                footer: { display: "none" }, 
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

