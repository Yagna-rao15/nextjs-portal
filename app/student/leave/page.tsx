"use client";

import type React from "react";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  Check,
  Clock,
  FileText,
  Loader2,
  Phone,
  User,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function LeaveManagementPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
      alert(
        "Leave application submitted successfully! Reference ID: LEAVE-2025-0031",
      );
    }, 1500);
  };

  const previousLeaves = [
    {
      id: "LEAVE-2025-0030",
      type: "Home Visit",
      from: "May 10, 2025",
      to: "May 12, 2025",
      status: "Approved",
      appliedOn: "May 5, 2025",
    },
    {
      id: "LEAVE-2025-0025",
      type: "Medical",
      from: "April 22, 2025",
      to: "April 24, 2025",
      status: "Completed",
      appliedOn: "April 20, 2025",
    },
    {
      id: "LEAVE-2025-0018",
      type: "Family Function",
      from: "March 15, 2025",
      to: "March 18, 2025",
      status: "Completed",
      appliedOn: "March 10, 2025",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Leave Management
          </h1>
          <p className="text-muted-foreground">
            Apply for leave and track your leave applications.
          </p>
        </div>

        <Tabs defaultValue="new" className="space-y-4">
          <TabsList>
            <TabsTrigger value="new">New Application</TabsTrigger>
            <TabsTrigger value="history">Leave History</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Apply for Leave</CardTitle>
                <CardDescription>
                  Fill in the details below to submit a leave application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="leave-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="leave-type">Leave Type</Label>
                      <Select required>
                        <SelectTrigger id="leave-type">
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Home Visit</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="family">
                            Family Function
                          </SelectItem>
                          <SelectItem value="emergency">
                            Family Emergency
                          </SelectItem>
                          <SelectItem value="academic">
                            Academic Purpose
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>From Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !fromDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {fromDate ? (
                                format(fromDate, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={fromDate}
                              onSelect={setFromDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>To Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !toDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {toDate ? (
                                format(toDate, "PPP")
                              ) : (
                                <span>Select date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={toDate}
                              onSelect={setToDate}
                              initialFocus
                              disabled={(date) =>
                                (fromDate ? date < fromDate : false) ||
                                date < new Date()
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Is this an emergency?</Label>
                      <RadioGroup defaultValue="no">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" />
                          <Label htmlFor="no">No</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" />
                          <Label htmlFor="yes">Yes</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Leave</Label>
                      <Textarea
                        id="reason"
                        placeholder="Please provide detailed reason for your leave..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Travel Information</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="destination">Destination</Label>
                          <Input
                            id="destination"
                            placeholder="City, State"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="travel-mode">Mode of Travel</Label>
                          <Select required>
                            <SelectTrigger id="travel-mode">
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bus">Bus</SelectItem>
                              <SelectItem value="train">Train</SelectItem>
                              <SelectItem value="flight">Flight</SelectItem>
                              <SelectItem value="car">
                                Personal Vehicle
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Emergency Contact During Leave</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contact-name">Contact Name</Label>
                          <div className="flex">
                            <div className="relative flex items-center">
                              <User className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="contact-name"
                                className="pl-8"
                                placeholder="Full Name"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-phone">Contact Phone</Label>
                          <div className="flex">
                            <div className="relative flex items-center">
                              <Phone className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="contact-phone"
                                className="pl-8"
                                placeholder="Phone Number"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additional-info">
                        Additional Information (Optional)
                      </Label>
                      <Textarea
                        id="additional-info"
                        placeholder="Any additional information you'd like to provide..."
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" form="leave-form" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Leave History</CardTitle>
                <CardDescription>
                  View and track the status of your previous leave applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {previousLeaves.map((leave) => (
                    <div
                      key={leave.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{leave.id}</h3>
                            <Badge
                              variant={
                                leave.status === "Approved"
                                  ? "default"
                                  : leave.status === "Completed"
                                    ? "outline"
                                    : leave.status === "Rejected"
                                      ? "destructive"
                                      : "secondary"
                              }
                            >
                              {leave.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Applied on {leave.appliedOn}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Leave Type
                          </p>
                          <p className="font-medium">{leave.type}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Duration
                          </p>
                          <p className="font-medium">
                            {leave.from} to {leave.to}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Status
                          </p>
                          <div className="flex items-center gap-1">
                            {leave.status === "Approved" ? (
                              <>
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span>Upcoming</span>
                              </>
                            ) : leave.status === "Completed" ? (
                              <>
                                <Check className="h-4 w-4 text-green-600" />
                                <span>Completed</span>
                              </>
                            ) : (
                              <>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>{leave.status}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
