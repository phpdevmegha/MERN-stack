
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import authApi from "@/utils/authApi";


export default function Login() {
    const navigate = useNavigate();
    const [userData , setUserData] = useState()
    const handleChange = (e) => {
        setUserData({...userData,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await authApi.login(userData) 
            localStorage.setItem("token", res.data.token);
            toast.success(res.data.message)
            navigate("/")
        } catch (error) {
            toast.error(error.response.message)
        }
    }
    return (
        <div className="flex justify-center mt-10 px-4">
            <Card className="w-full max-w-lg border rounded-2xl shadow-md p-6">
                <CardHeader>
                    <CardTitle className="text-2xl text-center font-bold">
                        Login
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button className="w-full mt-4" type="submit" onClick={handleSubmit}>
                            Login
                        </Button>

                        <p className="text-center text-sm mt-2">
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
