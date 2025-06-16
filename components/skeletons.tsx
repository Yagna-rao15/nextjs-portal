export function ComplaintSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-20 w-full bg-muted animate-pulse rounded-md" />
      ))}
    </div>
  );
}
