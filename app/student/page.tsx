"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, Bell, Building2, Calendar, CreditCard, FileText, Utensils, Wifi } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function StudentDashboard() {
  const [studentName] = useState("John Doe");
  const [roomInfo] = useState({
    roomNumber: "A-101",
    block: "A",
    floor: "1st Floor",
    roomType: "Double Sharing",
    roommates: ["Sarah Johnson"],
  });

  const [notifications] = useState([
    {
      id: 1,
      title: "Maintenance Notice",
      description: "Water supply will be interrupted on Saturday from 10 AM to 2 PM for maintenance.",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Fee Reminder",
      description: "Your hostel fee for the next semester is due in 5 days.",
      time: "1 day ago",
    },
    {
      id: 3,
      title: "Event Invitation",
      description: "Cultural night at the hostel common area this Friday at 7 PM.",
      time: "2 days ago",
    },
  ]);

  const [events] = useState([
    { id: 1, title: "Hostel Meeting", date: "May 21, 2025", time: "6:00 PM" },
    { id: 2, title: "Room Inspection", date: "May 25, 2025", time: "10:00 AM" },
    { id: 3, title: "Cultural Night", date: "May 28, 2025", time: "7:00 PM" },
  ]);

  const [quickLinks] = useState([
    { title: "Mess Menu", icon: Utensils, href: "/student/mess" },
    {
      title: "Maintenance Request",
      icon: Building2,
      href: "/student/complaints",
    },
    { title: "Wi-Fi Support", icon: Wifi, href: "/student/wifi" },
    { title: "Leave Application", icon: FileText, href: "/student/leave" },
    { title: "Fee Payment", icon: CreditCard, href: "/student/payments" },
    { title: "Hostel Calendar", icon: Calendar, href: "/student/calendar" },
  ]);

  return (
    <DashboardLayout name="Yagna Rao">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Welcome Card */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Welcome back, {studentName}</CardTitle>
              <CardDescription>Student ID: STU2025001</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Computer Science, Year 2</p>
                  <p className="text-sm text-muted-foreground">john.doe@university.edu</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Information Card */}
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Room Information</CardTitle>
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room Number:</span>
                <span className="font-medium">{roomInfo.roomNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Block:</span>
                <span className="font-medium">{roomInfo.block}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Floor:</span>
                <span className="font-medium">{roomInfo.floor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Room Type:</span>
                <span className="font-medium">{roomInfo.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Roommate:</span>
                <span className="font-medium">{roomInfo.roommates.join(", ")}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Request Room Change
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Alert for Important Announcements */}
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Announcement</AlertTitle>
          <AlertDescription>
            Hostel maintenance scheduled for this weekend. Please ensure your rooms are accessible.
          </AlertDescription>
        </Alert>

        {/* Quick Access Tiles */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <Card key={index} className="hover:bg-muted transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <link.icon className="h-8 w-8 mb-2 text-primary" />
                  <span className="text-sm font-medium">{link.title}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hostel Fee (Spring 2025)</span>
                  <span className="font-medium">$1,200 / $1,500</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mess Fee (May 2025)</span>
                  <span className="font-medium">$300 / $300</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Security Deposit</span>
                  <span className="font-medium">$500 / $500</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full">
                Make Payment
              </Button>
            </CardFooter>
          </Card>

          {/* Calendar Events Card */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-md p-2 text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Events
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Notifications</CardTitle>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex gap-4 items-start border-b pb-4 last:border-0 last:pb-0">
                  <div className="bg-primary/10 rounded-full p-2 text-primary">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{notification.title}</p>
                      <Badge variant="outline" className="text-xs">
                        {notification.time}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full gap-1">
              View All Notifications
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
