from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from encryption import xor_encrypt, xor_decrypt

from simulator import BB84Simulator


app = FastAPI(title="BB84 Quantum Secure Messenger API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://qkdecode-frontend.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SimulationRequest(BaseModel):
    noise: float
    eve: bool
    num_photons: int
    message: str | None = None


@app.get("/")
def home():
    return {
        "status": "online",
        "message": "BB84 backend running"
    }


@app.post("/simulate")
def simulate(data: SimulationRequest):

    print("========== INPUTS ==========")
    print(data)
    print("============================")

    simulator = BB84Simulator()

    return simulator.run(
        number_of_photons=data.num_photons,
        channel_noise=data.noise,
        photon_loss=0.10,
        detector_efficiency=0.90,
        dark_count_rate=0.01,
        eve_interception=1.0 if data.eve else 0.0,
        message=data.message,
    )
    

class EncryptRequest(BaseModel):
    message: str
    key: str


@app.post("/encrypt")
def encrypt(data: EncryptRequest):

    if not data.key:
        return {
            "success": False,
            "error": "No key provided"
        }

    ciphertext = xor_encrypt(data.message, data.key)
    decrypted = xor_decrypt(ciphertext, data.key)

    return {
        "success": True,
        "plaintext": data.message,
        "ciphertext": ciphertext,
        "decrypted": decrypted
    }