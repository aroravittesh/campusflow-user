import Image from "next/image";
import { SignUp } from "@clerk/nextjs";

export default function StudentSignup() {
  return (
    <div className="flex h-screen">
      {/* Left side - Image */}
      <div className="hidden lg:flex w-1/2 h-full relative">
        <Image
          src="/image.jpg" // 👉 replace with student-friendly background
          alt="Student Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Right side - Form with styled background */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
        {/* Optional subtle abstract shape */}
        <div className="absolute inset-0 bg-[url('/abstract-shape.svg')] bg-no-repeat bg-center opacity-5"></div>

        <div className="w-full max-w-md p-8 relative z-10">
          {/* Heading */}
          <h2 className="text-3xl font-semibold text-red-500 mb-2 text-center">
            Create Student Account
          </h2>

          {/* Subheading */}
          <p className="text-gray-500 text-center mb-6">
            Sign up to access your ERP student dashboard
          </p>

          {/* Clerk Student Signup */}
          <SignUp
            appearance={{
              elements: {
                card: "shadow-xl rounded-2xl w-full",
                headerSubtitle: "hidden",
                footer: { display: "none" }, // hides Clerk branding
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
