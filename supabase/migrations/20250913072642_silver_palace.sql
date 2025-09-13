/*
  # Seed Initial Data

  1. Insert sample badges
  2. Insert sample lessons
  3. Insert sample challenges
  4. Insert sample shop items
*/

-- Insert Badges
INSERT INTO badges (id, name, description, criteria, tier, category, rarity, image_url) VALUES
('eco-rookie', 'Eco Rookie', 'Complete your first 5 environmental challenges', 'Complete 5 challenges', 'Bronze', 'Milestone', 'Common', 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=150'),
('tree-hugger', 'Tree Hugger', 'Plant and nurture trees to help combat climate change', 'Complete tree planting challenges', 'Silver', 'Conservation', 'Rare', 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=150'),
('waste-warrior', 'Waste Warrior', 'Champion waste reduction and recycling in your community', 'Complete waste management challenges', 'Silver', 'Waste Management', 'Rare', 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=150'),
('water-guardian', 'Water Guardian', 'Protect and conserve water resources', 'Complete water conservation challenges', 'Gold', 'Water Conservation', 'Epic', 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=150'),
('green-champion', 'Green Champion', 'Complete 15 environmental challenges across all categories', 'Complete 15 challenges', 'Gold', 'Milestone', 'Epic', 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=150'),
('climate-champion', 'Climate Champion', 'Master climate action and renewable energy challenges', 'Complete climate and energy challenges', 'Platinum', 'Climate Action', 'Legendary', 'https://images.pexels.com/photos/683535/pexels-photo-683535.jpeg?auto=compress&cs=tinysrgb&w=150')
ON CONFLICT (id) DO NOTHING;

-- Insert Lessons
INSERT INTO lessons (id, title, description, content, quiz, duration, difficulty, category, points, image_url, is_published) VALUES
(gen_random_uuid(), 'Climate Change Fundamentals', 'Understanding the basics of climate change and its impact on India', 
'{"sections": [
  {"title": "What is Climate Change?", "content": "Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, scientific evidence shows that human activities since the 1800s have been the main driver of climate change.", "imageUrl": "https://images.pexels.com/photos/683535/pexels-photo-683535.jpeg?auto=compress&cs=tinysrgb&w=400"},
  {"title": "Impact on India", "content": "India is particularly vulnerable to climate change effects including rising temperatures, changing monsoon patterns, glacier melting in the Himalayas, and sea level rise affecting coastal areas."},
  {"title": "Greenhouse Effect", "content": "The greenhouse effect occurs when certain gases in the atmosphere trap heat from the sun. While this is natural and necessary for life, human activities have increased these gases, causing global warming."}
]}',
'{"questions": [
  {"question": "What is the main cause of current climate change?", "options": ["Natural variations", "Human activities", "Solar radiation", "Ocean currents"], "correctAnswer": 1, "explanation": "Scientific consensus shows that human activities, particularly burning fossil fuels, are the primary cause of current climate change."},
  {"question": "Which region in India is most affected by glacier melting?", "options": ["Western Ghats", "Himalayas", "Deccan Plateau", "Coastal Plains"], "correctAnswer": 1, "explanation": "The Himalayas are experiencing significant glacier melting due to rising temperatures, affecting water security for millions of people."}
]}',
45, 'Beginner', 'Climate', 25, 'https://images.pexels.com/photos/683535/pexels-photo-683535.jpeg?auto=compress&cs=tinysrgb&w=400', true),

(gen_random_uuid(), 'Waste Management in India', 'Learn about effective waste management practices and their importance', 
'{"sections": [
  {"title": "The 3 Rs: Reduce, Reuse, Recycle", "content": "The waste management hierarchy prioritizes reducing consumption first, then reusing items, and finally recycling materials. This approach minimizes environmental impact and conserves resources."},
  {"title": "Waste Segregation", "content": "Proper waste segregation involves separating waste at source into different categories: biodegradable (green), non-biodegradable (blue), and hazardous waste (red). This makes processing more efficient."},
  {"title": "Composting at Home", "content": "Home composting converts organic waste into nutrient-rich fertilizer. Simple methods include pit composting, vermicomposting, and aerobic composting using kitchen scraps and garden waste."}
]}',
'{"questions": [
  {"question": "What does the first R in waste management stand for?", "options": ["Recycle", "Reduce", "Reuse", "Refuse"], "correctAnswer": 1, "explanation": "Reduce is the first and most important R, focusing on minimizing waste generation at the source."},
  {"question": "Which color bin is used for biodegradable waste in India?", "options": ["Blue", "Green", "Red", "Yellow"], "correctAnswer": 1, "explanation": "Green bins are designated for biodegradable waste like food scraps and garden waste."}
]}',
40, 'Beginner', 'Waste Management', 25, 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400', true)
ON CONFLICT (id) DO NOTHING;

