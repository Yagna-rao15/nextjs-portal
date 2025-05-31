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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Check,
  CreditCard,
  Download,
  FileText,
  Loader2,
  Receipt,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PaymentsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
      alert("Payment processed successfully! Receipt ID: REC-2025-0042");
    }, 1500);
  };

  const paymentHistory = [
    {
      id: "REC-2025-0041",
      date: "May 15, 2025",
      amount: 1200,
      type: "Hostel Fee",
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: "REC-2025-0035",
      date: "May 1, 2025",
      amount: 300,
      type: "Mess Fee",
      method: "Bank Transfer",
      status: "Completed",
    },
    {
      id: "REC-2025-0028",
      date: "April 15, 2025",
      amount: 50,
      type: "Late Fee",
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: "REC-2025-0020",
      date: "April 1, 2025",
      amount: 300,
      type: "Mess Fee",
      method: "Bank Transfer",
      status: "Completed",
    },
  ];

  const pendingPayments = [
    {
      id: "INV-2025-0042",
      dueDate: "May 31, 2025",
      amount: 300,
      type: "Mess Fee (June 2025)",
      status: "Pending",
    },
    {
      id: "INV-2025-0043",
      dueDate: "June 15, 2025",
      amount: 1200,
      type: "Hostel Fee (Fall 2025)",
      status: "Upcoming",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fee Payment</h1>
          <p className="text-muted-foreground">
            Manage your hostel and mess fee payments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Paid (2025)
                  </p>
                  <p className="text-3xl font-bold">$1,850</p>
                </div>
                <Receipt className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Payments
                  </p>
                  <p className="text-3xl font-bold">$1,500</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Next Due Date
                  </p>
                  <p className="text-3xl font-bold">May 31</p>
                </div>
                <AlertCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Due</AlertTitle>
          <AlertDescription>
            Your Mess Fee payment of $300 for June 2025 is due on May 31, 2025.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Payments</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="make">Make Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>
                  View and pay your pending and upcoming fee payments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{payment.type}</h3>
                            <Badge
                              variant={
                                payment.status === "Pending"
                                  ? "destructive"
                                  : "outline"
                              }
                            >
                              {payment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Invoice ID: {payment.id} • Due Date:{" "}
                            {payment.dueDate}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="font-bold text-lg">${payment.amount}</p>
                          <Button size="sm">Pay Now</Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Time Remaining</span>
                          <span className="font-medium">
                            {payment.status === "Pending"
                              ? "16 days left"
                              : "46 days left"}
                          </span>
                        </div>
                        <Progress
                          value={payment.status === "Pending" ? 65 : 20}
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  <p>* Late payments may incur additional fees.</p>
                  <p>
                    * Contact the hostel office if you need a payment extension.
                  </p>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Plans</CardTitle>
                <CardDescription>
                  Available payment plans for your hostel fees.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Semester Plan</CardTitle>
                      <CardDescription>Pay once per semester</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">$1,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span className="font-medium">June 15, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Discount:</span>
                        <span className="font-medium text-green-600">5%</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Select Plan</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Monthly Plan</CardTitle>
                      <CardDescription>
                        Pay in monthly installments
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">$210 x 6 months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          First Due:
                        </span>
                        <span className="font-medium">June 1, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Processing Fee:
                        </span>
                        <span className="font-medium text-red-600">$30</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Select Plan
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  View your previous payments and download receipts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Receipt ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">
                            {payment.id}
                          </TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.type}</TableCell>
                          <TableCell>{payment.method}</TableCell>
                          <TableCell>${payment.amount}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="flex w-fit items-center gap-1"
                            >
                              <Check className="h-3 w-3" />
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download receipt</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>4</strong> of <strong>12</strong> payments
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Annual Payment Statement
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="make">
            <Card>
              <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>
                  Pay your hostel or mess fees using your preferred payment
                  method.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="payment-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="payment-type">Payment Type</Label>
                      <Select required>
                        <SelectTrigger id="payment-type">
                          <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hostel">Hostel Fee</SelectItem>
                          <SelectItem value="mess">Mess Fee</SelectItem>
                          <SelectItem value="security">
                            Security Deposit
                          </SelectItem>
                          <SelectItem value="late">Late Fee</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-amount">Amount (USD)</Label>
                      <Input
                        id="payment-amount"
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="Enter amount"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            <span className="font-medium">Credit Card</span>
                          </div>
                        </div>
                        <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            <span className="font-medium">Bank Transfer</span>
                          </div>
                        </div>
                        <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                          <div className="flex items-center gap-2">
                            <Receipt className="h-5 w-5" />
                            <span className="font-medium">Cash (Office)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4 space-y-4">
                      <h3 className="font-medium">Credit Card Details</h3>

                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input
                          id="card-name"
                          placeholder="Enter name as on card"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="XXXX XXXX XXXX XXXX"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry-date">Expiry Date</Label>
                          <Input id="expiry-date" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="XXX" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-notes">Notes (Optional)</Label>
                      <Input
                        id="payment-notes"
                        placeholder="Any additional information about this payment"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button
                  type="submit"
                  form="payment-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Make Payment"
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Financial Aid & Scholarships</CardTitle>
                <CardDescription>
                  Apply for financial assistance or check your scholarship
                  status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Available Scholarships</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Merit Scholarship</p>
                          <p className="text-sm text-muted-foreground">
                            For students with GPA 3.5 or higher
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Apply
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            Need-Based Financial Aid
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Based on financial need assessment
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Apply
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">
                            Sports Excellence Scholarship
                          </p>
                          <p className="text-sm text-muted-foreground">
                            For university team players
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Payment Plan Options</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      If you`&apos;`re unable to pay the full amount at once,
                      you can apply for a payment plan.
                    </p>
                    <Button variant="outline" className="w-full">
                      Request Payment Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <a href="#">
                    View All Financial Aid Options
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
