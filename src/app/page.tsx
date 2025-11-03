import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to MERN Auth System
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A secure role-based authentication system with three user roles: 
          Client, HR, and Super Admin. Experience different dashboards and functionalities based on your role.
        </p>
        
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Button asChild size="lg">
            <Link href="/login">
              Sign In
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/signup">
              Create Account
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Client</h3>
            <p className="text-gray-600">
              Browse HR professionals and contact them for services
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">HR</h3>
            <p className="text-gray-600">
              Manage client contacts and view incoming requests
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin</h3>
            <p className="text-gray-600">
              Oversee all users and monitor system interactions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}