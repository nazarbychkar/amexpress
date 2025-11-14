"use client"

export default function DeleteButton({ carId }: { carId: number }) {
  return (
    <form
      action={`/api/cars/${carId}`}
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();

        if (!confirm("Ви впевнені, що хочете видалити?")) return;

        await fetch(`/api/cars/${carId}`, {
          method: "DELETE",
        });

        window.location.reload();
      }}
    >
      <button
        type="submit"
        className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 transition"
      >
        Delete
      </button>
    </form>
  );
}
