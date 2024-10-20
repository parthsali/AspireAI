from fastapi import FastAPI, File, UploadFile, HTTPException, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from services.geminiService import ask_gemini
import google.generativeai as genai
from dotenv import load_dotenv
from services.pdfService import extract_text_from_pdf  # You need to implement this
from services.geminiService import parse_resume_to_dict  # You need to implement this
from pyht import Client
from pyht.client import TTSOptions
# cors 
from fastapi.middleware.cors import CORSMiddleware



# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# cors 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Configure Google Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

# Allow cross-origin resource sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to AspireAI!"}

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    # Ensure it's a PDF file
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")

    file_path = f"{file.filename}"
    
    try:
        # Save uploaded PDF to a file
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)

        # Extract text from the PDF
        text = extract_text_from_pdf(file_path)

        if not text:
            raise HTTPException(status_code=400, detail="Failed to extract text from the PDF.")

        # Parse the extracted text into a resume dictionary
        response = parse_resume_to_dict(resume_data=text)

        return {"response": response}
    
    except Exception as e:
        print(f"Error processing PDF: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the PDF.")
    
    finally:
        # Clean up uploaded file
        if os.path.exists(file_path):
            os.remove(file_path)


# Initialize PlayHT Client
client = Client(
    user_id=os.getenv("PLAY_HT_USER_ID"),
    api_key=os.getenv("PLAY_HT_API_KEY"),
)

class TextToSpeechRequest(BaseModel):
    text: str
    voice_url: str = "s3://voice-cloning-zero-shot/775ae416-49bb-4fb6-bd45-740f205d20a1/jennifersaad/manifest.json"

@app.post("/tts")
async def text_to_speech(request: TextToSpeechRequest):
    text = request.text
    voice_url = request.voice_url

    # Create the TTS options with the given voice URL
    options = TTSOptions(voice=voice_url)

    # Define the path for the output audio file
    output_audio_path = "output_audio.mp3"

    try:
        # Generate the speech and write the chunks directly to the file
        with open(output_audio_path, "wb") as audio_file:
            for chunk in client.tts(text, options):
                audio_file.write(chunk)

        # Return the audio file as a response
        return Response(
            content=open(output_audio_path, "rb").read(),
            media_type="audio/mpeg",
            headers={"Content-Disposition": f"attachment; filename={output_audio_path}"}
        )
    except Exception as e:
        print(f"Error generating TTS: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while generating the TTS.")
    finally:
        # Clean up the audio file
        if os.path.exists(output_audio_path):
            os.remove(output_audio_path)

# MongoDB connection


class UserData(BaseModel):
        name : str
        prompt :  str
        user  : dict

class ChatResponse(BaseModel):
        guidance: str


@app.post("/chat", response_model=ChatResponse)
async def chat_with_gemini(request: UserData):
    print("request", request)
    prompt = f"""
### Career Guidance Prompt

As an expert in career guidance with extensive experience, please provide tailored career advice for {request.name} based on the following information:

**User Prompt**: {request.prompt}

---

### User Data:
- {request.user}

### Considerations:
- Evaluate how the user's overall profile aligns with various career paths.
- Consider the user's professional background, projects, skills, and interests in suggesting fulfilling career options.
- Include insights on future industry trends and opportunities that could impact the user’s career choices.

### Response Format:
- Recommended Career Paths: A list of suitable career paths for the user.
- Skills Development: Suggestions for skills to acquire or improve.
- Future Outlook: Insights on industry trends and opportunities.

Please provide a comprehensive response that addresses {request.name}'s unique situation and guides them towards their ideal career, keeping the response concise (around 100 words).
Dont use markdown syntax in the response also give me html tags with tailwind classes to style the response. and dont mention ```html``` tags in the response.
Format response in good way with proper margin and padding.also make sure to use tailwind classes to style the response. and background color should be transparent.
"""



    try:
            # Generate career guidance using the generative model
        response = ask_gemini(prompt)
   
        
        print("response", response)
        return ChatResponse(guidance=response)
    except Exception as e:
        print(f"Error generating career guidance: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while generating career guidance.")
    

class RoadmapResponse(BaseModel):
    roadmap: str


@app.post("/roadmap", response_model=RoadmapResponse)
async def generate_roadmap(request: UserData):
    print("Received user data:", request)

    # Prepare the prompt for the AI model using request data
    prompt = f"""
### Career Roadmap Prompt

Based on the user's skills, interests, projects, and experience, create a personalized career roadmap for {request.name}.

Consider the following user data:
- Custom Prompt: {request.prompt}
- Additional User Information: {request.user}

The output should be in HTML format with appropriate tags and dont use markdown code or syntax also add some tailwind classes to style these tags. also dont give me ```html``` tags in the response.
also give me roadmap in form timeline or steps.
"""

    try:
        # Call the AI model (using the pre-defined ask_gemini function)
        response = ask_gemini(prompt)

        # Initialize the roadmap HTML
        

        # Split the response into sections
        

        # Loop through sections and add appropriate HTML tags
       
        

        # Log and return the roadmap response
        print("Generated Roadmap HTML:", response)
        return RoadmapResponse(roadmap=response)
    
    except Exception as e:
        print(f"Error generating roadmap: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while generating the roadmap.")
