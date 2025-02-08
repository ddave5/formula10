import React from 'react';
import { useError } from './ErrorContext';

const ErrorDialog: React.FC = () => {
  const { error, setError } = useError();

  if (!error) return null; // Ha nincs hiba, ne jelenítsünk meg semmit

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Hiba történt</h2>
        <p>{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
          onClick={() => setError(null)} // A hiba eltüntetése
        >
          Bezárás
        </button>
      </div>
    </div>
  );
};

export default ErrorDialog;