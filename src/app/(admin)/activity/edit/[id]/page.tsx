"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ActivityForm from "../../_components/ActivityForm";
import { getActivityById, updateActivity } from "@/services/activityService";

export default function EditActivityPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };

  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getActivityById(id);
        setActivity(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  async function handleUpdate(data: any) {
    await updateActivity(id, data);
    router.push("/activity");
  }

  if (loading) return <p>Loading...</p>;
  if (!activity) return <p>Activity not found</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit Activity</h1>

      <ActivityForm initialData={activity} onSubmit={handleUpdate} isEdit />
    </div>
  );
}
