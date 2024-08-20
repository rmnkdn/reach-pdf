'use strict';
import {
  Text,
  Page,
  View,
  Document,
  renderToStream,
} from '@react-pdf/renderer';

const Doc = () => (
  <Document>
    <Page size="A6">
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>new document</Text>
      </View>
    </Page>
  </Document>
);


module.exports.genPDF = async (event) => {
  console.log('started...');

  try {
    // Getting the body
    const body = event.isBase64Encoded ? base64ToJson(event.body) : JSON.parse(event.body);
    const { pageTitle, awesomeVariableA, awesomeVariableB } = body;

    // Render PDF to Stream
    const stream = await renderToStream(
      <Doc />
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
