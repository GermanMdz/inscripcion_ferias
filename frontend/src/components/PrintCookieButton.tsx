"use client";

export default function PrintCookieButton() {
  const handleClick = () => {
    console.log(document.cookie);
  };

  return (
    <button
      onClick={handleClick}
      className="border px-3 py-1 rounded hover:bg-gray-700"
    >
      Ver token
    </button>
  );
}
