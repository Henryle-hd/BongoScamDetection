import joblib
import streamlit as st
model=joblib.load('bongo_scam_predict.pkl')

st.title('Bongo Scam prediction')
st.write('CheckBeforeReacte')
sms=[st.text_area('Enter the SMS you want to check',placeholder='Eg. Hela tuma kwa namba hii 0655251448 jina LINUSI MALALO')]

def predict(sms):
    pred=model.predict(sms)
    if pred==0:
        st.success('SMS Safi iyo')
    else:
        st.error('Uwizi kaka')

if st.button('Check 🚀'):
    predict(sms)