-- Insert Challenges
INSERT INTO challenges (id, title, description, category, difficulty, points, estimated_time, requirements, instructions, state, season, image_url, is_published) VALUES
(gen_random_uuid(), 'Plant a Native Sapling', 'Plant a native tree sapling in your locality and document its growth over a month', 'conservation', 'Medium', 50, '2 hours', 
'["Native plant sapling", "Camera", "Measuring tape", "Water"]',
'["Research native trees suitable for your region", "Choose an appropriate location with adequate sunlight", "Dig a hole twice the size of the root ball", "Plant the sapling and water thoroughly", "Take before and after photos", "Measure and record the height weekly"]',
'All States', 'Monsoon', 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400', true),

(gen_random_uuid(), 'Waste Segregation Drive', 'Organize a waste segregation awareness drive in your neighborhood', 'waste', 'Hard', 75, '4 hours',
'["Colored bins/bags", "Information pamphlets", "Volunteers"]',
'["Create informative posters about waste segregation", "Gather volunteers from your community", "Set up segregation stations in your locality", "Educate neighbors about proper waste disposal", "Document the before and after impact", "Submit photos and participant feedback"]',
NULL, NULL, 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400', true),

(gen_random_uuid(), 'Rainwater Harvesting Setup', 'Install a simple rainwater harvesting system at home', 'water', 'Medium', 60, '3 hours',
'["Plastic containers", "PVC pipes", "Filter material", "Tools"]',
'["Design a simple collection system", "Connect gutters to collection containers", "Install basic filtration", "Test the system with initial rains", "Calculate water collected over a week", "Share your setup with photos and measurements"]',
'Rajasthan', 'Pre-Monsoon', 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=400', true),

(gen_random_uuid(), 'Solar Cooker Experiment', 'Build a simple solar cooker and cook a meal using solar energy', 'energy', 'Medium', 55, '2.5 hours',
'["Cardboard box", "Aluminum foil", "Black pot", "Glass/plastic cover"]',
'["Line a cardboard box with aluminum foil", "Place a black cooking pot inside", "Cover with glass or clear plastic", "Angle towards the sun for maximum heat", "Cook simple food like rice or vegetables", "Record cooking time and temperature achieved"]',
NULL, NULL, 'https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=400', true),

(gen_random_uuid(), 'Butterfly Garden Creation', 'Create a butterfly-friendly garden with native flowering plants', 'biodiversity', 'Easy', 40, '2 hours',
'["Native flowering plants", "Garden tools", "Water source"]',
'["Research butterfly-attracting plants native to your area", "Prepare a small garden patch", "Plant flowers like marigold, lantana, and ixora", "Create a shallow water source", "Observe and photograph visiting butterflies", "Maintain the garden for at least 2 weeks"]',
NULL, NULL, 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=400', true)
ON CONFLICT (id) DO NOTHING;

-- Insert Shop Items
INSERT INTO shop_items (id, name, description, price, category, rarity, image_url, is_available) VALUES
('avatar-1', 'Eco Warrior', 'A fierce environmental protector avatar', 150, 'avatars', 'rare', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', true),
('avatar-2', 'Nature Guardian', 'Connected to the earth and all living things', 200, 'avatars', 'epic', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', true),
('avatar-3', 'Solar Champion', 'Powered by renewable energy', 300, 'avatars', 'legendary', 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', true),
('achievement-1', 'Green Thumb', 'Special badge for plant lovers', 100, 'achievements', 'common', 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=150', true),
('achievement-2', 'Climate Hero', 'Exclusive title for climate action leaders', 250, 'achievements', 'epic', 'https://images.pexels.com/photos/683535/pexels-photo-683535.jpeg?auto=compress&cs=tinysrgb&w=150', true),
('achievement-3', 'Earth Savior', 'The ultimate environmental achievement', 500, 'achievements', 'legendary', 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=150', true),
('powerup-1', 'Double Points', '2x points for next 3 challenges', 75, 'powerups', 'common', 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=150', true),
('powerup-2', 'Streak Shield', 'Protects your streak for 7 days', 125, 'powerups', 'rare', 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=150', true),
('powerup-3', 'Instant Level Up', 'Immediately advance to next level', 400, 'powerups', 'legendary', 'https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=150', true)
ON CONFLICT (id) DO NOTHING;