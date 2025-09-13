import { Student, Challenge, Lesson, Badge } from '../types';

export const sampleStudents: Student[] = [
  {
    id: 'student-1',
    name: 'Arjun Sharma',
    grade: '9th',
    school: 'Green Valley School',
    state: 'Maharashtra',
    ecoPoints: 1250,
    level: 7,
    streak: 12,
    completedLessons: ['lesson-1', 'lesson-2', 'lesson-3'],
    completedChallenges: ['challenge-1', 'challenge-2', 'challenge-5'],
    earnedBadges: [
      { badgeId: 'eco-rookie', dateEarned: '2024-01-15T10:00:00Z' },
      { badgeId: 'tree-hugger', dateEarned: '2024-01-20T14:30:00Z' },
      { badgeId: 'waste-warrior', dateEarned: '2024-01-25T09:15:00Z' }
    ],
    totalImpactScore: 125.5,
    weeklyGoal: 200,
    monthlyGoal: 800,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    joinDate: '2024-01-01T00:00:00Z'
  }
];

export const challenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Plant a Native Sapling',
    description: 'Plant a native tree sapling in your locality and document its growth over a month',
    category: 'conservation',
    difficulty: 'Medium',
    points: 50,
    estimatedTime: '2 hours',
    requirements: ['Native plant sapling', 'Camera', 'Measuring tape', 'Water'],
    state: 'All States',
    season: 'Monsoon',
    imageUrl: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructions: [
      'Research native trees suitable for your region',
      'Choose an appropriate location with adequate sunlight',
      'Dig a hole twice the size of the root ball',
      'Plant the sapling and water thoroughly',
      'Take before and after photos',
      'Measure and record the height weekly'
    ]
  },
  {
    id: 'challenge-2',
    title: 'Waste Segregation Drive',
    description: 'Organize a waste segregation awareness drive in your neighborhood',
    category: 'waste',
    difficulty: 'Hard',
    points: 75,
    estimatedTime: '4 hours',
    requirements: ['Colored bins/bags', 'Information pamphlets', 'Volunteers'],
    imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructions: [
      'Create informative posters about waste segregation',
      'Gather volunteers from your community',
      'Set up segregation stations in your locality',
      'Educate neighbors about proper waste disposal',
      'Document the before and after impact',
      'Submit photos and participant feedback'
    ]
  },
  {
    id: 'challenge-3',
    title: 'Rainwater Harvesting Setup',
    description: 'Install a simple rainwater harvesting system at home',
    category: 'water',
    difficulty: 'Medium',
    points: 60,
    estimatedTime: '3 hours',
    requirements: ['Plastic containers', 'PVC pipes', 'Filter material', 'Tools'],
    state: 'Rajasthan',
    season: 'Pre-Monsoon',
    imageUrl: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructions: [
      'Design a simple collection system',
      'Connect gutters to collection containers',
      'Install basic filtration',
      'Test the system with initial rains',
      'Calculate water collected over a week',
      'Share your setup with photos and measurements'
    ]
  },
  {
    id: 'challenge-4',
    title: 'Solar Cooker Experiment',
    description: 'Build a simple solar cooker and cook a meal using solar energy',
    category: 'energy',
    difficulty: 'Medium',
    points: 55,
    estimatedTime: '2.5 hours',
    requirements: ['Cardboard box', 'Aluminum foil', 'Black pot', 'Glass/plastic cover'],
    imageUrl: 'https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructions: [
      'Line a cardboard box with aluminum foil',
      'Place a black cooking pot inside',
      'Cover with glass or clear plastic',
      'Angle towards the sun for maximum heat',
      'Cook simple food like rice or vegetables',
      'Record cooking time and temperature achieved'
    ]
  },
  {
    id: 'challenge-5',
    title: 'Butterfly Garden Creation',
    description: 'Create a butterfly-friendly garden with native flowering plants',
    category: 'biodiversity',
    difficulty: 'Easy',
    points: 40,
    estimatedTime: '2 hours',
    requirements: ['Native flowering plants', 'Garden tools', 'Water source'],
    imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructions: [
      'Research butterfly-attracting plants native to your area',
      'Prepare a small garden patch',
      'Plant flowers like marigold, lantana, and ixora',
      'Create a shallow water source',
      'Observe and photograph visiting butterflies',
      'Maintain the garden for at least 2 weeks'
    ]
  }
];

