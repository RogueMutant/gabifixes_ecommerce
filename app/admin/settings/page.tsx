import SettingsForm from "@/app/ui/admin/settings/form";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import User from "@/app/lib/models/User";
import dbConnect from "@/app/lib/db";

export const metadata: Metadata = {
  title: "Settings | Gabi Fixes Admin",
};

async function getProfile(email: string) {
  await dbConnect();
  // Assuming auth email is correct
  return await User.findOne({ email }).lean();
}

export default async function Page() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await getProfile(session.user.email);
  // Convert _id to string for serialization
  const serializedUser = {
    ...user,
    _id: user._id.toString(),
    registrationDate: user.registrationDate.toISOString(),
  };

  return (
    <main className="w-full">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
        Settings
      </h1>
      <SettingsForm user={serializedUser} />
    </main>
  );
}
