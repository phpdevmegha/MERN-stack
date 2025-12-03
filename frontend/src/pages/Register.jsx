import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import authApi from "@/utils/authApi";

export default function Register() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const handleChange = (e) => {
        setUserData({...userData,[e.target.name]:e.target.value});
        };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const res = await authApi.register(userData) 
           toast.success(res.data.message)
           navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registartion Failed');
        }
    }
        
    return (
        <div className="flex justify-center mt-10 px-4">
        <Card className="w-full max-w-lg border rounded-2xl shadow-md p-6">
            <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
                Create Account
            </CardTitle>
            </CardHeader>

            <CardContent> 
            <form className="space-y-4" >
                
                <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                    type="text"
                    name="name"
                    required
                    onChange={handleChange}
                />
                </div>

                <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
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
                Register
                </Button>

                <p className="text-center text-sm mt-2">
                Already have an account?{" "}
                <Link to="/" className="text-blue-600 hover:underline">
                    Login
                </Link>
                </p>
            </form>
            </CardContent>
        </Card>
        </div>
    );
}