export const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Climate Change Fundamentals',
    description: 'Understanding the basics of climate change and its impact on India',
    duration: 45,
    difficulty: 'Beginner',
    category: 'Climate',
    points: 25,
    imageUrl: 'https://images.pexels.com/photos/683535/pexels-photo-683535.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: {
      sections: [
        {
          title: 'What is Climate Change?',
          content: 'Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, scientific evidence shows that human activities since the 1800s have been the main driver of climate change.',
          imageUrl: 'https://images.pexels.com/photos/683535/pexels-photo-683535.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          title: 'Impact on India',
          content: 'India is particularly vulnerable to climate change effects including rising temperatures, changing monsoon patterns, glacier melting in the Himalayas, and sea level rise affecting coastal areas.',
        },
        {
          title: 'Greenhouse Effect',
          content: 'The greenhouse effect occurs when certain gases in the atmosphere trap heat from the sun. While this is natural and necessary for life, human activities have increased these gases, causing global warming.'
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: 'What is the main cause of current climate change?',
          options: ['Natural variations', 'Human activities', 'Solar radiation', 'Ocean currents'],
          correctAnswer: 1,
          explanation: 'Scientific consensus shows that human activities, particularly burning fossil fuels, are the primary cause of current climate change.'
        },
        {
          question: 'Which region in India is most affected by glacier melting?',
          options: ['Western Ghats', 'Himalayas', 'Deccan Plateau', 'Coastal Plains'],
          correctAnswer: 1,
          explanation: 'The Himalayas are experiencing significant glacier melting due to rising temperatures, affecting water security for millions of people.'
        }
      ]
    }
  },
  {
    id: 'lesson-2',
    title: 'Waste Management in India',
    description: 'Learn about effective waste management practices and their importance',
    duration: 40,
    difficulty: 'Beginner',
    category: 'Waste Management',
    points: 25,
    imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: {
      sections: [
        {
          title: 'The 3 Rs: Reduce, Reuse, Recycle',
          content: 'The waste management hierarchy prioritizes reducing consumption first, then reusing items, and finally recycling materials. This approach minimizes environmental impact and conserves resources.',
        },
        {
          title: 'Waste Segregation',
          content: 'Proper waste segregation involves separating waste at source into different categories: biodegradable (green), non-biodegradable (blue), and hazardous waste (red). This makes processing more efficient.'
        },
        {
          title: 'Composting at Home',
          content: 'Home composting converts organic waste into nutrient-rich fertilizer. Simple methods include pit composting, vermicomposting, and aerobic composting using kitchen scraps and garden waste.'
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: 'What does the first R in waste management stand for?',
          options: ['Recycle', 'Reduce', 'Reuse', 'Refuse'],
          correctAnswer: 1,
          explanation: 'Reduce is the first and most important R, focusing on minimizing waste generation at the source.'
        },
        {
          question: 'Which color bin is used for biodegradable waste in India?',
          options: ['Blue', 'Green', 'Red', 'Yellow'],
          correctAnswer: 1,
          explanation: 'Green bins are designated for biodegradable waste like food scraps and garden waste.'
        }
      ]
    }
  }
];

export const badges: Badge[] = [
  {
    id: 'eco-rookie',
    name: 'Eco Rookie',
    description: 'Complete your first 5 environmental challenges',
    criteria: 'Complete 5 challenges',
    tier: 'Bronze',
    category: 'Milestone',
    imageUrl: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=150',
    rarity: 'Common'
  },
  {
    id: 'tree-hugger',
    name: 'Tree Hugger',
    description: 'Plant and nurture trees to help combat climate change',
    criteria: 'Complete tree planting challenges',
    tier: 'Silver',
    category: 'Conservation',
    imageUrl: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=150',
    rarity: 'Rare'
  },
  {
    id: 'waste-warrior',
    name: 'Waste Warrior',
    description: 'Champion waste reduction and recycling in your community',
    criteria: 'Complete waste management challenges',
    tier: 'Silver',
    category: 'Waste Management',
    imageUrl: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=150',
    rarity: 'Rare'
  },
  {
    id: 'water-guardian',
    name: 'Water Guardian',
    description: 'Protect and conserve water resources',
    criteria: 'Complete water conservation challenges',
    tier: 'Gold',
    category: 'Water Conservation',
    imageUrl: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=150',
    rarity: 'Epic'
  },
  {
    id: 'green-champion',
    name: 'Green Champion',
    description: 'Complete 15 environmental challenges across all categories',
    criteria: 'Complete 15 challenges',
    tier: 'Gold',
    category: 'Milestone',
    imageUrl: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=150',
    rarity: 'Epic'
  },
  {
    id: 'climate-champion',
    name: 'Climate Champion',
    description: 'Master climate action and renewable energy challenges',
    criteria: 'Complete climate and energy challenges',
    tier: 'Platinum',
    category: 'Climate Action',
    imageUrl: 'https://images.pexels.com/photos/683535/pexels-photo-683535.jpeg?auto=compress&cs=tinysrgb&w=150',
    rarity: 'Legendary'
  }
];

export const initializeData = () => {
  // Initialize with sample data if no existing data
  if (!localStorage.getItem('ecolearn_students')) {
    localStorage.setItem('ecolearn_students', JSON.stringify(sampleStudents));
  }
  if (!localStorage.getItem('ecolearn_challenges')) {
    localStorage.setItem('ecolearn_challenges', JSON.stringify(challenges));
  }
  if (!localStorage.getItem('ecolearn_lessons')) {
    localStorage.setItem('ecolearn_lessons', JSON.stringify(lessons));
  }
  if (!localStorage.getItem('ecolearn_badges')) {
    localStorage.setItem('ecolearn_badges', JSON.stringify(badges));
  }
};