"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
// import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import pool from "@/lib/db";

interface ComplaintData {
  id: string;
  email: string;
  category: string;
  name: string;
  mobile: string;
  building: string;
  floor?: string;
  room?: string;
  location: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved";
  priority: "Low" | "Normal" | "High" | "Urgent";
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
  rating?: number;
  resolvedDate?: string;
  expectedResolution?: string;
}

interface SubmitComplaintResult {
  success: boolean;
  error?: string;
  complaintId?: string;
}

const generateComplaintId = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `COMP-${year}-${randomNum}`;
};

const determinePriority = (category: string, description: string): "Low" | "Normal" | "High" | "Urgent" => {
  const urgentKeywords = ["urgent", "emergency", "danger", "flood", "fire", "broken", "burst"];
  const highKeywords = ["not working", "complete", "total", "severe"];

  const lowerDescription = description.toLowerCase();
  const lowerCategory = category.toLowerCase();

  if (urgentKeywords.some((keyword) => lowerDescription.includes(keyword))) {
    return "Urgent";
  }

  if (lowerCategory === "electrical" || lowerCategory === "plumbing") {
    if (highKeywords.some((keyword) => lowerDescription.includes(keyword))) {
      return "High";
    }
    return "Normal";
  }

  if (lowerCategory === "security") {
    return "High";
  }

  return "Normal";
};

