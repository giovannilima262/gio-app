import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Email Chief of Staff</h1>
        <UserButton afterSignOutUrl="/" />
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Recent Emails</h2>
        <p className="text-gray-500 text-sm">
          Connect your Gmail account to start processing emails automatically.
        </p>
      </div>
    </main>
  );
}
