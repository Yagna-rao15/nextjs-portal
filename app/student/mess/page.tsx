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
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  Calendar,
  Clock,
  Coffee,
  Loader2,
  MessageSquare,
  Star,
  ThumbsDown,
  ThumbsUp,
  Utensils,
} from "lucide-react";

export default function MessManagementPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
      alert("Feedback submitted successfully!");
    }, 1500);
  };

  const weeklyMenu = [
    {
      day: "Monday",
      meals: [
        {
          type: "Breakfast",
          items: [
            "Bread & Butter",
            "Boiled Eggs",
            "Cereal",
            "Milk",
            "Tea/Coffee",
          ],
        },
        {
          type: "Lunch",
          items: [
            "Rice",
            "Dal",
            "Mixed Vegetables",
            "Chicken Curry",
            "Salad",
            "Yogurt",
          ],
        },
        {
          type: "Dinner",
          items: [
            "Chapati",
            "Paneer Butter Masala",
            "Jeera Rice",
            "Dal Fry",
            "Ice Cream",
          ],
        },
        {
          type: "Breakfast1",
          items: [
            "Bread & Butter",
            "Boiled Eggs",
            "Cereal",
            "Milk",
            "Tea/Coffee",
          ],
        },
        {
          type: "Lunch2",
          items: [
            "Rice",
            "Dal",
            "Mixed Vegetables",
            "Chicken Curry",
            "Salad",
            "Yogurt",
          ],
        },
        {
          type: "Dinner3",
          items: [
            "Chapati",
            "Paneer Butter Masala",
            "Jeera Rice",
            "Dal Fry",
            "Ice Cream",
          ],
        },
      ],
    },
    {
      day: "Tuesday",
      meals: [
        {
          type: "Breakfast",
          items: [
            "Idli",
            "Sambar",
            "Coconut Chutney",
            "Fruit Juice",
            "Tea/Coffee",
          ],
        },
        {
          type: "Lunch",
          items: ["Rice", "Rajma", "Aloo Gobi", "Curd", "Papad", "Salad"],
        },
        {
          type: "Dinner",
          items: [
            "Chapati",
            "Mix Veg Curry",
            "Pulao",
            "Dal Tadka",
            "Fruit Custard",
          ],
        },
      ],
    },
    {
      day: "Wednesday",
      meals: [
        {
          type: "Breakfast",
          items: ["Poha", "Upma", "Boiled Eggs", "Fruit Juice", "Tea/Coffee"],
        },
        {
          type: "Lunch",
          items: [
            "Rice",
            "Chana Masala",
            "Bhindi Fry",
            "Raita",
            "Pickle",
            "Salad",
          ],
        },
        {
          type: "Dinner",
          items: [
            "Chapati",
            "Egg Curry",
            "Veg Biryani",
            "Dal Makhani",
            "Gulab Jamun",
          ],
        },
      ],
    },
    {
      day: "Thursday",
      meals: [
        {
          type: "Breakfast",
          items: ["Paratha", "Curd", "Fruit Bowl", "Milk", "Tea/Coffee"],
        },
        {
          type: "Lunch",
          items: [
            "Rice",
            "Dal",
            "Aloo Matar",
            "Fish Curry",
            "Salad",
            "Buttermilk",
          ],
        },
        {
          type: "Dinner",
          items: ["Chapati", "Malai Kofta", "Jeera Rice", "Dal Fry", "Kheer"],
        },
      ],
    },
    {
      day: "Friday",
      meals: [
        {
          type: "Breakfast",
          items: [
            "Dosa",
            "Sambar",
            "Coconut Chutney",
            "Fruit Juice",
            "Tea/Coffee",
          ],
        },
        {
          type: "Lunch",
          items: ["Rice", "Kadhi Pakora", "Mix Veg", "Curd", "Papad", "Salad"],
        },
        {
          type: "Dinner",
          items: [
            "Chapati",
            "Chicken Curry",
            "Veg Pulao",
            "Dal Tadka",
            "Fruit Salad",
          ],
        },
      ],
    },
    {
      day: "Saturday",
      meals: [
        {
          type: "Breakfast",
          items: ["Puri", "Aloo Sabzi", "Boiled Eggs", "Milk", "Tea/Coffee"],
        },
        {
          type: "Lunch",
          items: ["Rice", "Dal", "Baingan Bharta", "Raita", "Pickle", "Salad"],
        },
        {
          type: "Dinner",
          items: [
            "Chapati",
            "Matar Paneer",
            "Veg Biryani",
            "Dal Fry",
            "Ice Cream",
          ],
        },
      ],
    },
    {
      day: "Sunday",
      meals: [
        {
          type: "Breakfast",
          items: ["Chole Bhature", "Fruit Bowl", "Fruit Juice", "Tea/Coffee"],
        },
        {
          type: "Lunch",
          items: [
            "Rice",
            "Dal",
            "Seasonal Veg",
            "Mutton Curry",
            "Salad",
            "Raita",
          ],
        },
        {
          type: "Dinner",
          items: [
            "Chapati",
            "Shahi Paneer",
            "Pulao",
            "Dal Makhani",
            "Rasmalai",
          ],
        },
      ],
    },
  ];

  const specialDiets = [
    { id: "veg", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten Free" },
    { id: "diabetic", label: "Diabetic" },
    { id: "low-sodium", label: "Low Sodium" },
    { id: "high-protein", label: "High Protein" },
  ];

  const feedbackHistory = [
    {
      id: 1,
      date: "May 15, 2025",
      meal: "Lunch",
      rating: 4,
      feedback:
        "The food was good overall. The chicken curry was excellent, but the rice was a bit undercooked.",
      response:
        "Thank you for your feedback. We'll work on improving the rice preparation.",
    },
    {
      id: 2,
      date: "May 10, 2025",
      meal: "Dinner",
      rating: 2,
      feedback: "The paneer dish was too spicy and the chapatis were hard.",
      response: null,
    },
    {
      id: 3,
      date: "May 5, 2025",
      meal: "Breakfast",
      rating: 5,
      feedback:
        "Excellent breakfast today! The dosas were crispy and the sambar was flavorful.",
      response:
        "We're glad you enjoyed your breakfast. Thank you for your positive feedback!",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mess Management</h1>
          <p className="text-muted-foreground">
            View menu, provide feedback, and manage your meal preferences.
          </p>
        </div>

        <Tabs defaultValue="menu" className="space-y-4">
          <TabsList>
            <TabsTrigger value="menu">Weekly Menu</TabsTrigger>
            <TabsTrigger value="feedback">Provide Feedback</TabsTrigger>
            <TabsTrigger value="preferences">Meal Preferences</TabsTrigger>
            <TabsTrigger value="history">Feedback History</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Menu</CardTitle>
                <CardDescription>
                  View the mess menu for the current week.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">May 20 - May 26, 2025</h3>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Next Week
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {weeklyMenu.map((day) => (
                      <div key={day.day} className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">
                          {day.day}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {day.meals.map((meal) => (
                            <Card key={meal.type}>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base flex items-center">
                                  {meal.type === "Breakfast" ? (
                                    <Coffee className="mr-2 h-4 w-4" />
                                  ) : (
                                    <Utensils className="mr-2 h-4 w-4" />
                                  )}
                                  {meal.type}
                                </CardTitle>
                                <CardDescription>
                                  {meal.type === "Breakfast"
                                    ? "7:00 AM - 9:00 AM"
                                    : meal.type === "Lunch"
                                      ? "12:00 PM - 2:00 PM"
                                      : "7:00 PM - 9:00 PM"}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                  {meal.items.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  <p>
                    * Menu is subject to change based on availability of
                    ingredients.
                  </p>
                  <p>* Special diet options are available upon request.</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Provide Feedback</CardTitle>
                <CardDescription>
                  Share your thoughts on the mess food and service.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="feedback-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="meal-date">Date</Label>
                        <Select required>
                          <SelectTrigger id="meal-date">
                            <SelectValue placeholder="Select date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="today">
                              Today (May 19, 2025)
                            </SelectItem>
                            <SelectItem value="yesterday">
                              Yesterday (May 18, 2025)
                            </SelectItem>
                            <SelectItem value="day-before">
                              Day Before (May 17, 2025)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="meal-type">Meal</Label>
                        <Select required>
                          <SelectTrigger id="meal-type">
                            <SelectValue placeholder="Select meal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="breakfast">Breakfast</SelectItem>
                            <SelectItem value="lunch">Lunch</SelectItem>
                            <SelectItem value="dinner">Dinner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Overall Rating</Label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Button
                              key={star}
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:text-yellow-500"
                            >
                              <Star className="h-6 w-6" />
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Food Quality</Label>
                        <RadioGroup defaultValue="good">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="excellent" id="excellent" />
                            <Label htmlFor="excellent">Excellent</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="good" id="good" />
                            <Label htmlFor="good">Good</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="average" id="average" />
                            <Label htmlFor="average">Average</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="poor" id="poor" />
                            <Label htmlFor="poor">Poor</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Service Quality</Label>
                        <RadioGroup defaultValue="good">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="excellent"
                              id="service-excellent"
                            />
                            <Label htmlFor="service-excellent">Excellent</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="good" id="service-good" />
                            <Label htmlFor="service-good">Good</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="average"
                              id="service-average"
                            />
                            <Label htmlFor="service-average">Average</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="poor" id="service-poor" />
                            <Label htmlFor="service-poor">Poor</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-text">Detailed Feedback</Label>
                    <Textarea
                      id="feedback-text"
                      placeholder="Please share your detailed feedback about the food and service..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>What did you like?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="taste" />
                        <label htmlFor="taste" className="text-sm">
                          Taste
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="variety" />
                        <label htmlFor="variety" className="text-sm">
                          Variety
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="quantity" />
                        <label htmlFor="quantity" className="text-sm">
                          Quantity
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="freshness" />
                        <label htmlFor="freshness" className="text-sm">
                          Freshness
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cleanliness" />
                        <label htmlFor="cleanliness" className="text-sm">
                          Cleanliness
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="service" />
                        <label htmlFor="service" className="text-sm">
                          Service
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>What needs improvement?</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="taste-improve" />
                        <label htmlFor="taste-improve" className="text-sm">
                          Taste
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="variety-improve" />
                        <label htmlFor="variety-improve" className="text-sm">
                          Variety
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="quantity-improve" />
                        <label htmlFor="quantity-improve" className="text-sm">
                          Quantity
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="freshness-improve" />
                        <label htmlFor="freshness-improve" className="text-sm">
                          Freshness
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cleanliness-improve" />
                        <label
                          htmlFor="cleanliness-improve"
                          className="text-sm"
                        >
                          Cleanliness
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="service-improve" />
                        <label htmlFor="service-improve" className="text-sm">
                          Service
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="suggestions">
                      Suggestions for Improvement (Optional)
                    </Label>
                    <Textarea
                      id="suggestions"
                      placeholder="Any suggestions to improve the mess food and service..."
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button
                  type="submit"
                  form="feedback-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Meal Preferences</CardTitle>
                <CardDescription>
                  Set your dietary preferences and special meal requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Dietary Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="diet-type">Primary Diet Type</Label>
                        <Select>
                          <SelectTrigger id="diet-type">
                            <SelectValue placeholder="Select diet type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="regular">
                              Regular (Non-Vegetarian)
                            </SelectItem>
                            <SelectItem value="vegetarian">
                              Vegetarian
                            </SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Special Diet Requirements</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {specialDiets.map((diet) => (
                            <div
                              key={diet.id}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={diet.id} />
                              <label htmlFor={diet.id} className="text-sm">
                                {diet.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Allergies & Restrictions</h3>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Food Allergies</Label>
                      <Textarea
                        id="allergies"
                        placeholder="List any food allergies you have..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="restrictions">Food Restrictions</Label>
                      <Textarea
                        id="restrictions"
                        placeholder="List any food items you cannot eat..."
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Meal Attendance</h3>
                    <div className="space-y-2">
                      <Label>Regular Meals You Will Attend</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2 border rounded-md p-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="breakfast" className="font-medium">
                              Breakfast
                            </Label>
                            <Checkbox id="breakfast" />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            7:00 AM - 9:00 AM
                          </p>
                        </div>

                        <div className="space-y-2 border rounded-md p-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="lunch" className="font-medium">
                              Lunch
                            </Label>
                            <Checkbox id="lunch" defaultChecked />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            12:00 PM - 2:00 PM
                          </p>
                        </div>

                        <div className="space-y-2 border rounded-md p-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="dinner" className="font-medium">
                              Dinner
                            </Label>
                            <Checkbox id="dinner" defaultChecked />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            7:00 PM - 9:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Feedback History</CardTitle>
                <CardDescription>
                  View your previous feedback and responses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {feedbackHistory.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {feedback.meal} on {feedback.date}
                            </h3>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <ThumbsDown className="h-4 w-4" />
                            Not Helpful
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Your Feedback</p>
                            <p className="text-sm">{feedback.feedback}</p>
                          </div>
                        </div>

                        {feedback.response && (
                          <div className="flex items-start gap-2 pl-6 mt-4">
                            <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="font-medium">
                                Response from Mess Committee
                              </p>
                              <p className="text-sm">{feedback.response}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>Submitted on {feedback.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <a href="#">
                    View All Feedback
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
