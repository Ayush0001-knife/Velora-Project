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
          className={`w-3 h-3 bg-${color}-500 rounded-full animate-bounce`}
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
          style={{ 
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s' 
          }}
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
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      case 'bars':
        return <BarsLoader />;
      case 'ripple':
        return <RippleLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      {renderLoader()}
      {showText && (
        <p className="text-gray-600 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

// Demo component showing different loader variations
const LoaderDemo = () => {
  const [currentLoader, setCurrentLoader] = React.useState(0);
  
  const loaderConfigs = [
    { variant: 'spinner', color: 'blue', size: 'lg', text: 'Loading...' },
    { variant: 'dots', color: 'purple', size: 'md', text: 'Please wait...' },
    { variant: 'pulse', color: 'green', size: 'xl', text: 'Processing...' },
    { variant: 'bars', color: 'orange', size: 'md', text: 'Fetching data...' },
    { variant: 'ripple', color: 'pink', size: 'lg', text: 'Almost ready...' }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLoader((prev) => (prev + 1) % loaderConfigs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Modern Loaders
        </h1>
        
        <div className="min-h-[120px] flex items-center justify-center">
          <Loader {...loaderConfigs[currentLoader]} />
        </div>
        
        <div className="flex justify-center space-x-2 mt-8">
          {loaderConfigs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentLoader(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentLoader 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Current variant:</p>
          <code className="bg-gray-100 px-3 py-1 rounded-md text-sm font-mono">
            {loaderConfigs[currentLoader].variant}
          </code>
        </div>
      </div>
      
      <div className="mt-8 text-center max-w-2xl px-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Usage</h2>
        <div className="bg-gray-800 text-green-400 p-4 rounded-lg text-left font-mono text-sm overflow-x-auto">
          <div className="mb-2">{'<Loader'}</div>
          <div className="ml-4">{'variant="spinner" // spinner, dots, pulse, bars, ripple'}</div>
          <div className="ml-4">{'color="blue" // blue, purple, green, red, orange, pink'}</div>
          <div className="ml-4">{'size="lg" // sm, md, lg, xl'}</div>
          <div className="ml-4">{'text="Loading..."'}</div>
          <div className="ml-4">{'showText={true}'}</div>
          <div>{'/>'}</div>
        </div>
      </div>
    </div>
  );
};

export default LoaderDemo;