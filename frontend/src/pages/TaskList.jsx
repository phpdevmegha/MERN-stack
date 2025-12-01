import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, Pencil } from "lucide-react";

import taskApi from "@/utils/taskApi";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await taskApi.getTasks();
      setTasks(res.data.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Delete
  const deleteTask = async (id) => {
    if (!confirm("Delete task?")) return;

    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-semibold mb-6">Your Tasks</h1>

      {tasks.length === 0 && (
        <p className="text-gray-500 text-center">No tasks found.</p>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task._id} className="border rounded-xl shadow-sm">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-medium">{task.title}</h2>
                <p className="text-gray-600 mt-1">{task.description}</p>

                <Badge
                  className={`mt-2 ${
                    task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                >
                  {task.priority.toUpperCase()}
                </Badge>
              </div>

              <div className="flex gap-2">
                {/* EDIT BUTTON */}
                <Button
                  variant="outline"
                  onClick={() => navigate(`/edit/${task._id}`)}
                  className="h-10 w-10 p-0"
                >
                  <Pencil className="h-5 w-5" />
                </Button>

                {/* DELETE BUTTON */}
                <Button
                  variant="destructive"
                  onClick={() => deleteTask(task._id)}
                  className="h-10 w-10 p-0"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
