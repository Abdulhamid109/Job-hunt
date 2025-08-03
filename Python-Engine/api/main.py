# 1.i have get the link from the user itself then based on that link
# 2.extract the link
# 3.send the response as it is from fastapi

from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import requests
import pdfplumber
from io import BytesIO

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # you can use ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],              # GET, POST, etc.
    allow_headers=["*"],              # Content-Type, Authorization, etc.
)

class Doc_data(BaseModel):
    resume_link:str



@app.get('/')
def starter():
    return {"success":"Python Backend is running successfully!!!"}


@app.post('/extractresume')
def pdfpipeline(file_path:Doc_data):
  try:
    if file_path.resume_link.endswith('.pdf'):
      response = requests.get(file_path.resume_link)
      response.raise_for_status()  
 
      # Load the PDF content into a BytesIO object
      pdf_file = BytesIO(response.content)
    with pdfplumber.open(pdf_file) as pdf:
        text = ""
        for page in pdf.pages:
                text += page.extract_text() or ""
        return text
  except Exception as e:
      return f"Error: {str(e)}"
  

