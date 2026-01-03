import {
  BanknotesIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export default async function Page() {
  // In a real app, fetch these from DB
  const metrics = [
    {
      title: "Total Sales",
      value: "$45,231.89",
      icon: BanknotesIcon,
      change: "+20.1% from last month",
    },
    {
      title: "Active Orders",
      value: "+2350",
      icon: ShoppingBagIcon,
      change: "+180.1% from last month",
    },
    {
      title: "Total Customers",
      value: "1,203",
      icon: UserGroupIcon,
      change: "+12.5% from last month",
    },
    {
      title: "Growth",
      value: "+15.2%",
      icon: ArrowTrendingUpIcon,
      change: "+4.1% from last month",
    },
  ];

  return (
    <main className="w-full">
      <h1 className="mb-4 text-xl md:text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4 shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {metric.title}
                  </p>
                  <h3 className="text-xl font-bold">{metric.value}</h3>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="text-green-600 dark:text-green-400 font-medium mr-2">
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Revenue Chart Placeholder */}
        <div className="w-full md:col-span-4 rounded-xl bg-gray-50 dark:bg-gray-900 p-4 shadow-sm border border-gray-200 dark:border-gray-800 h-96 flex items-center justify-center">
          <p className="text-gray-400">Revenue Chart (Coming Soon)</p>
        </div>
        {/* Recent Orders Placeholder */}
        <div className="w-full md:col-span-4 rounded-xl bg-gray-50 dark:bg-gray-900 p-4 shadow-sm border border-gray-200 dark:border-gray-800 h-96 flex items-center justify-center">
          <p className="text-gray-400">Recent Orders (Coming Soon)</p>
        </div>
      </div>
    </main>
  );
}
