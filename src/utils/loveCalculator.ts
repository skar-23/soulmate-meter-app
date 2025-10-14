// Love calculator algorithm based on names (optimized for positive results)
export const calculateLoveByNames = (name1: string, name2: string): number => {
  // Deterministic FLAMES-like algorithm (no Math.random) so same names => same result
  const sanitize = (s: string) =>
    String(s || "")
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .trim();
  const cleanName1 = sanitize(name1);
  const cleanName2 = sanitize(name2);

  if (!cleanName1 || !cleanName2) return 0;

  const combined = cleanName1 + cleanName2;

  // Count letter frequencies in insertion order
  const letterCount: { [key: string]: number } = {};
  for (const ch of combined) {
    if (!Object.prototype.hasOwnProperty.call(letterCount, ch)) letterCount[ch] = 0;
    letterCount[ch] = letterCount[ch] + 1;
  }

  let numbers = Object.values(letterCount).join("");

  // Reduce by summing mirrored digits until two digits remain
  while (numbers.length > 2) {
    const newNums: string[] = [];
    const len = numbers.length;
    for (let i = 0; i < Math.ceil(len / 2); i++) {
      const j = len - 1 - i;
      if (i === j) {
        newNums.push(numbers[i]);
      } else {
        const sum = parseInt(numbers[i], 10) + parseInt(numbers[j], 10);
        newNums.push(String(sum));
      }
    }
    numbers = newNums.join("");
  }

  let percentage = parseInt(numbers, 10);
  if (Number.isNaN(percentage)) percentage = 0;
  if (percentage > 99) percentage = percentage % 100;

  if (percentage === 0) {
    // bump zero-case into a higher positive range but not too high
    percentage = 55 + ((cleanName1.length + cleanName2.length) % 15); // 55..69
  }

  // Basic anti-fake rules
  // 1) identical names (or reversed) should not produce extreme highs
  if (
    cleanName1 === cleanName2 ||
    cleanName1.split("").reverse().join("") === cleanName2
  ) {
    percentage = 50 + (cleanName1.length % 10); // 50..59
  }

  // 2) if one name contains the other (very similar), cap it to avoid faking
  if (cleanName1.includes(cleanName2) || cleanName2.includes(cleanName1)) {
    percentage = Math.min(60, percentage);
  }

  // 3) very short names are easier to fake; restrict their maximum
  if (cleanName1.length < 3 || cleanName2.length < 3) {
    percentage = Math.min(70, percentage);
  }

  // Raise the positivity floor but keep it modest: 60..64
  if (percentage < 60) {
    percentage = 60 + (percentage % 5); // 60..64
  }

  // Deterministic boost nudging typical results toward a pleasant mid-high band (~80-85)
  // Compute seed-based value, then compute a bounded adjustment that pushes percentage toward target
  const seedStr = cleanName1 + "|" + cleanName2;
  let seed = 11;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  // rawBoost 0..19
  const rawBoost = seed % 20;
  // desired target center
  const target = 82;
  // compute how much we need to move toward target, but limit the step to 6..12
  const gap = target - percentage;
  // step is proportional to gap but bounded
  let step = Math.round(gap * 0.35) + Math.floor(rawBoost / 10); // small proportional step + small randomness
  if (step < 4) step = 4;
  if (step > 12) step = 12;
  // If the input was marked suspicious earlier (we reduced percentage), reduce the step
  if (
    cleanName1 === cleanName2 ||
    cleanName1.split("").reverse().join("") === cleanName2
  ) {
    step = Math.min(step, 3);
  }

  percentage = Math.min(95, percentage + step); // cap at 95 to avoid too-high 99s from names
  return Math.round(percentage);
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
      num = num
        .toString()
        .split("")
        .reduce((a, b) => a + parseInt(b), 0);
    }
    return num;
  };

  const lifePath1 = reduceToSingle(d1 + m1 + y1);
  const lifePath2 = reduceToSingle(d2 + m2 + y2);

  // Calculate compatibility with positive bias
  const diff = Math.abs(lifePath1 - lifePath2);
  const sum = lifePath1 + lifePath2;

  // Generate percentage based on numerological compatibility
  let percentage = 100 - diff * 8; // Reduced penalty for differences
  percentage = percentage + (sum % 20);

  // Ensure minimum of 50% for positivity
  // Ensure a modest minimum (around 60)
  if (percentage < 60) {
    percentage = 60 + (percentage % 5); // 60..64
  }

  // Deterministic boost derived from dates (smaller range to reduce large jumps)
  const seedStr = `${d1}-${m1}-${y1}|${d2}-${m2}-${y2}`;
  let seed = 5;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  const boost = 4 + (seed % 9); // 4..12
  percentage = Math.min(99, percentage + boost);

  return Math.round(percentage);
};

// Get love message based on percentage (more encouraging messages)
export const getLoveMessage = (
  percentage: number
): { title: string; message: string; emoji: string } => {
  if (percentage >= 90) {
    return {
      title: "Perfect Match! 💕",
      message:
        "This is a match made in heaven! You two are absolutely perfect for each other!",
      emoji: "💕",
    };
  } else if (percentage >= 75) {
    return {
      title: "Excellent Compatibility! 💖",
      message:
        "Amazing connection! You have great chemistry and understanding.",
      emoji: "💖",
    };
  } else if (percentage >= 60) {
    return {
      title: "Strong Connection! 💗",
      message:
        "Good compatibility! You share a meaningful bond with potential to grow.",
      emoji: "💗",
    };
  } else if (percentage >= 50) {
    return {
      title: "Great Potential! 💓",
      message:
        "There's definitely something special here! This relationship has wonderful potential.",
      emoji: "💓",
    };
  } else {
    return {
      title: "Promising Start! 💝",
      message:
        "Every great love story starts somewhere! You have a solid foundation to build on.",
      emoji: "💝",
    };
  }
};
