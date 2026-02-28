"use client";

import { useRouter } from "next/navigation";
import ActivityForm from "../_components/ActivityForm";
import { createActivity } from "@/services/activityService";

export default function CreateActivityPage() {
  const router = useRouter();

  async function handleCreate(data: any) {
    await createActivity(data);
    router.push("/activity");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Create Activity</h1>

      <ActivityForm onSubmit={handleCreate} />
    </div>
  );
}
