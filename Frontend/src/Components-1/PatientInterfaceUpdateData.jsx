import React, { useState } from "react";

const PatientInterfaceUpdateData = () => {
  const [formData, setFormData] = useState({
    mood: '7',
    sleepHours: '7.5',
    exerciseMinutes: '45',
    weight: '70',
    dietNotes: '',
    foodDislikes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      // Here you would typically redirect or show a success message
      alert('Data updated successfully!');
    }, 2000);
  };

  const moodEmojis = ['😢', '😟', '😐', '😊', '😁', '🤩'];
  const getMoodEmoji = (value) => {
    const index = Math.min(Math.floor((parseInt(value) - 1) / 2), 5);
    return moodEmojis[index] || '😐';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center px-4 sm:px-6 py-6 sm:py-8 font-sans">
      {/* Header with Back Button */}
      <div className="w-full max-w-md mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center tracking-tight">
          Update Personal Data
        </h1>
        <p className="text-blue-200 text-center mt-2 text-sm sm:text-base">
          Keep your health profile up to date
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 sm:space-y-6">
        
        {/* Mood Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
          <label className="block text-gray-700 font-semibold mb-3">
            Current Mood {getMoodEmoji(formData.mood)}
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="1"
              max="10"
              value={formData.mood}
              onChange={(e) => handleInputChange('mood', e.target.value)}
              className="w-full h-2 bg-gradient-to-r from-red-300 via-yellow-300 to-green-300 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Poor (1)</span>
              <span className="font-medium text-gray-700">{formData.mood}/10</span>
              <span>Excellent (10)</span>
            </div>
          </div>
        </div>

        {/* Sleep Hours */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
          <label className="block text-gray-700 font-semibold mb-3">
            Sleep Hours Last Night 🛏️
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            max="24"
            value={formData.sleepHours}
            onChange={(e) => handleInputChange('sleepHours', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            placeholder="e.g., 8.0"
          />
          <p className="text-sm text-gray-500 mt-2">Recommended: 7-9 hours</p>
        </div>

        {/* Exercise Minutes */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
          <label className="block text-gray-700 font-semibold mb-3">
            Exercise Minutes Today 🏃‍♂️
          </label>
          <input
            type="number"
            min="0"
            max="1440"
            value={formData.exerciseMinutes}
            onChange={(e) => handleInputChange('exerciseMinutes', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            placeholder="e.g., 30"
          />
          <p className="text-sm text-gray-500 mt-2">Include all physical activity</p>
        </div>

        {/* Weight */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
          <label className="block text-gray-700 font-semibold mb-3">
            Current Weight (kg) ⚖️
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="500"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
            placeholder="e.g., 70.5"
          />
        </div>

        {/* Food Dislikes */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
          <label className="block text-gray-700 font-semibold mb-3">
            Food Dislikes & Allergies 🚫
          </label>
          <textarea
            rows="3"
            value={formData.foodDislikes}
            onChange={(e) => handleInputChange('foodDislikes', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-none"
            placeholder="e.g., Nuts, shellfish, dairy, spicy foods..."
          />
        </div>

        {/* Diet Notes */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
          <label className="block text-gray-700 font-semibold mb-3">
            Diet Notes & Preferences 📝
          </label>
          <textarea
            rows="3"
            value={formData.dietNotes}
            onChange={(e) => handleInputChange('dietNotes', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-none"
            placeholder="e.g., Vegetarian, low-carb, trying to gain weight..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 sm:pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full py-3 sm:py-4 px-6 sm:px-8 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </div>
            ) : (
              '💾 Update Data'
            )}
          </button>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mt-4">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-700">
              Your data is securely stored and helps us provide better personalized health insights and recommendations.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientInterfaceUpdateData;