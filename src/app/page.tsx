import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Paystub & W-2 Generator
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Generate professional paystubs and W-2 forms with accurate tax calculations
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Paystub Generator</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Create detailed paystubs with accurate tax calculations for any pay period.</p>
                </div>
                <div className="mt-5">
                  <Link href="/paystub-generator" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create Paystub
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">W-2 Form Generator</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Generate IRS-compliant W-2 forms based on annual earnings and tax information.</p>
                </div>
                <div className="mt-5">
                  <Link href="/w2-generator" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create W-2 Form
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
