"use client"
import { getUser } from "@/utils/server";
import Link from "next/link";

export default function Home() {
  const user = getUser()
  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-5/6 py-4 text-center shadow-lg border border-gray-200 space-x-2">
          <Link href={'/project'} className="py-2 px-3 bg-blue-500 rounded font-semibold text-white">Project</Link>
          <Link href={`/money/${user.id_user}`} className="py-2 px-3 bg-blue-500 rounded font-semibold text-white">Money</Link>
        </div>
      </div>
    </>
  )
}
