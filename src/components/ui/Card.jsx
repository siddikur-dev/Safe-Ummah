"use client";

import React from 'react';

const Card = React.forwardRef(({ children, className = '', hover = true, ...props }, ref) => {
  const base = 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm';
  const hoverCls = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';
  return (
    <div ref={ref} className={`${base} ${hoverCls} ${className}`} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
