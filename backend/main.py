from flask import Flask, request
from pydantic import BaseModel
from flask_cors import CORS
import joblib

app = Flask(__name__)
model=joblib.load('bongo_scam_predict.pkl')
CORS(app)
class BongoScamPredict(BaseModel):
    sms:str

@app.route('/api/predict', methods=['POST'])
def predict_bongo_scam():
    if request.is_json:
        sms = request.json.get('sms')
    else:
        sms = request.form.get('sms')
    
    input_sms=sms
    prediction=model.predict([input_sms])
    if prediction==0:
        return {
            "prediction": "trust",
            "sms":input_sms
            }
    else:
        return {
            "prediction": "scam",
            "sms":input_sms
            }
    
if __name__ == '__main__':
    app.run(debug=True)