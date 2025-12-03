import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import taskApi from "@/utils/taskApi";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const loadTask = async () => {
    try {
      const res = await taskApi.getTask(id);

      setForm({
        title: res.data.data.title,
        description: res.data.data.description,
        priority: res.data.data.priority,
      });
    } catch (err) {
      toast.error("Failed to load task");
    }
    setPageLoading(false);
  };

  useEffect(() => {
    if (isEdit) loadTask();
    else setPageLoading(false);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePriority = (value) => {
    setForm({ ...form, priority: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await taskApi.updateTask(id, form);
        toast.success("Task updated successfully!");
      } else {
        await taskApi.addTask(form);
        toast.success("Task added successfully!");
      }

      setTimeout(() => navigate("/list"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      setLoading(false); // DO NOT REDIRECT on error
      return;
    }

    setLoading(false);
  };

  if (pageLoading)
    return (
      <div className="flex justify-center mt-20">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );

  return (
    <div className="flex justify-center mt-10 px-4">
      <Card className="w-full max-w-lg border rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {isEdit ? "Edit Task" : "Add a Task"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-1 font-medium">Title</label>
              <Input
                name="title"
                placeholder="Enter task title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <Textarea
                name="description"
                placeholder="Task details..."
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Priority</label>
              <Select value={form.priority} onValueChange={handlePriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full py-2 text-lg"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : isEdit ? "Update Task" : "Add Task"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
