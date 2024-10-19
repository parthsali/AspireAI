from fastapi import FastAPI, File, UploadFile, HTTPException, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import google.generativeai as genai
from dotenv import load_dotenv
from services.pdfService import extract_text_from_pdf
from services.geminiService import parse_resume_to_dict
from pyht import Client
from pyht.client import TTSOptions
import io

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

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

# Initialize chat history
chat_history = []

# Dummy user details
user_details = {
    "name": "John Doe",
    "age": 30,
    "education": "Bachelor's in Computer Science",
    "experience": "5 years in software development",
    "skills": ["Python", "JavaScript", "React", "Django"]
}

class ChatRequest(BaseModel):
    prompt: str

@app.post("/chat")
async def chat(request: ChatRequest):
    global chat_history  

    prompt = request.prompt

    if prompt.lower() == 'exit':
        return {"message": "Ending the chat. Goodbye!"}

    try:
        # Include user details in the chat history
        user_message = {
            "role": "user",
            "text": f"User details: {user_details}"
        }
        chat_history.append(user_message)

        # Send the user message to the model
        response = model.send_message(prompt, history=chat_history)
        
        # Create a response structure that matches the expected format
        response_structure = {
            "role": "assistant",
            "parts": [{"text": response['text']}]
        }

        # Append the assistant's response to the chat history
        chat_history.append(response_structure)

        return {
            "response": response['text'],
            "chat_history": [
                {
                    "role": message['role'],
                    "text": message['text'] if 'text' in message else message['parts'][0]['text']
                }
                for message in chat_history
            ]
        }
    except Exception as e:
        print(f"Exception: {str(e)}")  # Log the exception for debugging
        raise HTTPException(status_code=500, detail=str(e))










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

