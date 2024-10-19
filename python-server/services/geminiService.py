from dotenv import load_dotenv
import google.generativeai as genai
import os
import json

# Load environment variables from .env file
load_dotenv()



api_key = os.getenv("GEMINI_API_KEY")
if api_key is None:
    raise ValueError("API_KEY environment variable not set")

genai.configure(api_key=api_key)

# Define the model
model = genai.GenerativeModel("gemini-1.5-flash")

def ask_gemini(prompt):
    """Function to get a response from the Gemini model."""
    response = model.generate_content(prompt)
    
    return response.text

def parse_resume_to_dict(resume_data):
    """Function to convert resume data to a dictionary format using the Gemini model."""
    
    prompt = f"""
    You are an intelligent assistant that converts resume data into a structured dictionary format. Please extract the necessary information from the provided resume data and return it in the following format without any additional text or formatting:

    {{
      "first_name": "<First Name>",
      "last_name": "<Last Name>",
      "email": "<Email>",
      "phone": "<Phone>",
      "skills": ["<Skill1>", "<Skill2>", "<Skill3>"],
      "interests": ["<Interest1>", "<Interest2>"],
      "grade": "<Grade>",
      "experiences": [
        {{
          "title": "<Experience Title>",
          "description": "<Experience Description>"
        }}
      ],
      "projects": [
        {{
          "title": "<Project Title>",
          "description": "<Project Description>"
        }}
      ]
    }}

    Here is the resume data:
    {resume_data}

    Also interest will be on basis of resume data, like web dev, app dev or ml.
    Make sure to return only the JSON object without any additional text or formatting.
    """

    # Ask the Gemini model to parse the resume
    json_response = ask_gemini(prompt)


    # Attempt to parse the response as a dictionary
    try:
        return json.loads(json_response)  # This will be a dictionary if JSON is valid
    except json.JSONDecodeError as e:
        print("Error parsing JSON:", e)
        return None

