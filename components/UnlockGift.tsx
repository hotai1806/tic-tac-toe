import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Lock, Unlock, X } from "lucide-react";

const UnlockGift = ({ onUnlock, onReset }) => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();

  useEffect(() => {
    if (onUnlock) {
      // Automatically show modal when unlocked
      setShowModal(true);
    }
  }, [onUnlock]);

  const handleInputChange = (index, value) => {
    if (isNaN(value)) return;
    const newPassword = [...password];
    newPassword[index] = value;
    setPassword(newPassword);
    setError(false);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !password[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredPassword = password.join("");
    if (enteredPassword === "1412") {
      setShowModal(false);
      router.push('/confess');
    } else {
      setError(true);
      setPassword(["", "", "", ""]);
      setTimeout(() => {
        if (onReset) onReset();
      }, 1000);
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
              <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                <Lock className="text-white w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Secret Gift
              </h2>
              <p className="text-indigo-100 text-sm">
                Enter the 4-digit code to unlock
              </p>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit}>
                <div className="flex justify-center gap-3 mb-8">
                  {password.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 ${
                        error
                          ? "border-red-500 bg-red-50 text-red-600 focus:ring-red-200"
                          : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100 text-gray-800"
                      }`}
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-red-500 text-center text-sm mb-4 font-medium animate-pulse">
                    Incorrect password. Game will reset...
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95"
                >
                  <Unlock size={20} />
                  Unlock Gift
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UnlockGift;
