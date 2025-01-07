"use client";

import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { verifySession } from "@/lib/dal";
import { startTransition } from "react";
import { submitComplain } from "@/actions/complain";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FileType = File | null;

const ComplainForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setComplainType] = useState<string>("");
  const [hostel, setHostel] = useState<string>("");
  const [file, setFiles] = useState<FileType>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  React.useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await verifySession();
        if (session.isAuth) {
          setEmail(session.userId);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        window.location.href = "/login";
      }
    };
    fetchSession();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("complainType", type);
      formData.append("hostel", hostel);
      formData.append("name", name);
      formData.append("room", room);
      formData.append("mobile", mobile);
      formData.append("description", description);
      if (file) {
        formData.append("file", file);
      }

      startTransition(async () => {
        const result = await submitComplain(formData);

        if (result.success && result.message) {
          setMessage(result.message);
        } else if (result.error) {
          setMessage(result.error.toString || "Failed to submit the complaint.");
        }
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight">Complaint Registration</CardTitle>
          <CardDescription className="text-gray-500">
            Please provide the details of your complaint below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Complaint Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="complainType">
                  Complaint Type
                </label>
                <Select required onValueChange={setComplainType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Mess">Mess</SelectItem>
                    <SelectItem value="Electricity">Electricity</SelectItem>
                    <SelectItem value="Bathroom">Bathroom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hostel Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="hostel">
                  Hostel
                </label>
                <Select required onValueChange={setHostel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select hostel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gajjar Bhavan">Gajjar Bhavan</SelectItem>
                    <SelectItem value="Atal Bihari Vajpaye Bhavan">Atal Bihari Vajpaye Bhavan</SelectItem>
                    <SelectItem value="Bhabha Bhavan">Bhabha Bhavan</SelectItem>
                    <SelectItem value="Tagore Bhavan">Tagore Bhavan</SelectItem>
                    <SelectItem value="Swamy Bhavan">Swamy Bhavan</SelectItem>
                    <SelectItem value="Mother Teresa Bhavan">Mother Teresa Bhavan</SelectItem>
                    <SelectItem value="Raman Bhavan">Raman Bhavan</SelectItem>
                    <SelectItem value="Sarabhai Bhavan">Sarabhai Bhavan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="name">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Room Number Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="room">
                  Room & Floor
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Room 101, First Floor"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Mobile Number Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="mobile">
                  Mobile Number
                </label>
                <Input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="file">
                  Attachments
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    onChange={(e) => setFiles(e.target.files ? e.target.files[0] : null)}
                    className="w-full"
                  />
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Description Input - Full Width */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="description">
                Description
              </label>
              <Textarea
                placeholder="Please provide detailed information about your complaint..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>

            {/* Error Message */}
            {message && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full max-w-xs"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ComplainForm;
