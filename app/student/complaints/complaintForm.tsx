"use client";
import { useState } from "react";
import { submitComplaint } from "@/actions/complain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileImage, Loader2, Upload, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface FormErrors {
  email?: string;
  category?: string;
  name?: string;
  mobile?: string;
  building?: string;
  location?: string;
  description?: string;
  files?: string;
  submit?: string;
}

export default function ComplaintForm({ email }: { email: string }) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const resetForm = () => {
    setCategory("");
    setName("");
    setMobile("");
    setBuilding("");
    setFloor("");
    setRoom("");
    setLocation("");
    setDescription("");
    setSelectedFiles([]);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }
    if (!category) {
      newErrors.category = "Please select a complaint category";
    }

    if (!building) {
      newErrors.building = "Please select a building";
    }

    if (!location) {
      newErrors.location = "Please select a location type";
    }

    if (!description.trim()) {
      newErrors.description = "Please provide a detailed description";
    } else if (description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    if (selectedFiles.length > 5) {
      newErrors.files = "Maximum 5 files allowed";
    }

    for (const file of selectedFiles) {
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        newErrors.files = "Only PNG, JPG, and JPEG files are allowed";
        break;
      }
      if (file.size > 5 * 1024 * 1024) {
        newErrors.files = "Each file must be less than 5MB";
        break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFiles = [...selectedFiles, ...filesArray].slice(0, 5);
      setSelectedFiles(newFiles);
      if (errors.files) {
        setErrors((prev) => ({ ...prev, files: undefined }));
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 10) {
      setMobile(value);
      if (errors.mobile) {
        setErrors((prev) => ({ ...prev, mobile: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("category", category);
      formData.append("name", name);
      formData.append("mobile", mobile);
      formData.append("building", building);
      formData.append("floor", floor);
      formData.append("room", room);
      formData.append("location", location);
      formData.append("description", description);

      selectedFiles.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      const result = await submitComplaint(formData);

      if (result.success) {
        resetForm();
        // TODO: FIX THIS
        // await loadComplaints(email);
        setTimeout(() => {}, 5000);
      } else {
        setErrors({ submit: result.error || "Failed to submit complaint. Please try again." });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register a New Complaint</CardTitle>
        <CardDescription>
          Fill in the details below to submit a new complaint. Add photos if applicable.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="complaint-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select required value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="internet">Internet</SelectItem>
                    <SelectItem value="cleaning">Cleanliness</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="mess">Mess/Food</SelectItem>
                    <SelectItem value="others">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="" htmlFor="name">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="" htmlFor="mobile">
                  Mobile Number
                </Label>
                <Input
                  type="tel"
                  id="mobile"
                  placeholder="Enter 10-digit number"
                  value={mobile}
                  onChange={handleMobileChange}
                  required
                  className={`w-full ${errors.mobile ? "border-red-500" : ""}`}
                />
                {errors.mobile && <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="building">Building</Label>
                <Select required value={building} onValueChange={setBuilding}>
                  <SelectTrigger id="building" className="w-full">
                    <SelectValue placeholder="Select building" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bhabha">Bhabha Bhavan</SelectItem>
                    <SelectItem value="swami">Swami Vivekananda Bhavan</SelectItem>
                    <SelectItem value="gajjar">Gajjar Bhavan</SelectItem>
                    <SelectItem value="abvb">Atal Bihari Vajpeyi Bhavan</SelectItem>
                    <SelectItem value="tagore">Tagore Bhavan</SelectItem>
                    <SelectItem value="mtb">Mother Teresa Bhavan</SelectItem>
                    <SelectItem value="raman">Raman Bhavan</SelectItem>
                    <SelectItem value="sarabhai">Sarabhai Bhavan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="floor">Floor</Label>
                  <Input
                    id="floor"
                    className="w-full"
                    placeholder="e.g. 1st Floor"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room">Room Number</Label>
                  <Input
                    id="room"
                    className="w-full"
                    placeholder="e.g. A-101"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location Type</Label>
                <Select required value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location" className="w-full">
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="corridor">Corridor</SelectItem>
                    <SelectItem value="common">Common Area</SelectItem>
                    <SelectItem value="mess">Mess Hall</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              placeholder="Please describe the issue in detail..."
              className="min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photos">Upload Photos (Optional)</Label>
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 5MB)</p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Selected Files:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                        <div className="flex items-center space-x-2 truncate">
                          <FileImage className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm truncate">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" form="complaint-form" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Complaint"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
