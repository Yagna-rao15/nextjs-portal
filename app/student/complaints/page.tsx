"use client";

import type React from "react";

import { useState, useEffect } from "react";
// import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
import { Check, Clock, FileImage, Loader2, Star, Upload, X } from "lucide-react";
import { fetchUserComplaints, getUserEmailFromCookie, submitComplaint } from "@/actions/complain";
import { useRouter } from "next/navigation";

interface Complaint {
  id: string;
  category: string;
  priority: string;
  status: string;
  date: string;
  description: string;
  rating?: number | null;
  building?: string;
  floor?: string;
  room?: string;
  location?: string;
  resolvedDate?: string;
  expectedResolution?: string;
}

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

export default function ComplaintsPage() {
  const [email, setEmail] = useState("");
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
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [authCheck, setAuthCheck] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const userEmail = await getUserEmailFromCookie();
      if (userEmail) {
        setEmail(userEmail);
        loadComplaints(userEmail);
      } else {
        router.push("/login");
      }
      setTimeout(() => {}, 5000);
      setAuthCheck(true);
    })();
  }, [router]);

  const loadComplaints = async (userEmail: string) => {
    if (!userEmail) {
      setIsLoading(false);
      return;
    }

    try {
      const userComplaints = await fetchUserComplaints(userEmail);
      const transformed = userComplaints.map((c) => ({
        ...c,
        date: new Date(c.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }));

      setComplaints(transformed);
    } catch (error) {
      console.error("Failed to load complaints:", error);
    } finally {
      setIsLoading(false);
    }
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
        await loadComplaints(email);
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "normal":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!authCheck) {
    return <div className="text-center py-10">Checking authentication...</div>; // loading UI
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl text-center font-bold tracking-tight">Complaint Management</h1>
          <p className="text-muted-foreground text-center">
            Register and track your complaints about hostel facilities.
          </p>
        </div>

        <Tabs defaultValue="new" className="space-y-4 items-center">
          <TabsList>
            <TabsTrigger value="new">New Complaint</TabsTrigger>
            <TabsTrigger value="history">Complaint History</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="max-w-xl">
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
          </TabsContent>
          <TabsContent value="history" className="max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Complaint History</CardTitle>
                <CardDescription>View and track the status of your previous complaints</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading complaints...</span>
                  </div>
                ) : complaints.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">No complaints found</p>
                      <p className="text-sm">Submit your first complaint to get started</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {complaints.map((complaint) => (
                      <div
                        key={complaint.id}
                        className="border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="font-semibold text-lg">{complaint.id}</h3>
                              <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                              <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                                {complaint.priority} Priority
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                              <span>{complaint.date}</span>
                              <span>•</span>
                              <span className="capitalize">{complaint.category}</span>
                              {complaint.building && (
                                <>
                                  <span>•</span>
                                  <span>{complaint.building}</span>
                                </>
                              )}
                              {complaint.room && (
                                <>
                                  <span>•</span>
                                  <span>Room {complaint.room}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {complaint.status === "Resolved" && complaint.rating ? (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Rating:</span>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= complaint.rating!
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : complaint.status === "Resolved" ? (
                              <Button size="sm" variant="outline">
                                Rate Resolution
                              </Button>
                            ) : null}
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed bg-muted/30 p-3 rounded-md">{complaint.description}</p>

                        <div className="flex justify-between items-center pt-3 border-t">
                          <div className="flex items-center gap-2 text-sm">
                            {complaint.status === "Resolved" ? (
                              <div className="flex items-center gap-2 text-green-600">
                                <Check className="h-4 w-4" />
                                <span>Resolved on {complaint.resolvedDate || "N/A"}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-blue-600">
                                <Clock className="h-4 w-4" />
                                <span>Expected resolution: {complaint.expectedResolution || "TBD"}</span>
                              </div>
                            )}
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
