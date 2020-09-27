from fastapi import FastAPI
from typing import Dict, Any


app = FastAPI()


@app.post("/events/")
async def create_event(event: Dict[str, Any]):
    return event
