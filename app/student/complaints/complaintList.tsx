"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComplaintData } from "@/lib/interface";
import { Check, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { useState } from "react";
import { updateComplaintRating } from "@/actions/complain";
import ComplaintDetails, { getPriorityColor, getStatusColor } from "./complaintDetails";
import ComplaintRating from "./complainRating";

export default function ComplainList({ Complaints }: { Complaints: ComplaintData[] }) {
  const { theme } = useTheme();
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedComplaintForRating, setSelectedComplaintForRating] = useState<string | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedComplaintForDetails, setSelectedComplaintForDetails] = useState<ComplaintData | null>(null);
  const [complaints, setComplaints] = useState<ComplaintData[]>(Complaints);

  const handleRateComplaint = (complaintId: string) => {
    setSelectedComplaintForRating(complaintId);
    setRatingDialogOpen(true);
  };

  const handleViewDetails = (complaint: ComplaintData) => {
    setSelectedComplaintForDetails(complaint);
    setDetailsModalOpen(true);
  };

  const handleSubmitRating = async (rating: number) => {
    if (!selectedComplaintForRating) return;

    try {
      const result = await updateComplaintRating(selectedComplaintForRating, rating);

      if (result?.success) {
        setComplaints((prev) =>
          prev.map((complaint) => (complaint.id === selectedComplaintForRating ? { ...complaint, rating } : complaint)),
        );
        setRatingDialogOpen(false);
        setSelectedComplaintForRating(null);
      } else {
        alert(result?.error || "Failed to submit rating");
      }
    } catch (error) {
      console.error("Rating submission error:", error);
      alert("An error occurred while submitting the rating");
    }
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedComplaintForDetails(null);
  };

  const handleCloseRatingDialog = () => {
    setRatingDialogOpen(false);
    setSelectedComplaintForRating(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complaint History</CardTitle>
        <CardDescription>View and track the status of your previous complaints</CardDescription>
      </CardHeader>
      <CardContent>
        {complaints.length === 0 ? (
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
              <div key={complaint.id} className="border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg">{complaint.id}</h3>
                      <Badge className={getStatusColor(complaint.status, theme)}>{complaint.status}</Badge>
                      <Badge variant="outline" className={getPriorityColor(complaint.priority, theme)}>
                        {complaint.priority} Priority
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                      <span>{complaint.createdAt}</span>
                      <span>•</span>
                      <span className="capitalize">{complaint.category}</span>
                      {complaint.building && (
                        <>
                          <span>•</span>
                          <span className="capitalize">{complaint.building}</span>
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
                                star <= complaint.rating! ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : complaint.status === "Resolved" ? (
                      <Button size="sm" variant="outline" onClick={() => handleRateComplaint(complaint.id)}>
                        Rate Resolution
                      </Button>
                    ) : null}
                  </div>
                </div>

                <p className="text-sm leading-relaxed bg-muted/30 p-3 rounded-md">{complaint.description}</p>

                <div className="flex justify-between gap-4 items-center pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    {complaint.status === "Resolved" ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="h-4 w-4" />
                        <span>Resolved on {complaint.resolvedDate || "N/A"}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-primary">
                        <Clock className="h-4 w-4 text-emerald-800" />
                        <span>Expected resolution: {complaint.expectedResolution || "TBD"}</span>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(complaint)}>
                    View Details
                  </Button>{" "}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <ComplaintRating
        complaintId={selectedComplaintForRating || ""}
        isOpen={ratingDialogOpen}
        onClose={handleCloseRatingDialog}
        onSubmit={handleSubmitRating}
      />

      <ComplaintDetails
        complaint={selectedComplaintForDetails}
        isOpen={detailsModalOpen}
        onClose={handleCloseDetailsModal}
      />
    </Card>
  );
}
