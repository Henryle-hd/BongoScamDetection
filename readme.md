
# BongoScam - Ni tumie kwa namba hii SMS Detection with Machine Learning

![alt text](sddefault.jpg)
In Tanzania, scammers often use SMS to steal money by pretending to be people you trust, such as close friends or relatives, or by continuing fake conversations about money transfers. These scams are commonly recognized with phrases like ``"NI TUMIE KWA NAMBA HII"``, or they claim to be agents like Freemasons, landlords, or employers offering fake jobs.

To address this problem, I created a dataset of 1,508 Tanzania Swahili-based SMS examples, showcasing various scam patterns. The dataset is available on Kaggle: [swahili-sms-detection](https://www.kaggle.com/datasets/henrydioniz/swahili-sms-detection-dataset/data), and this project also includes a basic machine learning model to detect and predict such fraudulent messages.

## Features

- Real-time SMS scam detection using machine learning
- Clean and modern UI built with Next.js and Tailwind CSS
- Flask backend API with scikit-learn model
- Supports Swahili language messages
- 98.7% accuracy on test data

## Tech Stack

### Frontend

- Next.js 15+ with App Router
- TypeScript
- Tailwind CSS
- Shadcn UI Components

### Backend

- Python
- Flask
- Scikit-learn
- Pandas
- Joblib

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/Henryle-hd/BongoScamDetection
```

```bash
cd bongoscam
```

2. Install frontend dependencies

```bash
cd frontend
npm install
```

3. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

4. Start the backend server

```bash
cd backend
python main.py
```

5. Start the frontend development server

```bash
cd frontend
npm run dev
```

6. Open ```http://localhost:3000``` in your browser

## Model Training

The SMS scam detection model was trained on a custom dataset of Swahili messages labeled as either scam or trust. The model uses:

- CountVectorizer for text feature extraction
- Multinomial Naive Bayes classifier
- Achieved 98.7% accuracy on test set
- Trained on 10000 messages
- Dataset available on kaggle: [swahili-sms-detection](https://www.kaggle.com/datasets/henrydioniz/swahili-sms-detection-dataset/data)

## API Endpoints

### POST /api/predict

Predicts if an SMS is scam

Request body:

```json

{
  "sms": "Iyo ela tuma humu kwenye vodacom 0655251448 Jina lije ALLY ISSA "
}
```

Response:

```json
{
  "prediction": "scam" | "trust",
  "sms": "Original message"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
