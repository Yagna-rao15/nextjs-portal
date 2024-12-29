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

// Define file type
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

  // Fetch the session and email when the component mounts
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
          setMessage(result.error.toString || "Failed to submit the complain.");
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
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-6 p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="text-black font-bold text-2xl text-center">Complaint Form</div>
      <div className="text-gray-500 text-center text-lg">Please register your complaint below</div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Complain Type */}
        <div className="flex flex-col">
          <label className="text-black font-medium text-lg" htmlFor="complainType">
            Complaint Type
          </label>
          <Select required onValueChange={setComplainType}>
            <SelectTrigger className="w-full text-black border border-gray-300 rounded-md p-2">
              <SelectValue placeholder="Select Complaint Type" />
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
        <div className="flex flex-col">
          <label className="text-black font-medium text-lg" htmlFor="hostel">
            Select Hostel
          </label>
          <Select required onValueChange={setHostel}>
            <SelectTrigger className="w-full text-black border border-gray-300 rounded-md p-2">
              <SelectValue placeholder="Select Hostel" />
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
        <div className="flex flex-col">
          <label className="text-black font-medium text-lg" htmlFor="name">
            Your Name
          </label>
          <Input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Room Number Input */}
        <div className="flex flex-col">
          <label className="text-black font-medium text-lg" htmlFor="room">
            Room Number & Floor
          </label>
          <Input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Room and floor number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
        </div>

        {/* Mobile Number Input */}
        <div className="flex flex-col">
          <label className="text-black font-medium text-lg" htmlFor="mobile">
            Mobile Number
          </label>
          <Input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col">
          <label className="text-black font-medium text-lg" htmlFor="description">
            Description
          </label>
          <Textarea
            placeholder="Provide a brief description of your complaint"
            className="w-full p-2 border border-gray-300 rounded-md"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* File Input */}
        <div className="flex flex-col">
          <label className="text-black font-medium text-lg" htmlFor="file">
            Attach Related Files (Optional)
          </label>
          <Input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="file"
            onChange={(e) => setFiles(e.target.files ? e.target.files[0] : null)}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button className="w-80 py-2 bg-black-600 text-white rounded-md" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Complaint"}
          </Button>
        </div>

        {/* Error Message */}
        {message && <p className="text-red-500 text-center mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default ComplainForm;

