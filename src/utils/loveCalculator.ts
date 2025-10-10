// Love calculator algorithm based on names (optimized for positive results)
export const calculateLoveByNames = (name1: string, name2: string): number => {
  // Clean and normalize names
  const cleanName1 = name1.toLowerCase().replace(/[^a-z]/g, '');
  const cleanName2 = name2.toLowerCase().replace(/[^a-z]/g, '');
  
  if (!cleanName1 || !cleanName2) return 0;
  
  // Combine names
  const combined = cleanName1 + cleanName2;
  
  // Count letter frequencies
  const letterCount: { [key: string]: number } = {};
  for (const char of combined) {
    letterCount[char] = (letterCount[char] || 0) + 1;
  }
  
  // Convert counts to string
  let numbers = Object.values(letterCount).join('');
  
  // Reduce to two digits using the "FLAMES" style algorithm
  while (numbers.length > 2) {
    const newNumbers: string[] = [];
    const len = numbers.length;
    
    for (let i = 0; i < Math.ceil(len / 2); i++) {
      if (i === len - 1 - i) {
        newNumbers.push(numbers[i]);
      } else {
        const sum = parseInt(numbers[i]) + parseInt(numbers[len - 1 - i]);
        newNumbers.push(sum.toString());
      }
    }
    
    numbers = newNumbers.join('');
  }
  
  // Convert to percentage with optimistic boost
  let percentage = parseInt(numbers);
  if (percentage > 99) percentage = percentage % 100;
  if (percentage === 0) percentage = 50 + (cleanName1.length + cleanName2.length) % 50;
  
  // Boost lower scores to be more positive (minimum 45%)
  if (percentage < 45) {
    percentage = 45 + (percentage % 30);
  }
  
  // Add a small random boost for variety (0-15%)
  const boost = Math.floor(Math.random() * 16);
  percentage = Math.min(99, percentage + boost);
  
  return percentage;
};

// Love calculator algorithm based on dates of birth (optimized for positive results)
export const calculateLoveByDates = (date1: Date, date2: Date): number => {
  // Extract day, month, year
  const d1 = date1.getDate();
  const m1 = date1.getMonth() + 1;
  const y1 = date1.getFullYear();
  
  const d2 = date2.getDate();
  const m2 = date2.getMonth() + 1;
  const y2 = date2.getFullYear();
  
  // Calculate life path numbers (numerology style)
  const reduceToSingle = (num: number): number => {
    while (num > 9) {
      num = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    }
    return num;
  };
  
  const lifePath1 = reduceToSingle(d1 + m1 + y1);
  const lifePath2 = reduceToSingle(d2 + m2 + y2);
  
  // Calculate compatibility with positive bias
  const diff = Math.abs(lifePath1 - lifePath2);
  const sum = lifePath1 + lifePath2;
  
  // Generate percentage based on numerological compatibility
  let percentage = 100 - (diff * 8); // Reduced penalty for differences
  percentage = percentage + (sum % 20);
  
  // Ensure minimum of 50% for positivity
  if (percentage < 50) {
    percentage = 50 + (percentage % 25);
  }
  
  // Add small boost for variety (0-12%)
  const boost = Math.floor(Math.random() * 13);
  percentage = Math.min(99, percentage + boost);
  
  return Math.round(percentage);
};

// Get love message based on percentage (more encouraging messages)
export const getLoveMessage = (percentage: number): { title: string; message: string; emoji: string } => {
  if (percentage >= 90) {
    return {
      title: "Perfect Match! 💕",
      message: "This is a match made in heaven! You two are absolutely perfect for each other!",
      emoji: "💕"
    };
  } else if (percentage >= 75) {
    return {
      title: "Excellent Compatibility! 💖",
      message: "Amazing connection! You have great chemistry and understanding.",
      emoji: "💖"
    };
  } else if (percentage >= 60) {
    return {
      title: "Strong Connection! 💗",
      message: "Good compatibility! You share a meaningful bond with potential to grow.",
      emoji: "💗"
    };
  } else if (percentage >= 50) {
    return {
      title: "Great Potential! 💓",
      message: "There's definitely something special here! This relationship has wonderful potential.",
      emoji: "💓"
    };
  } else {
    return {
      title: "Promising Start! 💝",
      message: "Every great love story starts somewhere! You have a solid foundation to build on.",
      emoji: "💝"
    };
  }
};
