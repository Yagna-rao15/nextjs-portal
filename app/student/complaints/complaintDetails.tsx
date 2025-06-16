import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ComplaintData } from "@/lib/interface";
import { X, Check, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";

export const getStatusColor = (status: string, theme: string | undefined) => {
  const s = status.toLowerCase();

  const classes = {
    resolved: {
      light: "bg-green-100 text-green-800 border-green-200",
      dark: "bg-green-900 text-green-100 border-green-800",
    },
    "in progress": {
      light: "bg-blue-100 text-blue-800 border-blue-200",
      dark: "bg-blue-900 text-blue-100 border-blue-800",
    },
    pending: {
      light: "bg-yellow-100 text-yellow-800 border-yellow-200",
      dark: "bg-yellow-900 text-yellow-100 border-yellow-800",
    },
    default: {
      light: "bg-gray-100 text-gray-800 border-gray-200",
      dark: "bg-gray-800 text-gray-100 border-gray-700",
    },
  };

  const t = theme === "light" ? "light" : "dark";
  const variant = classes[s as keyof typeof classes] || classes.default;
  return variant[t];
};

export const getPriorityColor = (priority: string, theme: string | undefined) => {
  const p = priority.toLowerCase();

  const classes = {
    urgent: {
      light: "bg-red-100 text-red-800",
      dark: "bg-red-900 text-red-100",
    },
    high: {
      light: "bg-orange-100 text-orange-800",
      dark: "bg-orange-900 text-orange-100",
    },
    normal: {
      light: "bg-blue-100 text-blue-800",
      dark: "bg-blue-900 text-blue-100",
    },
    low: {
      light: "bg-gray-100 text-gray-800",
      dark: "bg-gray-800 text-gray-100",
    },
    default: {
      light: "bg-gray-100 text-gray-800",
      dark: "bg-gray-800 text-gray-100",
    },
  };

  const t = theme === "light" ? "light" : "dark";
  const variant = classes[p as keyof typeof classes] || classes.default;

  return variant[t];
};

export default function ComplaintDetails({
  complaint,
  isOpen,
  onClose,
}: {
  complaint: ComplaintData | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { theme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !complaint) return null;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sa flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="max-w-xl mx-auto bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Complaint Details
              </h3>
              <p className="text-sm text-muted-foreground">Complete information about your complaint</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-background/80 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-8">
            {/* Status Banner */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/50">
              <div className="flex items-center justify-center gap-4">
                <div
                  className={`p-2 rounded-full ${
                    complaint.status === "Resolved"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : complaint.status === "In Progress"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-yellow-100 dark:bg-yellow-900/30"
                  }`}
                >
                  {complaint.status === "Resolved" ? (
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : complaint.status === "In Progress" ? (
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
                <div>
                  <Badge className={`${getStatusColor(complaint.status, theme)} text-xs font-medium px-3 py-1`}>
                    {complaint.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">Current Status</p>
                </div>
              </div>
              <Badge variant="outline" className={`${getPriorityColor(complaint.priority, theme)} border-2`}>
                {complaint.priority} Priority
              </Badge>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                <div className="text-xs font-medium text-primary/80 uppercase tracking-wide mb-2">Complaint ID</div>
                <p className="font-mono text-sm font-semibold">{complaint.id}</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20">
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">
                  Date Submitted
                </div>
                <p className="text-sm font-semibold">{complaint.createdAt}</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/20">
                <div className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-2">
                  Category
                </div>
                <p className="text-sm font-semibold capitalize">{complaint.category}</p>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                Location Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-sm"></div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Building
                      </Label>
                      <p className="font-medium capitalize">{complaint.building || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Location Type
                      </Label>
                      <p className="font-medium capitalize">{complaint.location || "N/A"}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {complaint.floor && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Floor
                        </Label>
                        <p className="font-medium">{complaint.floor}</p>
                      </div>
                    </div>
                  )}
                  {complaint.room && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Room
                        </Label>
                        <p className="font-medium">{complaint.room}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                {" "}
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-500/50 rounded-full"></div>
                Issue Description
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-muted/20 to-background border-2 border-dashed border-border/50">
                <p className="text-sm leading-relaxed text-foreground/90">{complaint.description}</p>
              </div>
            </div>

            {/* Resolution Section */}
            {complaint.status === "Resolved" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-green-700 dark:text-green-300">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-500/50 rounded-full"></div>
                  Resolution Details
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-green-50/50 to-green-50/20 dark:from-green-950/30 dark:to-green-950/10 border border-green-200/50 dark:border-green-800/30">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
                      <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-green-700 dark:text-green-300">Resolved Date</Label>
                        <p className="text-green-800 dark:text-green-200 font-medium">
                          {complaint.resolvedDate || "N/A"}
                        </p>
                      </div>
                      {complaint.rating && (
                        <div>
                          <Label className="text-sm font-medium text-green-700 dark:text-green-300">Your Rating</Label>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-5 w-5 transition-colors ${
                                    star <= complaint.rating!
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-muted-foreground/30"
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {complaint.rating}/5
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Expected Resolution */}
            {complaint.status !== "Resolved" && complaint.expectedResolution && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-blue-700 dark:text-blue-300">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-500/50 rounded-full"></div>
                  Expected Resolution
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50/50 to-blue-50/20 dark:from-blue-950/30 dark:to-blue-950/10 border border-blue-200/50 dark:border-blue-800/30">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-blue-700 dark:text-blue-300 font-medium">{complaint.expectedResolution}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Estimated timeline for resolution</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
