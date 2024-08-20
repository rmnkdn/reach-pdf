'use strict';
import React from "react";
import { renderToStream } from '@react-pdf/renderer';
import Statement from "./Components/Statement";

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Accept,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "OPTIONS,POST",
  "Access-Control-Allow-Credentials": true,
}

const streamToBuffer = (stream) => {
  return new Promise(function (res) {
    const chunks = [];

    stream.on("data", (chunk) => chunks.push(chunk));

    stream.on("end", () => {
      const buffer = Buffer.concat(chunks);
      res(buffer);
    });
  });
}


exports.genPDF = async (event) => {
  console.log('started...');

  try {

    // Render PDF to Stream
    const stream = await renderToStream(
      <Statement />
    );

    // Getting the file name
    const fileName = stream.info.Title;
    console.log("Filename is:", fileName);

    // Convert Stream to Buffer
    const buffer = await streamToBuffer(stream);
    //console.log(`Rendered PDF in ${new Date() - started}ms`);

    // Return your buffer PDF
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/pdf",
        ...defaultHeaders
      },
      isBase64Encoded: true,
      body: buffer.toString('base64'),
    };

  } catch (error) {
    // Here handle your error
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders
      },
      body: 'Oops! Something went wrong...',
    };
  }
};
