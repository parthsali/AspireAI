from fastapi import FastAPI
from services.pdfService import extract_text_from_pdf
from services.geminiService import ask_gemini, parse_resume_to_dict

app = FastAPI()


@app.get("/")
async def root():
    text = extract_text_from_pdf('resume.pdf')

    

    response = parse_resume_to_dict(resume_data=text)
    

    return response
    # return text