const saveFileToServer = async (file: File, complaintId: string): Promise<string> => {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "complaints", complaintId);
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}_${originalName}`;
    const filepath = join(uploadsDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return relative path for database storage
    return `/uploads/complaints/${complaintId}/${filename}`;
  } catch (error) {
    console.error("Error saving file:", error);
    throw new Error("Failed to save file");
  }
};

export async function submitComplaint(formData: FormData): Promise<SubmitComplaintResult> {
  try {
    const email = formData.get("email") as string;
    const category = formData.get("category") as string;
    const name = formData.get("name") as string;
    const mobile = formData.get("mobile") as string;
    const building = formData.get("building") as string;
    const floor = formData.get("floor") as string;
    const room = formData.get("room") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;

    if (!email || !category || !name || !mobile || !building || !location || !description) {
      return { success: false, error: "Missing required fields" };
    }

    const complaintId = generateComplaintId();
    const priority = determinePriority(category, description);

    const attachments: string[] = [];
    const fileKeys = Array.from(formData.keys()).filter((key) => key.startsWith("file_"));

    for (const key of fileKeys) {
      const file = formData.get(key) as File;
      if (file && file.size > 0) {
        try {
          const filePath = await saveFileToServer(file, complaintId);
          attachments.push(filePath);
        } catch (error) {
          console.error(`Failed to save file ${file.name}:`, error);
        }
      }
    }

    const now = new Date();
    const expectedDays = priority === "Urgent" ? 1 : priority === "High" ? 3 : 7;
    const expectedResolution = new Date(now.getTime() + expectedDays * 24 * 60 * 60 * 1000).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" },
    );

    const complaint: ComplaintData = {
      id: complaintId,
      email,
      category,
      name,
      mobile,
      building,
      floor: floor || undefined,
      room: room || undefined,
      location,
      description,
      status: "Pending",
      priority,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      attachments: attachments.length > 0 ? attachments : undefined,
      expectedResolution,
    };

    await pool.query(
      `INSERT INTO complaints (
    id, email, category, name, mobile, building, floor, room, location,
    description, status, priority, created_at, updated_at, attachments,
    rating, resolved_date, expected_resolution
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9,
    $10, $11, $12, $13, $14, $15,
    $16, $17, $18
  )`,
      [
        complaint.id,
        complaint.email,
        complaint.category,
        complaint.name,
        complaint.mobile,
        complaint.building,
        complaint.floor ?? null,
        complaint.room ?? null,
        complaint.location,
        complaint.description,
        complaint.status,
        complaint.priority,
        complaint.createdAt,
        complaint.updatedAt,
        complaint.attachments ?? null,
        complaint.rating ?? null,
        complaint.resolvedDate ?? null,
        complaint.expectedResolution ?? null,
      ],
    );

    revalidatePath("/complaints");

    return {
      success: true,
      complaintId,
      error: undefined,
    };
  } catch (error) {
    console.error("Error submitting complaint:", error);
    return {
      success: false,
      error: "An unexpected error occurred while submitting your complaint. Please try again.",
    };
  }
}

export async function fetchUserComplaints(email: string): Promise<ComplaintData[]> {
  try {
    if (!email) return [];

    const result = await pool.query("SELECT * FROM complaints WHERE email = $1 ORDER BY created_at DESC", [email]);

    return result.rows; // just raw complaint data from DB
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    return [];
  }
}

import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";

export async function getUserEmailFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  if (!token?.value) return null;

  try {
    const payload = verifyAccessToken(token.value);
    return payload?.email || null;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}
// // Server action for updating complaint status (for admin use)
// export async function updateComplaintStatus(
//   complaintId: string,
//   status: "Pending" | "In Progress" | "Resolved",
//   adminNotes?: string,
// ): Promise<{ success: boolean; error?: string }> {
//   try {
//     const complaintIndex = complaintsDB.findIndex((c) => c.id === complaintId);
//
//     if (complaintIndex === -1) {
//       return { success: false, error: "Complaint not found" };
//     }
//
//     const complaint = complaintsDB[complaintIndex];
//     complaint.status = status;
//     complaint.updatedAt = new Date().toISOString();
//
//     if (status === "Resolved") {
//       complaint.resolvedDate = new Date().toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     }
//
//     // In production, save to database and send notification email
//     // await saveToDatabase(complaint);
//     // await sendStatusUpdateEmail(complaint);
//
//     revalidatePath("/complaints");
//     return { success: true };
//   } catch (error) {
//     console.error("Error updating complaint status:", error);
//     return { success: false, error: "Failed to update complaint status" };
//   }
// }
//
// // Server action for rating resolved complaints
// export async function rateComplaint(
//   complaintId: string,
//   rating: number,
//   feedback?: string,
// ): Promise<{ success: boolean; error?: string }> {
//   try {
//     if (rating < 1 || rating > 5) {
//       return { success: false, error: "Rating must be between 1 and 5" };
//     }
//
//     const complaintIndex = complaintsDB.findIndex((c) => c.id === complaintId);
//
//     if (complaintIndex === -1) {
//       return { success: false, error: "Complaint not found" };
//     }
//
//     const complaint = complaintsDB[complaintIndex];
//
//     if (complaint.status !== "Resolved") {
//       return { success: false, error: "Can only rate resolved complaints" };
//     }
//
//     complaint.rating = rating;
//     complaint.updatedAt = new Date().toISOString();
//
//     // In production, save feedback to database
//     // if (feedback) {
//     //   await saveFeedback(complaintId, feedback);
//     // }
//
//     revalidatePath("/complaints");
//     return { success: true };
//   } catch (error) {
//     console.error("Error rating complaint:", error);
//     return { success: false, error: "Failed to submit rating" };
//   }
// }
//
// // Utility function for sending notification emails (implement as needed)
// async function sendNotificationEmail(complaint: ComplaintData): Promise<void> {
//   // Implement email sending logic here
//   // Example using nodemailer or your preferred email service
//   console.log(`Notification: New ${complaint.priority} priority complaint ${complaint.id} submitted`);
// }
//
// // Server action to get complaint statistics (for dashboard)
// export async function getComplaintStats(email?: string): Promise<{
//   total: number;
//   pending: number;
//   inProgress: number;
//   resolved: number;
//   averageRating: number;
// }> {
//   try {
//     const complaints = email ? complaintsDB.filter((c) => c.email === email) : complaintsDB;
//
//     const stats = {
//       total: complaints.length,
//       pending: complaints.filter((c) => c.status === "Pending").length,
//       inProgress: complaints.filter((c) => c.status === "In Progress").length,
//       resolved: complaints.filter((c) => c.status === "Resolved").length,
//       averageRating: 0,
//     };
//
//     const ratedComplaints = complaints.filter((c) => c.rating);
//     if (ratedComplaints.length > 0) {
//       const totalRating = ratedComplaints.reduce((sum, c) => sum + (c.rating || 0), 0);
//       stats.averageRating = totalRating / ratedComplaints.length;
//     }
//
//     return stats;
//   } catch (error) {
//     console.error("Error getting complaint stats:", error);
//     return {
//       total: 0,
//       pending: 0,
//       inProgress: 0,
//       resolved: 0,
//       averageRating: 0,
//     };
//   }
// }
