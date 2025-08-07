import React from 'react';

const Loader = ({
  size = 'md',
  color = 'blue',
  text = 'Loading...',
  showText = true,
  variant = 'spinner'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500',
    orange: 'border-orange-500',
    pink: 'border-pink-500'
  };

  const SpinnerLoader = () => (
    <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-4 ${colorClasses[color]} rounded-full animate-spin`} />
  );

  const DotsLoader = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full animate-bounce bg-${color}-500`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const PulseLoader = () => (
    <div className={`${sizeClasses[size]} bg-${color}-500 rounded-full animate-pulse opacity-75`} />
  );

  const BarsLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-2 h-8 bg-${color}-500 animate-pulse`}
          style={{ animationDelay: `${i * 0.1}s`, animationDuration: '1s' }}
        />
      ))}
    </div>
  );

  const RippleLoader = () => (
    <div className={`${sizeClasses[size]} relative`}>
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`absolute inset-0 border-4 ${colorClasses[color]} rounded-full animate-ping opacity-75`}
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots': return <DotsLoader />;
      case 'pulse': return <PulseLoader />;
      case 'bars': return <BarsLoader />;
      case 'ripple': return <RippleLoader />;
      default: return <SpinnerLoader />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderLoader()}
      {showText && (
        <p className="text-gray-700 font-medium animate-pulse text-lg">
          {text}
        </p>
      )}
    </div>
  );
};

// Overlay Loader Component
export const OverlayLoader = ({
  isVisible,
  variant = 'ripple',
  color = 'green',
  size = 'xl',
  text = 'Loading...',
  showText = true
}) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-transparent backdrop-blur-sm"></div>      <div className="relative z-10">
        <Loader
          variant={variant}
          color={color}
          size={size}
          text={text}
          showText={showText}
        />
      </div>
    </div>
  );
};

export default Loader;
