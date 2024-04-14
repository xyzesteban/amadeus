![Amadeus Logo](https://user-images.githubusercontent.com/42325882/167320019-bcfb8844-d0fb-42f5-b4f3-30984ca713f1.png)

<p align="center"><strong>🎵 A new, more natural experience for digital music composition</strong></p>

<img src="https://img.shields.io/static/v1?label=&message=Amazon%20AWS&color=232F3E&logo=amazon-aws&logoColor=white" /> <img src="https://img.shields.io/static/v1?label=&message=AWS%20Lambda&color=FF9900&logo=aws-lambda&logoColor=black" /> <img src="https://img.shields.io/static/v1?label=&message=Expo&color=000020&logo=expo&logoColor=white" /> <img src="https://img.shields.io/static/v1?label=&message=Javascript&color=F7DF1E&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/static/v1?label=&message=Python&color=3776AB&logo=python&logoColor=white" /> <img src="https://img.shields.io/static/v1?label=&message=React%20Native&color=61DAFB&logo=react&logoColor=white" /> 

# Overview

Amadeus is a music composition app for iPad / Android tablets which aims to provide a better experience for composers and songwriters. Inspired by my own experiences using composition software, my goal for this project is to use a bottom-up approach to **Optical Music Recognition** and allow using a stylus on a touchscreen for music composition. Given a user’s input into the app, a machine learning model will attempt to recognize the notes and convert them to a digital format.

## Application Architecture

This is subject to change depending on features / fixes:

![Amadeus Application Architecture](https://github.com/xyzes/amadeus/assets/42325882/198493ad-d87b-4d5b-92d0-8ba594e4be81)

## Current Features

- Drawing any number of notes on a canvas using a stylus (Tested with iPad/Apple Pencil setup).
- Recoginition of notes via AWS Lambda & Rekognition; automatically placing identified note or symbol in the canvas.
- Moving previously placed notes or symbols using the stylus.
- Clearing all drawings from the canvas in case of mistakes.

## AWS Rekognition

The original model was trained using the [HOMUS dataset](https://grfia.dlsi.ua.es/homus/), with the dataset split at 80% for training, and 20% for testing.
Current estimate for accuracy in production is 90%, but more testing is needed.

![Rekognition Current Metrics](https://user-images.githubusercontent.com/42325882/167320947-13fac3d5-7c3b-41f5-ab1b-730b0fed68b0.png)

## Tensorflow

A new model was trained using the [HOMUS dataset](https://grfia.dlsi.ua.es/homus/), with the dataset split at 70% for training, 20% for testing, and 10% for validation.
Current estimate for accuracy in production is 83%, but more testing is needed.

![Tensorflow Current Metrics](https://github.com/xyzes/amadeus/assets/42325882/dd2ef88c-db2d-45f1-a238-129929d77079)


## Pending Tasks

Fix needed:
- Add support for Apple Pencil's built-in palm rejection.
- Optimization of file upload (currently, the entire canvas is uploaded, which adds to SVG to PNG conversion time and overall identification time. This needs to be cropped before uploading).

Planned Features:
- Moving Identify ("Brain") button closer to where the note is being drawn (for easier access).
- Allowing user to browse, select, and add notes via a menu (the "traditional" way).
- Recognizing triplets, ties, slurs, chord markings, more complex structures.
- "Snap-to-grid" feature for notes and symbols.
- Store & export user compositions as MusicXML or PDF.
- Pipeline for data collection to get more data for OMR model.

Others:
- More UI/UX Research to get input from potential users.

# Media

<table>
  <tr>
    <td width="500" >
      <h4>G-Clef identification</h4>
      <div style="height: 300px; overflow: hidden;"><img src="https://user-images.githubusercontent.com/42325882/167320676-c45c486d-36b5-4e38-8211-387c56becabf.gif"/></div>
    </td>
    <td width="500" >
      <h4>Quarter Note identification</h4>
      <div style="height: 300px; overflow: hidden;"><img src="https://user-images.githubusercontent.com/42325882/167320692-659263cc-c115-4765-af9c-ed2a4df033ea.gif"/></div>
    </td>
  </tr>
  <tr>
    <td width="500" >
      <h4>Barline identification</h4>
      <div style="height: 300px; overflow: hidden;"><img src="https://user-images.githubusercontent.com/42325882/167320697-54663365-a07b-4f27-bd93-3105c6b8ba62.gif"></div>
    </td>
    <td width="500" >
      <h4>Final Result</h4>
      <div style="height: 300px; overflow: hidden;"><img src="https://user-images.githubusercontent.com/42325882/167331056-1ac6a516-f8ef-43b3-b015-117caf5fb620.PNG"></div>
    </td>
  </tr>
</table>
