import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { personality_type, qualification_level } = await req.json();
    console.log('Generating career suggestions for:', personality_type, qualification_level);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert career counselor specializing in Indian career paths. Generate 3-5 detailed career suggestions based on the user's MBTI personality type and qualification level.

For each career, provide:
- name: Career title
- description: Brief overview (2-3 sentences)
- salary_range: Expected salary in India (e.g., "₹3-8 LPA")
- job_prospects: Job market outlook
- skills_required: Array of 5-7 key skills
- industries: Array of 3-5 industries that hire
- growth_outlook: "High demand", "Stable", "Emerging", or "Niche"

Return ONLY a valid JSON object in this exact format:
{
  "careers": [
    {
      "name": "Career Name",
      "description": "Description here",
      "salary_range": "₹X-Y LPA",
      "job_prospects": "Market outlook",
      "skills_required": ["skill1", "skill2"],
      "industries": ["industry1", "industry2"],
      "growth_outlook": "High demand"
    }
  ]
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Generate career suggestions for:
- MBTI Personality Type: ${personality_type}
- Qualification Level: ${qualification_level}

Provide careers that match this personality type's strengths and the qualification level.` 
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('AI Response:', content);

    // Parse the JSON response
    let careerData;
    try {
      careerData = JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse AI response:', content);
      // Provide fallback careers
      careerData = {
        careers: [
          {
            name: "Software Developer",
            description: "Design and build software applications, working with code and problem-solving daily.",
            salary_range: "$70,000 - $150,000",
            job_prospects: "Excellent growth prospects with high demand across all industries.",
            skills_required: ["Programming", "Problem Solving", "Algorithm Design", "Database Management", "Version Control"]
          },
          {
            name: "Project Manager",
            description: "Lead teams and coordinate projects from inception to completion, ensuring timely delivery.",
            salary_range: "$80,000 - $140,000",
            job_prospects: "Strong demand in technology, construction, and business sectors.",
            skills_required: ["Leadership", "Communication", "Time Management", "Risk Assessment", "Budget Management"]
          },
          {
            name: "Data Analyst",
            description: "Analyze data to extract insights and help organizations make informed decisions.",
            salary_range: "$60,000 - $120,000",
            job_prospects: "Rapidly growing field with increasing importance across industries.",
            skills_required: ["Statistical Analysis", "SQL", "Data Visualization", "Excel", "Python"]
          }
        ]
      };
    }

    return new Response(JSON.stringify(careerData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-career-suggestions:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        careers: [] 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
