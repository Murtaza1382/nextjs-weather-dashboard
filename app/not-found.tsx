// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-3xl font-bold">Page not found</h2>
      <p className="mt-4 text-muted-foreground">
        Sorry — we couldn’t find that page.
      </p>
    </div>
  );
}
