import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComplaintRating({
  isOpen,
  onClose,
  onSubmit,
}: {
  complaintId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (selectedRating === 0) return;

    setIsSubmitting(true);
    try {
      onSubmit(selectedRating);
      onClose();
    } catch (error) {
      console.error("Rating submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Rate Resolution Quality</h3>
        <p className="text-sm text-muted-foreground mb-6">
          How satisfied are you with the resolution of this complaint?
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 transition-colors"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setSelectedRating(star)}
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= (hoverRating || selectedRating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-muted-foreground hover:text-yellow-400"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="text-center mb-6">
          <span className="text-sm text-muted-foreground">
            {selectedRating === 0
              ? "Select a rating"
              : selectedRating === 1
                ? "Very Poor"
                : selectedRating === 2
                  ? "Poor"
                  : selectedRating === 3
                    ? "Average"
                    : selectedRating === 4
                      ? "Good"
                      : "Excellent"}
          </span>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={selectedRating === 0 || isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Rating"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
